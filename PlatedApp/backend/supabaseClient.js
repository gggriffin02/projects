import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yribjypwwexuqoravaph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaWJqeXB3d2V4dXFvcmF2YXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzYwNTUsImV4cCI6MjA0NzU1MjA1NX0.Siz-joaDYcfPPpMsyhrSs8op2Nb984-gZcbV91bNVd0";
export const supabase = createClient(supabaseUrl, supabaseKey);
