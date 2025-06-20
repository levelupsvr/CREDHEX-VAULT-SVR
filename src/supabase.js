import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjcfsfyljstsovhrkfnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY2ZzZnlsanN0c292aHJrZm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODI1MDksImV4cCI6MjA2NTQ1ODUwOX0.KQKqBVSvtFi6104za4QS00ylb7mrxUHRmlBlYrdMOPA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
