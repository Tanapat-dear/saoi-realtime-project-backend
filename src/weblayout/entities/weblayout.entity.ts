import { Entity , Column , PrimaryColumn} from 'typeorm';

@Entity('saoi_layout_forweb')
export class Weblayout {
    @PrimaryColumn()
    row: number;

    @Column("varchar", { array: true, nullable: true })
    machine: string[];

    @Column()
    has_walkpath_right: boolean;

    @Column("varchar", { array: true, nullable: true })
    manpower_layout: string[];

    @Column()
    area: string;
}
