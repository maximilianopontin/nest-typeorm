import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/photo.create.dto';
import { UpdatePhotoDto } from './dto/update.photo.dto';

@Controller('/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  getAll() {
    return this.photoService.findAll();
  }

  @Post()
  @UseInterceptors(
    // Utiliza un interceptor de archivos para manejar la subida
    FileInterceptor('file', {
      // 'file' es el nombre del campo en el formulario HTML donde se sube el archivo
      storage: diskStorage({
        // Configura el almacenamiento en disco para los archivos subidos
        destination: './uploads', // Carpeta donde se guardarán los archivos subidos
        filename: (req, file, callback) => {
          // Función para personalizar el nombre del archivo subido
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          // Crea un sufijo único basado en la fecha actual y un número aleatorio
          const ext = extname(file.originalname); // Extrae la extensión del archivo original (por ejemplo, .jpg, .png)
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          // Combina el nombre del campo con el sufijo único y la extensión para formar el nombre final del archivo
          callback(null, filename); // Llama al callback para indicar que se ha generado el nombre del archivo
        },
      }),
      fileFilter: (req, file, callback) => {
        // Función para filtrar los archivos según su tipo
        const allowedTypes = /jpeg|jpg|png|gif/; // Expresión regular para los tipos de archivo permitidos
        const ext = extname(file.originalname).toLowerCase(); // Obtiene y convierte a minúsculas la extensión del archivo
        const mimeType = allowedTypes.test(file.mimetype); // Verifica si el tipo MIME del archivo es permitido
        const extName = allowedTypes.test(ext); // Verifica si la extensión del archivo es permitida
        if (mimeType && extName) {
          return callback(null, true); // Si el archivo es permitido, llama al callback sin errores
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          ); // Si el archivo no es permitido, lanza una excepción y rechaza la subida
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // Limita el tamaño del archivo a 2MB
    }),
  )
  createOne(
    @UploadedFile() file: Express.Multer.File, // Decorador para obtener el archivo subido desde la solicitud
    @Body() createPhotoDto: CreatePhotoDto, // Obtiene el resto de los datos del cuerpo de la solicitud
  ) {
    if (!file) {
      throw new BadRequestException('File is required'); // Si no se sube un archivo, lanza una excepción
    }
    createPhotoDto.filename = file.filename; // Asigna el nombre del archivo subido al DTO
    return this.photoService.createOne(createPhotoDto); // Llama al servicio para crear un registro con los datos proporcionados
  }

  @Patch('/:id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photoService.updateOne(id, updatePhotoDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.deleteOne(id);
  }
}
