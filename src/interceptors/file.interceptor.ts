import { BadRequestException, Injectable } from '@nestjs/common';
import { FileInterceptor as MulterInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileInterceptor {
  static createFileInterceptor(fieldName: string) {
    return MulterInterceptor(fieldName, {
      storage: diskStorage({
        //configuramos el almacenamiento en disco
        destination: './uploads', //carpeta donde se guardaran los archivos subidos
        filename: (req, file, callback) => {
          //funcion para estandarizar nombre de archivo
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname); //extraemos la extension original del archivo
          const filename = `photo-${uniqueSuffix}${ext}`;
          //combinamos  el sufijo que es el nombre aleatorio del archivo, le anteponemos la palabra 'photo' y lo finalizamos con la extension original
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        //regexp para los tipos de archivos permitidos
        const allowedTypes = /jpeg|jpg|png|gif/;
        //obtenemos la extension del archivo
        const ext = extname(file.originalname).toLowerCase();
        //verficar si el tipo MIME del archivo es permitido
        const mimeType = allowedTypes.test(file.mimetype);
        //verficar si la extension del archivo es permitida
        const extName = allowedTypes.test(ext);
        if (mimeType && extName) {
          return callback(null, true);
          //si el archivo es una imagen y tiene una extension permitida llamamos al callback sin errores, por lo tanto, pasamos el filtro de seguridad y continuamos al controller
        } else {
          callback(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 }, //limitamos el tamaño a dos megabytes
    });
  }
}
