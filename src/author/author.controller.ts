import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAll() {
    return this.authorService.findAll();
  }

  @Get(':id/photos')
  getAuthorWithPhotos(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.findAuthorWithPhotos(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateOne(id, updateAuthorDto);
  }
}
