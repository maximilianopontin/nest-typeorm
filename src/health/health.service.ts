import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(): string {
    return 'Service is healthy ';
  }
}
