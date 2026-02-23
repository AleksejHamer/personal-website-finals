import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GuestbookService {
  // This line fixes the red wavy lines under "this.supabase"
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // These lines pull your keys from the .env file
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');
    
    // Safety check: if keys are missing, the app won't crash silently
    if (!url || !key) {
      throw new Error('Supabase URL or Key is missing in .env');
    }

    this.supabase = createClient(url, key);
  }

  async getEntries() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;
    return data;
  }

  async createEntry(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }]);
    if (error) throw error;
    return data;
  }
}