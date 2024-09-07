import {
  IsString,
  IsInt,
  IsBoolean,
  Length,
  IsOptional,
  IsNumberString,
  IsBooleanString,
} from 'class-validator';

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
  views: number;

  @IsBooleanString()
  isPublished: boolean;

  @IsNumberString()
  authorId: number;
}
