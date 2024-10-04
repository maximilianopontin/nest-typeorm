import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { AuthorModule } from './author/author.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { VisitModule } from './visit/visit.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        //name podemos agregarle nombre con la cantidad de peticion que le permito por minuto, esto en caso de que necesitemos distintos limites para las solictudes
        ttl: 60000,// ttl Tiempo de vida en segundos para la limitación de solicitudes (60 segundos)
        limit: 10, // limit Número máximo de solicitudes permitidas por IP en el periodo de tiempo (10 solicitudes)
      },
    ]),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PhotoModule,
    AuthorModule,
    AuthModule,
    VisitModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
