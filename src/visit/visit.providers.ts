import { DataSource } from 'typeorm';
import { Visit } from './entities/visit.entity';
export const visitProviders = [
  {
    provide: 'VISIT_REPOSITORY',

    useFactory: (dataSource: DataSource) => dataSource.getRepository(Visit),

    // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
    inject: ['DATA_SOURCE'],
  },
];
