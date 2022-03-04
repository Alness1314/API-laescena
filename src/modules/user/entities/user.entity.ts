import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @Column({ type: 'bool', default: true })
  status: boolean;

  @Column({ type: 'varchar', length: 128 })
  avatar: string;

  @Column({ name: 'fb_id', type: 'varchar', length: 128 })
  fbId: string;

  @Column({ name: 'fb_link', type: 'varchar', length: 128 })
  fbLink: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
