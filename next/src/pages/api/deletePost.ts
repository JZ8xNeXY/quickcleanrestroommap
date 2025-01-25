import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or API Key')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies['accessToken']

  if (!token || typeof token !== 'string') {
    throw new Error('Access token is missing or invalid.')
  }

  const supabase = createClient(supabaseUrl as string, supabaseKey as string, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`, // token を使用
      },
    },
  })

  const { id } = req.body

  const { data, error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error delete:', error)
    return res.status(400).json({ error: error.message })
  }

  return res.status(200).json({ data })
}
