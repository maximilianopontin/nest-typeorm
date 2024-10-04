import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { AuthorModule } from './author/author.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [
    //name podemos agregarle nombre con la cantidad de peticion que le permito por minuto, esto en caso de que necesitemos distintos limites para las solictudes
    // ttl Tiempo de vida en segundos para la limitación de solicitudes (60 segundos)
    // limit Número máximo de solicitudes permitidas por IP en el periodo de tiempo (10 solicitudes)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PhotoModule,
    AuthorModule,
    AuthModule,
    VisitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
