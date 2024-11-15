import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { MovieRating } from '../../rating/entities/rating.entity';
import * as bcrypt from 'bcrypt';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string; // Or email if preferred

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


  @OneToMany(() => MovieRating, (movieRating) => movieRating.user)
  ratings: MovieRating[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
