import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const isPlaceholderUrl = !supabaseUrl || supabaseUrl.includes('seu-projeto.supabase.co');
const isPlaceholderKey = !supabaseAnonKey || supabaseAnonKey === 'sua-chave-anon';
export const hasSupabaseConfig = !isPlaceholderUrl && !isPlaceholderKey;

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
