import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(200).json({ hasToken: false })
  }

  return res.status(200).json({ hasToken: true })
}
