import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb', // 必要に応じてサイズを変更
    },
  },
}

export default async function chatgptApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const API_URL = 'https://api.openai.com/v1/'
  const MODEL = 'gpt-4o-mini'
  const API_KEY = process.env.OPENAI_API_KEY

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageDataBase64 } = req.body

  if (!imageDataBase64) {
    return res.status(400).json({ error: 'Image data is required' })
  }

  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are an AI trained to evaluate the cleanliness of toilets based on images. Evaluate the cleanliness of a toilet very strictly on a scale of 0 to 5 from the provided image. If it is not a toilet, answer with 0. No explanation is needed. Answer with a single digit from 0 to 5.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageDataBase64}`,
                  detail: 'low',
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )

    res.status(200).json({ result: response.data.choices[0].message.content })
  } catch (error) {
    console.error('Error processing request:', error)
    res.status(500).json({ error: 'Error generating response' })
  }
}
