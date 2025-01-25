import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Supabaseクライアントの作成
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;



if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies['accessToken'];
 
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`, // token を使用
      },
    },
  });

  const {
    id,
  } = req.body;

  const {data,error } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)


  // エラーハンドリング
  if (error) {
    console.error('Error delete:', error);
    return res.status(400).json({ error: error.message });
  }

  // 成功時のレスポンス
  return res.status(200).json({ data });
}