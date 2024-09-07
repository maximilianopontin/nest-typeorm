import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '@/photo/entities/photo.entity';
@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  name: string;
  @Column('varchar', { length: 64, unique: true })
  userName: string;
  @Column('varchar', { length: 255, unique: true })
  email: string;
  @Column('varchar', { length: 60 })
  password: string;
  //Relación de uno a muchos con la entidad photo. Un autor puede tener muchas fotos
  @OneToMany(() => Photo, (photo) => photo.author)
  photos: Photo[];
}
//@Entity() indica que la clase Author representa una entidad en la base de datos.La relación uno a muchos se establece con el decorador @OneToMany, donde se define que un Author puede estar asociado con muchas Photo.
