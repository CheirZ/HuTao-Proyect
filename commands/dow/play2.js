import yts from 'yt-search';
import fetch from 'node-fetch';
import { getBuffer } from '../../lib/message.js';
import sharp from 'sharp';
const limit = 100

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)

export default {
  command: ['play2', 'mp4', 'ytmp4', 'ytvideo', 'playvideo'],
  category: 'downloader',
  run: async (client, m, args) => {
    try {
      if (!args[0]) {
        return m.reply('《✧》Por favor, menciona el nombre o URL del video que deseas descargar')
      }

      const query = args.join(' ')
      let url, title, thumbBuffer

      if (!isYTUrl(query)) {
        const search = await yts(query)
        if (!search.all.length) {
          return m.reply('✐ No se *encontraron* resultados')
        }

        const videoInfo = search.all[0]
        url = videoInfo.url
        title = videoInfo.title
        thumbBuffer = await getBuffer(videoInfo.image)

        const vistas = (videoInfo.views || 0).toLocaleString()
        const canal = videoInfo.author?.name || 'Desconocido'
                const infoMessage = `🍓✿⃘࣪◌ ֪  Descargando › ${title}

> 🍒✿⃘࣪◌ ֪ Canal › ${canal}
> 🍒✿⃘࣪◌ ֪ Duración › ${videoInfo.timestamp || 'Desconocido'}
> 🍒✿⃘࣪◌ ֪ Vistas › ${vistas}
> 🍒✿⃘࣪◌ ֪ Publicado › ${videoInfo.ago || 'Desconocido'}
> 🍒✿⃘࣪◌ ֪ Enlace › ${url}

𐙚 🌽 ｡ ↻ El archivo se está enviando, espera un momento... ˙𐙚`

      await client.sendContextInfoIndex(m.chat, infoMessage, {}, m, true, null, {
        banner: videoInfo.image,
        title: '仚 🎧 PLAY',
        body: title
      })
      } else {
        url = query
      }

      let result
      let qu = ['144', '360', '480', '720', '1080'];
      let randomQuality = qu[Math.floor(Math.random() * qu.length)];
      try {
        const res = await fetch(`${api.url}/dl/ytmp4?url=${encodeURIComponent(url)}&quality=${randomQuality}&key=${api.key}`)
        result = await res.json()
        if (!result.status || !result.data || !result.data.dl) {
          throw new Error('Primera API falló')
        }
      } catch {
        try {
          const fallback = await fetch(`${api.url}/dl/ytdl?url=${encodeURIComponent(url)}&format=mp4&key=${api.key}`)
          result = await fallback.json()
          if (!result.status || !result.data || !result.data.dl) {
            return m.reply('《✧》 No se pudo descargar el *video*, intenta mas tarde.')
          }
        } catch {
          return m.reply('《✧》 No se pudo procesar el enlace. El servidor no respondió correctamente.')
        }
      }

const { dl, title: videoTitle } = result.data;
const enviarComoDocumento = Math.random() < 0.3;
let videoBuffer = await getBuffer(dl)
let mensaje;

if (enviarComoDocumento) {
  const thumbBuffer2 = await sharp(thumbBuffer)
    .resize(300, 300)
    .jpeg({ quality: 80 })
    .toBuffer();

  mensaje = {
    document: videoBuffer,
    mimetype: 'video/mp4',
    fileName: `${videoTitle}.mp4`,
    jpegThumbnail: thumbBuffer2
  };
} else {
  mensaje = {
    video: videoBuffer,
    fileName: `${videoTitle}.mp4`,
    mimetype: 'video/mp4'
  };
}

await client.sendMessage(m.chat, mensaje, { quoted: m });
    } catch (e) {
      await m.reply(msgglobal)
    }
  }
};

