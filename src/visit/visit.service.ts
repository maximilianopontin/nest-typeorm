import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Visit } from './entities/visit.entity';

@Injectable()
export class VisitService {
  constructor(
    @Inject('VISIT_REPOSITORY')
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async createVisit(photoId: number, ip: string) {
    try {
      const existingVisit = await this.visitRepository.findOne({
        where: { photoId, ip },
      });
      if (existingVisit) {
        return true;
      } else {
        const visit = this.visitRepository.create({ photoId, ip });
        await this.visitRepository.save(visit);
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
    return false;
  }
}
