import axios from 'axios'

const API_URL = 'https://api.openai.com/v1/'
const MODEL = 'gpt-4o'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

// 画像をBase64エンコードする関数
export const encodeImageToBase64 = async (filePath: string) => {
  const response = await fetch(filePath)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = reader.result.split(',')[1] // "data:image/jpeg;base64," の部分を除去
      resolve(base64data)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const chatgpt = async (message: string, imageBase64: string) => {
  // export const chatgpt = async (message: string) => {
  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        // モデル ID の指定
        model: MODEL,
        // 質問内容
        messages: [
          {
            role: 'system',
            content:
              'You are an AI trained to evaluate the cleanliness of toilets based on images. Evaluate the cleanliness of a toilet very strictly on a scale of 0 to 5 from the provided image. If it is not a toilet, answer with 0. No explanation is needed. Answer with a single digit from 0 to 5. Example: 0, 1, 2, 3, 4, 5.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: message },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'low', // 解像度を指定（low、high、autoのいずれか）
                },
              },
            ],
          },
        ],
      },
      {
        // 送信する HTTP ヘッダー(認証情報)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )
    // 回答の取得
    return response.data.choices[0].message.content
  } catch (error) {
    console.error(error)
    return null
  }
}
