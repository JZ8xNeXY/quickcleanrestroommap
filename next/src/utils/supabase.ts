import { createClient } from '@supabase/supabase-js'

// https://supabase.com/blog/supabase-js-v2

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

// 環境変数が正しく設定されているか確認
console.log('Supabase URL:', supabaseUrl) // ここで確認
console.log('Supabase API Key:', supabaseKey) // ここで確認

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or API Key')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
