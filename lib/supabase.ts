import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knchylcobswtgnafjinz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY2h5bGNvYnN3dGduYWZqaW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTgzMzMsImV4cCI6MjA2NzYzNDMzM30.ntpNdT5nK3xernZFVKv9gh6HPKYTM36tdt_83DocAHk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);