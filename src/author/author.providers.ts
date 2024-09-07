//Este archivo define un proveedor que permite que el repositorio Author esté disponible en toda la aplicación, de la misma manera que el repositorio Photo.
import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';

export const authorProviders = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
];
