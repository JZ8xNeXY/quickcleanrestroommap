import axios from 'axios'

const API_URL = 'https://api.openai.com/v1/'
const MODEL = 'gpt-4o'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

export const isValidImage = (file: File) => {
  const validFormats = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
  return validFormats.includes(file.type) && file.size <= 20 * 1024 * 1024 // 20MB以下
}

export const reencodeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Blob creation failed'))
        }
      }, 'image/jpeg')
    }

    img.onerror = (err) => reject(err)

    const reader = new FileReader()
    reader.onloadend = () => {
      img.src = reader.result as string
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

// 画像をそのまま送れないので画像をBase64エンコード（テキストに変換）する関数
export const encodeImageToBase64 = (
  fileOrBlob: File | Blob,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(',')[1] // "data:image/jpeg;base64," の部分を除去
      resolve(base64data)
    }
    reader.onerror = reject
    reader.readAsDataURL(fileOrBlob)
  })
}

export const chatgpt = async (imageBase64: string, mimeType: string) => {
  console.log(mimeType)
  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are an AI trained to evaluate the cleanliness of toilets based on images. Evaluate the cleanliness of a toilet very strictly on a scale of 0 to 5 from the provided image. If it is not a toilet, answer with 0. No explanation is needed. Answer with a single digit from 0 to 5. Example: 0, 1, 2, 3, 4, 5.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'This is an app to rate the cleanliness of a toilet based on photos on a five-point scale.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                  detail: 'low', // 解像度を指定（low、high、autoのいずれか）今のところlowでも精度高い
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
    return response.data.choices[0].message.content
  } catch (error) {
    console.error(error)
    return null
  }
}
