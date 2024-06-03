import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://eyaehvznlmfkwaanosut.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YWVodnpubG1ma3dhYW5vc3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczODAzNDcsImV4cCI6MjAzMjk1NjM0N30.8uOX7kfAE-iF1JS1IHvLZR9UdbcMyYpYpv-rSeD8EXQ";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;