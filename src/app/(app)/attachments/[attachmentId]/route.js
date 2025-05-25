import { getDB } from '@/lib/db'
import { Buffer } from 'buffer'

export async function GET(_, { params }) {
  const attachmentId = parseInt((await params).attachmentId)
  if (isNaN(attachmentId)) return new Response('Not found', { status: 404 })

  const db = await getDB()
  const attachment = await db.get('SELECT * FROM attachments WHERE id = ?', [attachmentId])

  if (!attachment) return new Response('Not found', { status: 404 })

  const mimeType = 'application/octet-stream' //TODO: detect mime time
  const fileBuffer = Buffer.from(attachment.file, 'base64')

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${attachment.name}"`
    }
  })
}