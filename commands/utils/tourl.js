import FormData from 'form-data'
import fetch from 'node-fetch'

const SERVERS = ['evogb', 'catbox', 'uguu', 'quax', 'zenzxz', 'top4top', 'auto'] as const
type Server = typeof SERVERS[number]

const MIME_MAP: Record<string, string> = {
  'ffd8ff': 'image/jpeg',
  '89504e': 'image/png',
  '474946': 'image/gif',
  '52494646': 'image/webp',
  '00000': 'video/mp4',
  '664c6143': 'audio/flac',
  '494433': 'audio/mpeg',
  '255044': 'application/pdf',
  '504b03': 'application/zip',
}

function detectMime(buffer: Buffer): string {
  const hex = buffer.slice(0, 4).toString('hex')
  for (const [sig, mime] of Object.entries(MIME_MAP)) {
    if (hex.startsWith(sig)) return mime
  }
  return 'application/octet-stream'
}

function mimeToExt(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp',
    'video/mp4': 'mp4', 'audio/mpeg': 'mp3', 'audio/flac': 'flac',
    'application/pdf': 'pdf', 'application/zip': 'zip',
  }
  return map[mime] || 'bin'
}

async function uploadFromBuffer(buffer: Buffer, server: Server = 'evogb'): Promise<string> {
  const mime = detectMime(buffer)
  const ext = mimeToExt(mime)
  const form = new FormData()
  form.append('file', buffer, { filename: `file.${ext}`, contentType: mime })
  form.append('server', server === 'auto' ? 'auto' : server)
  form.append('method', 'local')
  const res = await fetch('https://api.evogb.org/tools/upload', {
    method: 'POST',
    body: form as any,
    headers: form.getHeaders()
  })
  const data = await res.json() as any
  if (!data.url) throw new Error(data.message || 'No se obtuvo URL')
  return data.url
}

async function uploadFromUrl(url: string, server: Server = 'evogb'): Promise<string> {
  const apiUrl = `https://api.evogb.org/tools/upload?server=${server}&method=url&url=${encodeURIComponent(url)}`
  const res = await fetch(apiUrl)
  const data = await res.json() as any
  if (!data.url) throw new Error(data.message || 'No se obtuvo URL')
  return data.url
}

export default {
  command: ['upload', 'upfile', 'subir'],
  description: 'Sube un archivo o imagen a un servidor de hosting permanente.',
  category: 'utils',
  use: '(responde a un archivo/imagen/sticker) [servidor]',

  run: async (sock: any, m: any, { args }: any) => {
    const serverArg = args[0]?.toLowerCase() as Server
    const server: Server = SERVERS.includes(serverArg) ? serverArg : 'evogb'

    const q = m.quoted ? m.quoted : m

    const isSticker = q.type === 'stickerMessage' || q.msg?.mimetype === 'image/webp'
    const isMedia = q.isMedia || q.msg?.mimetype || isSticker
console.log('MSG TYPE:', q.type, q.mtype)
console.log('MSG KEYS:', Object.keys(q))
console.log('MSG CONTENT:', JSON.stringify(q.message || q.msg || {}, null, 2))
    if (!isMedia) {
      return m.reply(
        `🧩 *Responde a un archivo, imagen o sticker.*\n\n` +
        `*Servidores disponibles:*\n` +
        `> › \`evogb\` _(por defecto)_\n` +
        `> › \`catbox\`\n` +
        `> › \`uguu\`\n` +
        `> › \`quax\`\n` +
        `> › \`zenzxz\`\n` +
        `> › \`top4top\`\n` +
        `> › \`auto\` _(elige el mejor)_\n\n` +
        `_Ejemplo: \`.upload catbox\`_`
      )
    }

    m.reply('☁️ Cargando…')

    try {
      const media = await q.download()
      if (!media) return m.reply('☔ No se pudo descargar el archivo.')

      let mime = detectMime(media)
      if (mime === 'application/octet-stream' && isSticker) {
        mime = 'image/webp'
      }

      const ext = mimeToExt(mime)
      const form = new FormData()
      form.append('file', media, { filename: `file.${ext}`, contentType: mime })
      form.append('server', server === 'auto' ? 'auto' : server)
      form.append('method', 'local')

      const res = await fetch('https://api.evogb.org/tools/upload', {
        method: 'POST',
        body: form as any,
        headers: form.getHeaders()
      })

      const data = await res.json() as any
      if (!data.url) throw new Error(data.message || 'No se obtuvo URL')

      const url = data.url
      const serverLabel = server === 'auto' ? 'Auto' : server.charAt(0).toUpperCase() + server.slice(1)
      const typeLabel = isSticker ? '🩷 Sticker (WebP)' : '📄 Archivo'

      await m.reply(
        `ㅤ۟∩　ׅ　☁️ ໌　ׅ　𝖴𝗉𝗅𝗈𝖺𝖽　ׄᰙ\n\n` +
        `> 🍶ᩴᩴ  𝖠𝗋𝖼𝗁𝗂𝗏𝗈 𝗌𝗎𝖻𝗂𝖽𝗈 ›\n\n` +
        `𖣣ֶㅤ֯⌗ 🎭̷ ׄ ⬭ *Tipo* › ${typeLabel}\n` +
        `𖣣ֶㅤ֯⌗ 🌐̷ ׄ ⬭ *Servidor* › ${serverLabel}\n` +
        `𖣣ֶㅤ֯⌗ 🔗̷ ׄ ⬭ *Enlace* › ${url}\n\n` +
        ` ۟　　ׅ　ᡣ᷼𐢭　ׄ　　ׅ　🫧ᩧ　ׅ　　۟　✿ׅ　۟　ׅ　ᰍᰍ　ׄ　𓅞ׅ 　۟ `
      )

    } catch (e: any) {
      console.error(e)
      await m.reply('🎋 *Error al subir el archivo. Intenta con otro servidor.*')
    }
  }
    }
