import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { SupabaseService } from '../@common/supabase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuthModule],
  controllers: [ImageController],
  providers: [ImageService, SupabaseService],
})
export class ImageModule {}
