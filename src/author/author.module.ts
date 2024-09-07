import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { authorProviders } from './author.providers';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

// Definir el módulo Author
@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [...authorProviders, AuthorService],
  exports: [...authorProviders], // Exporta el proveedor para que pueda ser usado en otros módulos
})
export class AuthorModule {}
