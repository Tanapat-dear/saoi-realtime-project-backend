import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';


@Entity('output_production_data')
export class Outputproduction {
    @PrimaryColumn({ type: 'int'})
    id: number;

    @Column({ type: 'varchar', length: 50 })
    factory_code: string;

    @Column({ type: 'date' })
    output_date: Date;

    @Column({ type: 'varchar', length: 50 })
    proc_disp: string;

    @Column({ type: 'varchar', length: 50 })
    mc_line: string;

    @Column({ type: 'varchar', length: 50 })
    fac_unit_code: string;

    @Column({type: 'varchar', length: 50 })
    prd_item_code: string;

    @Column({ type: 'int'})
    lot_qty: number;

    @Column({ type: 'int'})
    sum_lot_mc: number;

    @Column({ type: 'int'})
    gate_sht_qty: number;

    @Column({ type: 'int'})
    sum_gate_sht_mc: number;

    @Column({ type: 'int'})
    actual_sht_qty: number;

    @Column({ type: 'int'})
    pcs_qty: number;

    @Column({ type: 'int'})
    meter_qty: number;
}
