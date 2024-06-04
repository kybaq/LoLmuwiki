import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const SUPABASE_PROJECT_URL = 'https://zhgfrtaulmfwmyzhyzbp.supabase.co';

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZ2ZydGF1bG1md215emh5emJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDk1MjUsImV4cCI6MjAzMjcyNTUyNX0.yf-BfY2UinOSBek3XqtCvUjPARJYCkgjRr5U0DCs4qg';

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
