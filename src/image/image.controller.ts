import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { sanitizeFilename } from '../@common/sanitizer';

// try {
//   fs.readdirSync('uploads');
// } catch (error) {
//   fs.mkdirSync('uploads');
// }

@Controller('images')
@UseGuards(AuthGuard())
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseInterceptors(
    // FilesInterceptor('images', numbers.MAX_IMAGE_COUNT, {
    //   storage: diskStorage({
    //     destination(req, file, cb) {
    //       cb(null, 'uploads/');
    //     },
    //     filename(req, file, cb) {
    //       const ext = extname(file.originalname);
    //       cb(null, basename(file.originalname, ext) + Date.now() + ext);
    //     },
    //   }),
    //   limits: { fileSize: numbers.MAX_IAMGE_SIZE },
    // }),
    FilesInterceptor('images'),
  )
  @Post('/')
  async uploadImages(@UploadedFiles() images: Express.Multer.File[]) {
    if (!images || images.length === 0) {
      throw new HttpException('No images uploaded', HttpStatus.BAD_REQUEST);
    }

    const results = [];
    for (const image of images) {
      const sanitizedFileName = sanitizeFilename(image.originalname);
      // Supabase에 업로드할 때 파일명은 원래 이름을 사용 (중복 시 덮어쓰기 가능)
      const uploadResult = await this.imageService.uploadFile({
        fileName: sanitizedFileName,
        buffer: image.buffer,
      });
      results.push(uploadResult?.path);
    }

    return results;
  }

  @Get('/:filename')
  async getFileUrl(@Param('filename') filename: string) {
    const url = await this.imageService.getPublicUrl(filename);
    return {
      url,
    };
  }
}
