import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
@Entity('visits')
export class Visit {
  @PrimaryColumn('int')
  photoId: number;
  @PrimaryColumn('varchar', { length: 45 })
  ip: string;
  @CreateDateColumn()
  visitedAt: Date;
}
