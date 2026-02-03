import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { Injectable } from '@nestjs/common';
import { CreatePlanEditorDto } from 'src/planeditor/dto/create-planeditor.dto';

@Injectable()
export class UtilsDataGetter {
    constructor(@InjectDataSource('10_17_66_121') private readonly dataSource: DataSource,
     @InjectDataSource('10_17_77_118') private readonly maindatasource: DataSource,
      @InjectDataSource('10_17_66_144') private readonly fpcdatasource: DataSource,
     private readonly dayjsservice: DayjsserviceService
    ) {}

    async getOeeData(): Promise<unknown> {
            const { startdate, enddate } = this.dayjsservice.getOeeTimeRange();
            const query = `select
                        mc_code,
                        '${startdate}' as ptime_start,
                        '${enddate}' as ptime_end,
                        SUM(CASE WHEN signal = 3 THEN 1 ELSE 0 END)::int AS run_count,
                        SUM(CASE WHEN signal = 2 THEN 1 ELSE 0 END)::int AS poweron_count,
                        ( 1440 
                            - SUM(CASE WHEN signal = 3 THEN 1 ELSE 0 END)
                            - SUM(CASE WHEN signal = 2 THEN 1 ELSE 0 END)
                        )::int AS poweroff_count

                        
                        FROM py_mc_data.py_cfm_aoi_sht_signal_oee
                        WHERE ptime >= '${startdate}'
                                        AND ptime < '${enddate}'
                        GROUP BY mc_code;
                       `;
            

            return this.dataSource.query(query);
    }

    async getWipReport(): Promise<unknown> {
        const query = `SELECT id, product_name, process, unit, to_char(update_at, 'YYYY-MM-DD HH24:MI:SS') AS update_at,
                        to_char(create_at, 'YYYY-MM-DD HH24:MI:SS') AS create_at, qty
                        FROM public.wip_report_production_data where process like 'AOI%';`;

        return this.maindatasource.query(query);
    }

    
    async getProductionData(): Promise<unknown> {

        const date = this.dayjsservice.getProductionDataDate()

        const query = `		WITH output_base AS (
                            SELECT
                                proc_disp,
                                prd_item_code,
                                mc_line,
                                output_date,
                                lot_qty,
                                sht_qty
                            FROM smart.smart_output_lot_machine
                            WHERE
                                output_date = '${date}'
                                AND factory_code = '5'
                                AND proc_disp LIKE 'AOI%'
                                AND mc_line NOT IN (' ')
                        ),
                        
                        sum_by_mc AS (
                            SELECT
                                mc_line,
                                SUM(lot_qty) AS sumlot_bymc,
                                SUM(sht_qty) AS sumsht_bymc
                            FROM output_base
                            GROUP BY mc_line
                        ),
                        
                        -- 2) เอาแถวล่าสุดของแต่ละ mc (ไว้โชว์ info)
                        latest_by_mc AS (
                            SELECT
                                proc_disp,
                                prd_item_code,
                                mc_line,
                                output_date,
                                ROW_NUMBER() OVER (
                                    PARTITION BY mc_line
                                    ORDER BY output_date DESC
                                ) AS rn
                            FROM output_base
                        ),
                        
                        -- 3) total AOI ทั้งหมด
                        sum_output_byall AS (
                            SELECT
                                COALESCE(SUM(sumlot_bymc), 0) AS sumlot_byall,
                                COALESCE(SUM(sumsht_bymc), 0) AS sumsht_byall
                            FROM sum_by_mc
                        ),
                        
                        ---4) scr_pte
                        
                        scr_pte as (
                        select
                            *
                        from
                            (
                            select
                                id,
                                TO_CHAR(rephd_date, 'YYYY-MM-DD HH24:MI') as rephd_date,
                                result_desc,
                                rephd_building,
                                rephd_item_code_confirm as mc_code_actv,
                                rephd_item_code as mc_code_req,
                                rephd_status as status,
                                status_desc_display,
                                rephd_requester,
                                rephd_phone_contact as tel,
                                rephd_desc_repair,
                                repassign_login,
                                rephd_no,
                                row_number() over (
                            partition by rephd_item_code
                            order by
                                rephd_date desc ) as rn
                            from
                                smart.smart_machine_scr_pte
                            where
                                rephd_status in ('10', '13', '30', '35', '40')
                                and result_desc = 'M/C STOP'
                                and rephd_item_code <> 'OTHER MACHINE'
                                and rephd_item_code_confirm is not null) t
                        where
                            rn = 1
                        )
                        
                        SELECT 
                            master.mc_code,
                            master.proc_grp_name,
                            l.proc_disp,
                            l.prd_item_code,
                            l.output_date,
                            s.sumlot_bymc,
                            s.sumsht_bymc,
                            a.sumlot_byall,
                            a.sumsht_byall,
                            scr.result_desc,
                            (scr.result_desc IS NOT NULL) as has_scr_repair,
                            scr.rephd_no
                        FROM smart.smart_machine_rt_master master
                        LEFT JOIN latest_by_mc l
                            ON master.mc_code = l.mc_line
                            AND l.rn = 1         
                        LEFT JOIN sum_by_mc s
                            ON master.mc_code = s.mc_line
                        CROSS JOIN sum_output_byall a
                        left join scr_pte scr
                        on master.mc_code = scr.mc_code_actv
                        WHERE master.proc_grp_name = 'AOI';

        `
        
        return this.fpcdatasource.query(query);
    }
    

