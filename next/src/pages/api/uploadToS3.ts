import AWS from 'aws-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function uploadToS3(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    })

    // クエリではなくリクエストボディから取得
    const { fileName, fileType } = req.body

    if (!fileName || !fileType) {
      res.status(400).json({ error: 'fileName and fileType are required' })
      return
    }

    const params = {
      Bucket: 'quickcleanrestroommap',
      Key: `${Date.now()}-${fileName}`, // 一意のファイル名にする
      Expires: 60, // プリサインドURLの有効期限
      ContentType: fileType, // ファイルのコンテンツタイプ
    }

    // S3用のプリサインドURLを生成
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    res.status(200).json({ uploadURL })
    console.log('📡 upload.status success')
  } catch (error) {
    console.error('Error generating upload URL:', error)
    res.status(500).json({ error: 'Error generating upload URL' })
  }
}
