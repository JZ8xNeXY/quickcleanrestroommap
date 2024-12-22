import { AuthError } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase'

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      const authError = error as AuthError
      return res
        .status(authError.status || 401)
        .json({ error: authError.message })
    }
    return res.status(200).json({ user: data.user, session: data.session })
  } catch (error: unknown) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
