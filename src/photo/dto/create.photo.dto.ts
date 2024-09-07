import { IsString, Length, IsOptional, IsNumberString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @Length(1, 500)
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  filename: string;

  @IsNumberString()
  authorId: number;
}
