import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ybjxibjywgxtqkzwwmoa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlianhpYmp5d2d4dHFrend3bW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MjYyMTgsImV4cCI6MjEwOTIwMjIxOH0.WI6nsL6YEMKq-dQwF2zmEdcHCsE2cpJEBeXgeEE619g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);