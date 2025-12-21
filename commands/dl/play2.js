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
        return m.reply('💣 Por favor, menciona el nombre o URL del video que deseas descargar')
      }

      const query = args.join(' ')
      let url, title, thumbBuffer

      if (!isYTUrl(query)) {
        const search = await yts(query)
        if (!search.all.length) {
          return m.reply('No se *encontraron* resultados')
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
╰─────°.♡.°‧─────`;

        await client.sendMessage(m.chat, { image: thumbBuffer, caption: infoMessage }, { quoted: m })
      } else {
        url = query
      }

      let result
      let qu = ['480', '720', '1080'];
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
            return m.reply('No se pudo descargar el *video*, intenta mas tarde.')
          }
        } catch {
          return m.reply('No se pudo procesar el enlace. El servidor no respondió correctamente.')
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
