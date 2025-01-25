import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const token = req.cookies.accessToken
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { data, error } = await supabase.auth.getUser(token)
      if (error || !data) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      res.status(200).json(data.user)
    } catch (err) {
      console.error('Error fetching user:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
