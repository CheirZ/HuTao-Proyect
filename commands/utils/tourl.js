import axios from 'axios'
import FormData from 'form-data'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

function generateUniqueFilename(mime) {
  const ext = mime.split('/')[1] || 'bin'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${id}.${ext}`
}

async function uploadToCatbox(buffer, mime) {
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, { filename: generateUniqueFilename(mime) })

  const res = await axios.post('https://catbox.moe/user/api.php', form, {
    headers: form.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })

  if (typeof res.data !== 'string' || !res.data.startsWith('https://')) {
    throw new Error('Respuesta inválida de Catbox')
  }
  return res.data.trim()
}

export default {
  command: ['tourl'],
  category: 'utils',
  run: async (client, m, args, command, text, prefix) => {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) {
      return client.reply(
        m.chat,
        `✿ Por favor, responde a una imagen o video con el comando *${prefix + command}* para convertirlo en una URL.`,
        m
      )
    }

    try {
      const media = await q.download()
      const link = await uploadToCatbox(media, mime)
      const userName = global.db.data.users[m.sender]?.name || 'Usuario'
      const upload = `𖹭 ❀ *Upload To Catbox*\n\nׅ  ׄ  ✿   ׅ り *Link ›* ${link}\nׅ  ׄ  ✿   ׅ り *Peso ›* ${formatBytes(media.length)}\nׅ  ׄ  ✿   ׅ り *Solicitado por ›* ${userName}\n\n${dev}`
      await client.sendContextInfoIndex(m.chat, upload, {}, m, true, {})
    } catch (e) {
      await m.reply(msgglobal)
    }
  }
}
