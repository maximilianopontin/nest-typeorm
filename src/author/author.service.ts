import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  // Obtener todos los autores
  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  //modificar un autor
  async updateOne(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorRepository.preload({
      id: id,
      ...updateAuthorDto,
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return await this.authorRepository.save(author);
  }

  // Método para obtener un autor con todas sus fotos
  async findAuthorWithPhotos(authorId: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['photos'], // Incluye las fotos relacionadas
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    return author;
  }
}
