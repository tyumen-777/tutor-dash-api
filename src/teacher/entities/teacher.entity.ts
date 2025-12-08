import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'teacher',
})
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: String, nullable: true })
  email: string | null;

  @Column({ type: String, nullable: true })
  phone: string | null;
}
