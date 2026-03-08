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

async function uploadToServer(buffer, mime) {
  const form = new FormData()
  form.append('file', buffer, { filename: generateUniqueFilename(mime) })
  const res = await axios.post(`https://bot.stellarwa.xyz/upload`, form, {
    headers: {
      ...form.getHeaders(),
      'Content-Type': 'multipart/form-data'
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  if (!res.data?.status || !res.data?.url) {
    throw new Error('Respuesta inválida del servidor: ' + JSON.stringify(res.data))
  }
  return res.data.url
}

export default {
  command: ['tourl'],
  category: 'utils',
  run: async (client, m, args, command, text, prefix) => {
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = await getSettings(botId)
    const isPremiumBot = botSettings.botprem === false
    const isModBot = botSettings.botmod === false

    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, mess.solosub, m)
    }

    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) {
      return client.reply(
        m.chat,
        `✿ Por favor, responde a una imagen o video con el comando *${prefix + command}* para convertirlo en una URL.`,
        m
      )
    }

    /*if (!mime.startsWith('image/') && !mime.startsWith('video/')) {
      return client.reply(m.chat, '✐ Solo se permiten imágenes o videos para subir al CDN.', m)
    }*/

    try {
      const media = await q.download()
      const link = await uploadToServer(media, mime)
      const userName = m.pushName || 'Usuario'
      const upload = `𖹭 ❀ *Upload To Stellar*\n\nׅ  ׄ  ✿   ׅ り *Link ›* ${link}\nׅ  ׄ  ✿   ׅ り *Peso ›* ${formatBytes(media.length)}\nׅ  ׄ  ✿   ׅ り *Tipo ›* ${mime.split('/')[1].toUpperCase() || 'UNKNOWN'}\nׅ  ׄ  ✿   ׅ り *Solicitado por ›* ${userName}\n\n${dev}`
      await client.sendContextInfoIndex(m.chat, upload, {}, m, true, {
        thumbnail: media
      })
    } catch (e) {
      await m.reply(
        `${msgglobal}`
      )
    }
  }
}