      async getActualPlanData(): Promise<unknown> {
        const query = `SELECT id, mc_plan, man_plan, output_lot_plan, output_sht_plan, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
                FROM public.saoi_planandoutputplan_real order by id desc limit 1;`;

        return this.maindatasource.query(query);
    }

     async updatePlanDataActv(data: any): Promise<unknown> {
        const query = `INSERT INTO public.saoi_planandoutputplan_actv
        (mc_plan, man_plan, output_lot_plan, output_sht_plan, created_at)
        VALUES ($1, $2, $3, $4, $5);`;

        return this.maindatasource.query(query,[
                    data.mc_plan, 
                    data.man_plan, 
                    data.output_lot_plan, 
                    data.output_sht_plan,
                    this.dayjsservice.now(),
                ]
        );
     }

    async updatePlanDataReal(data: any): Promise<unknown> {
                const query = `
                    INSERT INTO public.saoi_planandoutputplan_real 
                        (id, mc_plan, man_plan, output_lot_plan, output_sht_plan, created_at)
                    VALUES (1, $1, $2, $3, $4, $5)
                    ON CONFLICT (id) 
                    DO UPDATE SET 
                        mc_plan = EXCLUDED.mc_plan,
                        man_plan = EXCLUDED.man_plan,
                        output_lot_plan = EXCLUDED.output_lot_plan,
                        output_sht_plan = EXCLUDED.output_sht_plan,
                        created_at = EXCLUDED.created_at;
                `;

                return this.maindatasource.query(query, [
    
                    data.mc_plan, 
                    data.man_plan, 
                    data.output_lot_plan, 
                    data.output_sht_plan,
                    this.dayjsservice.now(),
                ]);
            }

    async findUser(username:string): Promise<unknown>{
         const query = `
                   SELECT id, username, "password", "role", created_at
                    FROM public.saoi_authenication_forweb where username = $1;
                `;
        return  this.maindatasource.query(query, [username]);
    }

    async updateMachineLayout(data: any[]): Promise<unknown> {
    // 1. เตรียมข้อมูล
    const rows = data.map(d => d.row);
    
    // 🛠️ แก้ไข: แปลง Array เครื่องจักรให้เป็นรูปแบบ Postgres Array String เช่น "{mc1,mc2,...}"
    const machines = data.map(d => 
        "{" + d.machine.map(m => m === null ? "NULL" : `"${String(m).replace(/"/g, '\\"')}"`).join(",") + "}"
    );

    const walkpaths = data.map(d => d.has_walkpath_right);
    const manpower = data.map(d => d.manpower_layout);
    const areas = data.map(d => d.area);

    const query = `
        INSERT INTO public.saoi_layout_forweb (row, machine, has_walkpath_right, manpower_layout, area)
        SELECT * FROM UNNEST(
            $1::int[], 
            $2::text[],
            $3::boolean[], 
            $4::text[], 
            $5::text[]
        ) AS t(row, machine_str, has_walkpath_right, manpower_layout, area)
        ON CONFLICT (row) 
        DO UPDATE SET 
            machine = EXCLUDED.machine,
            has_walkpath_right = EXCLUDED.has_walkpath_right,
            manpower_layout = EXCLUDED.manpower_layout,
            area = EXCLUDED.area;
    `;

    // 2. ส่งข้อมูลไปประมวลผล (Postgres จะ Cast text[] กลับเป็น machine column ที่เป็น text[] ให้อัตโนมัติ)
    return this.maindatasource.query(query, [rows, machines, walkpaths, manpower, areas]);
    }

    
    async getManpower(): Promise<unknown> {
         const query = `
             SELECT id, op_id, op_name, mc_code, is_run_normal, is_run_ot,TO_CHAR(created_date, 'YYYY-MM-DD HH24:MI:SS') as created_date,
              TO_CHAR(update_date, 'YYYY-MM-DD HH24:MI:SS') as update_date
            FROM public.smart_cfm_aoi_man_map_mc;
    `;
        return this.maindatasource.query(query)
    }
}