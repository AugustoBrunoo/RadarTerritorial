import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || '...' // Need real URL? No, wait, I can just grep 'status' in denuncias or just use the whole table count if it doesn't have status.
