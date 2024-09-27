import { Body, Controller, Post } from '@nestjs/common';
import { VisitService } from './visit.service';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(@Body('photoId') photoId: number, @Body('ip') ip: string) {
    return this.visitService.createVisit(photoId, ip);
  }
}
