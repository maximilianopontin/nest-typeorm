import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateAuthorDto } from '@/author/dto/create-author.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authService.register(createAuthorDto);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
