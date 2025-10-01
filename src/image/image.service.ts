// files.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/@common/supabase.service';

@Injectable()
export class ImageService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadFile({ fileName, buffer }: { fileName: string; buffer: Buffer }) {
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('food-map-upload')
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) throw error;
    return data;
  }

  async getPublicUrl(path: string) {
    const { data } = this.supabaseService
      .getClient()
      .storage.from('food-map-upload')
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async downloadFile(bucket: string, path: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from(bucket)
      .download(path);

    if (error) throw error;
    return data; // Blob or ArrayBuffer
  }
}
