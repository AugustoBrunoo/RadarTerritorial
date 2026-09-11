import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Try to parse .env file
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key) env[key.trim()] = value.join('=').trim();
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);
async function run() {
  const { data, error } = await supabase.from('denuncias').select('*, relatos(*, profiles(*))').limit(1);
  console.log("Data:", JSON.stringify(data, null, 2));
  if (error) console.log("Error:", error);
}
run();
