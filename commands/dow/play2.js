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
                const infoMessage = `╭─────°.♡.°‧─────
│ 🥀𝐏𝐋𝐀𝐘-𝐘𝐎𝐔𝐓𝐔𝐁𝐄🍃
│ 📌 *𝚃𝙸𝚃𝚄𝙻𝙾:* ${title}
│ 📆 *𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:* ${videoInfo.ago || 'Desconocido'}
│ ⌚ *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${videoInfo.timestamp || 'Desconocido'}
│ 👀 *𝚅𝙸𝚂𝚃𝙰𝚂:* ${vistas}
│ 🔗 *𝙻𝙸𝙽𝙺:* ${url}
╰─────°.♡.°‧─────`

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
}
