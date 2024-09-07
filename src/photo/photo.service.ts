import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/photo.create.dto';
import { UpdatePhotoDto } from './dto/update.photo.dto';
import { Author } from '@/author/entities/author.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Photo[]> {
    // return await this.photoRepository.find();
    return await this.photoRepository.find({ relations: ['author'] });
  }
  async createOne(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    //buscar autor por id
    const author = await this.authorRepository.findOneBy({
      id: createPhotoDto.authorId,
    });
    if (!author) {
      throw new NotFoundException(
        `Author with id ${createPhotoDto.authorId} not found`,
      );
    }

    //Crear la nueva foto con la relación al autor
    const photo = this.photoRepository.create({
      ...createPhotoDto,
      author, //asociar el autor a la foto
    });

    return await this.photoRepository.save(photo);
  }
  async updateOne(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo) {
      throw new NotFoundException(`Photo with id ${id} not found`);
    }

    //Actualizar autor si se proporciona un nuevo authorId
    if (updatePhotoDto.authorId) {
      const author = await this.authorRepository.findOneBy({
        id: updatePhotoDto.authorId,
      });
      if (!author) {
        throw new NotFoundException(
          `Author with id ${updatePhotoDto.authorId} not found`,
        );
      }
      photo.author = author;
    }

    //Actualizar otros campos de la foto
    Object.assign(photo, updatePhotoDto);
    return await this.photoRepository.save(photo);
  }
  async deleteOne(id: number) {
    return this.photoRepository.delete(id);
  }
}