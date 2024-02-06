
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://exlamkqalqckqluidthi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bGFta3FhbHFja3FsdWlkdGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyMDY5NzUsImV4cCI6MjAyMjc4Mjk3NX0.cVdju9ufnzO24dD6pr25uC6KcrokO783pawBTDCC4p8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