/*const yts = require('yt-search')
const fetch = require('node-fetch')

const VIDEO_SIZE_LIMIT = 100 * 1024 * 1024

export default {
  command: ['play2', 'mp4', 'playvideo', 'ytmp4', 'ytvideo'],
  category: 'downloader',
  run: async (client, m, args) => {
    const query = args.join(' ')
    if (!query) return m.reply('《✧》Por favor, menciona el nombre o URL del video que deseas descargar')

    try {
      let video
      const isYouTubeUrl = isValidYouTubeUrl(query)

      if (isYouTubeUrl) {
        video = await getVideoInfoFromUrl(query)
      } else {
        const { videos } = await yts(query)
        if (!videos || videos.length === 0) return m.reply('No se encontraron resultados.')
        video = videos[0]
      }

      const vistas = (video.views || 0).toLocaleString()
      const canal = video.author?.name || 'Desconocido'
      const videoInfoMsg = `➩ Descargando › *${video.title}*

> ❖ Canal › *${canal}*
> ⴵ Duración › *${video.timestamp || 'Desconocido'}*
> ❀ Vistas › *${vistas}*
> ✩ Publicado › *${video.ago || 'Desconocido'}*
> ❒ Enlace › *${video.url}*`

      client.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: videoInfoMsg }, { quoted: m })

      const mediaUrl = await yt.download(video.url, '720p')
      if (!mediaUrl || !mediaUrl.dlink) throw new Error('No se pudo obtener el enlace de descarga')

      const videoBuffer = await fetch(mediaUrl.dlink).then(res => res.buffer())
      const videoSize = videoBuffer.length
      const shouldSendAsDocument = videoSize > VIDEO_SIZE_LIMIT
      const fileName = `${sanitizeFileName(video.title.substring(0, 64))}.mp4`

      if (shouldSendAsDocument) {
        const documentMedia = await prepareWAMessageMedia({ document: videoBuffer }, { upload: client.waUploadToServer })
        const msg = generateWAMessageFromContent(m.chat, {
          documentMessage: {
            ...documentMedia.documentMessage,
            fileName: fileName,
            mimetype: 'video/mp4'
          }
        }, { quoted: m })

        await client.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
      } else {
        await client.sendMessage(m.chat, {
          video: videoBuffer,
          caption: video.title,
          mimetype: 'video/mp4',
          fileName: fileName
        }, { quoted: m })
      }
    } catch (e) {
      await m.reply(msgglobal)
    }
  }
}

function isValidYouTubeUrl(url) {
  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)/i
  return ytRegex.test(url) && extractVideoId(url)
}

async function getVideoInfoFromUrl(url) {
  const videoId = extractVideoId(url)
  const { videos } = await yts(`https://youtu.be/${videoId}`)
  if (!videos || videos.length === 0) throw new Error('No se pudo obtener información del video')
  const video = videos[0]
  return {
    videoId,
    url: `https://youtu.be/${videoId}`,
    title: video.title,
    author: { name: video.author.name },
    timestamp: video.timestamp,
    thumbnail: video.thumbnail,
    views: video.views,
    ago: video.ago
  }
}

function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, '')
}

function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=)([^&\n?#]+)/)
  return match ? match[1] : null
}

const yt = {
  get baseUrl() {
    return { origin: 'https://ssvid.net' }
  },

  get baseHeaders() {
    return {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'origin': this.baseUrl.origin,
      'referer': this.baseUrl.origin + '/youtube-to-mp3'
    }
  },

  validateFormat(userFormat) {
    const validFormat = ['mp3', '360p', '720p', '1080p']
    if (!validFormat.includes(userFormat)) throw Error(`Formato inválido. Formatos disponibles: ${validFormat.join(', ')}`)
  },

  handleFormat(userFormat, searchJson) {
    this.validateFormat(userFormat)
    let result
    if (userFormat === 'mp3') {
      result = searchJson.links?.mp3?.mp3128?.k
    } else {
      const allFormats = Object.entries(searchJson.links.mp4)
      const quality = allFormats.map(v => v[1].q).filter(v => /\d+p/.test(v)).map(v => parseInt(v)).sort((a, b) => b - a).map(v => v + 'p')
      const selectedFormat = quality.includes(userFormat) ? userFormat : quality[0]
      const find = allFormats.find(v => v[1].q === selectedFormat)
      result = find?.[1]?.k
    }
    if (!result) throw Error(`Formato ${userFormat} no disponible para este video`)
    return result
  },

  async hit(path, payload) {
    const body = new URLSearchParams(payload)
    const opts = { headers: this.baseHeaders, body, method: 'post' }
    const r = await fetch(`${this.baseUrl.origin}${path}`, opts)
    if (!r.ok) throw Error(`${r.status} ${r.statusText}\n${await r.text()}`)
    return await r.json()
  },

  async download(queryOrYtUrl, userFormat = 'mp4') {
    this.validateFormat(userFormat)

    let search = await this.hit('/api/ajax/search', {
      query: queryOrYtUrl,
      cf_token: '',
      vt: 'youtube'
    })

    if (search.p === 'search') {
      if (!search?.items?.length) throw Error(`No se encontraron resultados para: ${queryOrYtUrl}`)
      const { v } = search.items[0]
      const videoUrl = `https://www.youtube.com/watch?v=${v}`
      search = await this.hit('/api/ajax/search', {
        query: videoUrl,
        cf_token: '',
        vt: 'youtube'
      })
    }

    const vid = search.vid
    const k = this.handleFormat(userFormat, search)

    const convert = await this.hit('/api/ajax/convert', { k, vid })

    if (convert.c_status === 'CONVERTING') {
      let convert2
      const limit = 10
      let attempt = 0
      do {
        attempt++
        convert2 = await this.hit('/api/convert/check?hl=en', {
          vid,
          b_id: convert.b_id
        })
        if (convert2.c_status === 'CONVERTED') return convert2
        await new Promise(re => setTimeout(re, 5000))
      } while (attempt < limit && convert2.c_status === 'CONVERTING')
      throw Error('El archivo aún se está procesando. Intenta de nuevo en unos momentos.')
    }

    return convert
  }
}*/