import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { authorProviders } from '@/author/author.providers';
import { AuthorModule } from '@/author/author.module';

// Define un módulo para gestionar la entidad Photo
@Module({
  // Importa el DatabaseModule para tener acceso a los proveedores de la base de datos
  imports: [
    DatabaseModule,
    AuthorModule, // Importa AuthorModule para usar sus proveedores
  ],
  controllers: [PhotoController],

  // Registra los proveedores específicos de Photo y el servicio PhotoService
  providers: [
    ...photoProviders, // Proveedores para la entidad Photo
    ...authorProviders,
    PhotoService, // Servicio para la entidad Photo
  ],
})
export class PhotoModule {}

// El PhotoModule encapsula toda la lógica relacionada con la entidad Photo, incluyendo la conexión a la base de datos y el servicio de Photo.Esto sigue el principio de modularidad de NestJS, permitiendo que las partes de la aplicación estén bien organizadas y sean reutilizables.
