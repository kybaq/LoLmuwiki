import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = 'https://zhgfrtaulmfwmyzhyzbp.supabase.co';

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZ2ZydGF1bG1md215emh5emJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDk1MjUsImV4cCI6MjAzMjcyNTUyNX0.yf-BfY2UinOSBek3XqtCvUjPARJYCkgjRr5U0DCs4qg';

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;
