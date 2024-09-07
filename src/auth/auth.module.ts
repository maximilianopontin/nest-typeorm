import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';
import { authorProviders } from '@/author/author.providers';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, HashService, ...authorProviders],
  controllers: [AuthController],
})
export class AuthModule {}
