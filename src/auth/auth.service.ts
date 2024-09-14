import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { CreateAuthorDto } from '@/author/dto/create-author.dto';
import { Author } from '@/author/entities/author.entity';
import { Repository } from 'typeorm';
import { HashService } from './hash/hash.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  @Inject('AUTHOR_REPOSITORY')
  private readonly authorRepository: Repository<Author>;
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthorDto: CreateAuthorDto) {
    const securedPassword = await this.hashService.hashPassword(
      createAuthorDto.password,
    );

    try {
      const newAuthor = this.authorRepository.create({
        ...createAuthorDto,
        password: securedPassword,
      });
      await this.authorRepository.save(newAuthor);
      const { password, id, ...rest } = newAuthor;
      return rest;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    //validar email
    const author = await this.authorRepository.findOneBy({
      email: loginDto.email,
    });
    if (!author) throw new UnauthorizedException('Invalid Email or Password');
    const isAuthenticated = await this.hashService.comparePassword(
      loginDto.password,
      author.password,
    );
    //validar password
    if (!isAuthenticated)
      throw new UnauthorizedException('Invalid Email or Password');

    const payload = {
      sub: author.id,
      userName: author.userName,
      email: author.email,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
