import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { DatabaseModule } from '@/database/database.module';
import { visitProviders } from './visit.providers';

@Module({
  imports: [DatabaseModule],
  providers: [VisitService, ...visitProviders],
  exports: [...visitProviders],
})
export class VisitModule {}
