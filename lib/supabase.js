// lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Nanti kita isi URL dan KEY ini dari dashboard Supabase
const supabaseUrl = 'MASUKKAN_SUPABASE_URL_DISINI';
const supabaseAnonKey = 'MASUKKAN_SUPABASE_ANON_KEY_DISINI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});