import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '@/author/entities/author.entity';
import { Visit } from '@/visit/entities/visit.entity';

// El decorador @Entity indica que esta clase representa una entidad en la base de datos
@Entity('photos')
export class Photo {
  // Define la columna 'id' como la clave primaria generada automáticamente
  @PrimaryGeneratedColumn()
  id: number;

  // Define la columna 'name' con una longitud máxima de 500 caracteres
  @Column({ length: 500 })
  name: string;

  // Define la columna 'description' como un texto de longitud variable
  @Column('text')
  description: string;

  // Define la columna 'filename' como una cadena de texto (varchar por defecto)
  @Column()
  filename: string;

  // Define la columna 'views' como un entero
  @Column('int', { default: 0 })
  views: number;

  // Define la columna 'isPublished' como un booleano
  @Column({ default: true })
  isPublished: boolean;

  //relación muchos a uno: muchas fotos pueden pertenecer a un mismo autor
  // y un autor puede tener muchas fotos
  @ManyToOne(() => Author, (author) => author.photos, { eager: true })
  author: Author;
  @OneToMany(() => Visit, (visit) => visit.photoId)
  visits: Visit[];
  //El primer argumento es el tipo de la entidad relacionada (Visit).
//El segundo argumento indica qué propiedad en la entidad Visit mantiene la relación inversa (photo).
}

// EXPLICACIÓN:
//1. @ManyToOne: Este decorador indica una relación de tipo "muchos a uno" entre las entidades.En este caso, muchas instancias de la entidad Photo pueden estar asociadas con una sola instancia de la entidad Author.

// (() => Author): Es una función de flecha que devuelve la clase Author.Esto es necesario para que TypeORM pueda resolver la relación entre las entidades.

//     author => author.photos: Especifica la propiedad en la entidad Author que mantiene la relación inversa.En otras palabras, se refiere a la colección de fotos que pertenecen a un autor.Esto permite que TypeORM pueda seguir la relación en ambas direcciones: desde Photo a Author y viceversa.

//2. author: Author;

// Esta propiedad define la relación en la entidad Photo.La propiedad author se usará para almacenar la instancia del autor al que pertenece la foto.

//COMO FUNCIONA:
//1. Definición de la Relación:

// Cuando defines @ManyToOne en la entidad Photo, le estás diciendo a TypeORM que cada foto está asociada a un único autor.

// La relación se mantiene en la base de datos mediante una clave foránea en la tabla photo que hace referencia a la clave primaria en la tabla author.

//2. Generación de la Base de Datos:

// TypeORM creará una columna en la tabla photo, por ejemplo, authorId, que almacena el identificador del autor al que pertenece la foto.

// La base de datos utilizará esta columna para mantener la relación entre las fotos y los autores.

//3. Acceso a Datos:

// Con esta relación, puedes acceder al autor de una foto mediante la propiedad author.Asimismo, en la entidad Author, puedes acceder a todas las fotos relacionadas a través de la colección photos.

// EJEMPLO DE USO:
// Para obtener todas las fotos de un autor específico, puedes realizar una consulta que cargue las fotos asociadas con ese autor.
// const author = await this.authorRepository.findOne({
//     where: { id: authorId },
//     relations: ['photos'],
// });

/*
eager: true es una opción que puedes usar en TypeORM para especificar que una relación debe cargarse automáticamente cuando se carga la entidad principal. Esto significa que cuando recuperas una entidad de la base de datos, TypeORM también recuperará automáticamente las entidades relacionadas y las incluirá en los resultados, sin que tengas que hacer consultas adicionales o especificar manualmente la relación en la consulta.

Esto significa que cada vez que recuperes una instancia de Photo, TypeORM también recuperará automáticamente el Author relacionado y lo incluirá en la propiedad author de Photo.

Ventajas y Desventajas
Ventajas:

Simplicidad: No necesitas hacer consultas adicionales o especificar relaciones cuando recuperas la entidad principal. La relación se carga automáticamente.
Menos código: Puedes escribir menos código, ya que no tienes que preocuparte por especificar manualmente las relaciones en tus consultas.
Desventajas:

Impacto en el rendimiento: Si tienes muchas relaciones configuradas con eager: true, podrías terminar cargando muchos datos innecesarios, lo que podría afectar el rendimiento de la aplicación.
Menos flexibilidad: No puedes decidir en el momento de la consulta si quieres cargar la relación o no; se carga siempre automáticamente.

Alternativa: lazy Loading
La alternativa a eager es lazy loading, donde la relación solo se carga cuando la accedes explícitamente. Para usar lazy loading, puedes usar un Promise en lugar de eager: true:


@ManyToOne(() => Author, (author) => author.photos)
author: Promise<Author>;

Con lazy loading, la relación no se cargará automáticamente, pero cuando accedes a photo.author, TypeORM realizará una consulta en ese momento para obtener los datos del autor.

En resumen, eager: true es útil cuando siempre necesitas las relaciones al cargar la entidad, pero debes usarlo con precaución para evitar cargar datos innecesarios.
*/
