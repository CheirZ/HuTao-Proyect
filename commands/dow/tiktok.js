import fetch from 'node-fetch';

export default {
  command: ['tiktok', 'tt'],
  category: 'downloader',
  run: async (client, m, args, command) => {

    if (!args.length) {
      return m.reply(`🍒 Ingresa un *término* o *enlace* de TikTok.`)
    }

    const urls = args.filter(arg => arg.includes("tiktok.com"))

    if (urls.length) {
      for (const url of urls) {
        try {
          const apiUrl = `${api.url}/dl/tiktok?url=${url}&key=${api.key}`
          const res = await fetch(apiUrl)
          if (!res.ok) throw new Error(`El servidor respondió con ${res.status}`)
          const json = await res.json()

          const data = json.data
          if (!data) {
            await m.reply(`🍒 No se encontraron resultados para: ${url}`)
            continue
          }

          const {
            title = 'Sin título',
            dl,
            duration,
            author = {},
            stats = {},
            music = {},
          } = data

          const caption = `ㅤ۟∩　ׅ　★ ໌　ׅ　🅣𝗂𝗄𝖳𝗈𝗄 🅓ownload　ׄᰙ

𖣣ֶㅤ֯⌗ 🌽  ׄ ⬭ *Título:* ${title}
𖣣ֶㅤ֯⌗ 🍒  ׄ ⬭ *Autor:* ${author.nickname || author.unique_id || 'Desconocido'}
𖣣ֶㅤ֯⌗ 🍓  ׄ ⬭ *Duración:* ${duration || 'N/A'}
𖣣ֶㅤ֯⌗ 🦩  ׄ ⬭ *Likes:* ${(stats.likes || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🌺  ׄ ⬭ *Comentarios:* ${(stats.comments || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🌾  ׄ ⬭ *Vistas:* ${(stats.views || stats.plays || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🪶  ׄ ⬭ *Compartidos:* ${(stats.shares || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🐢  ׄ ⬭ *Audio:* ${music.title ? music.title + ' -' : 'Desconocido'} ${music.author || ''}`.trim()

          const head = await fetch(dl, { method: 'HEAD' })
          const contentType = head.headers.get('content-type') || '' 

          if (contentType.includes('video')) {
            await client.sendMessage(m.chat, { video: { url: dl }, caption }, { quoted: m })
          } else {
            await m.reply(`🌽 El contenido de ${url} no es *compatible*`)
          }
        } catch (e) {
          //console.error(e)
          await m.reply(msgglobal)
        }
      }
    } else {
      const query = args.join(" ")
      try {
        const apiUrl = `${api.url}/search/tiktok?query=${encodeURIComponent(query)}&key=${api.key}`
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error(`El servidor respondió con ${res.status}`)
        const json = await res.json()

        const data = json.data?.[0]
        if (!data) {
          return m.reply(`🌽 No se encontraron resultados para: ${query}`)
        }

        const {
          title = 'Sin título',
          dl,
          duration,
          author = {},
          stats = {},
          music = {},
        } = data

        const caption = `ㅤ۟∩　ׅ　★ ໌　ׅ　🅣𝗂𝗄𝖳𝗈𝗄 🅓ownload　ׄᰙ

𖣣ֶㅤ֯⌗ 🌽  ׄ ⬭ *Título:* ${title}
𖣣ֶㅤ֯⌗ 🍓  ׄ ⬭ *Autor:* ${author.nickname || author.unique_id || 'Desconocido'}
𖣣ֶㅤ֯⌗ 🌺  ׄ ⬭ *Duración:* ${duration || 'N/A'}
𖣣ֶㅤ֯⌗ 🍒  ׄ ⬭ *Likes:* ${(stats.likes || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🪶  ׄ ⬭ *Comentarios:* ${(stats.comments || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🐢  ׄ ⬭ *Vistas:* ${(stats.views || stats.plays || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🌾  ׄ ⬭ *Compartidos:* ${(stats.shares || 0).toLocaleString()}
𖣣ֶㅤ֯⌗ 🫛  ׄ ⬭ *Audio:* ${music.title ? music.title + ' -' : 'Desconocido'} ${music.author || ''}`.trim()

        const head = await fetch(dl, { method: 'HEAD' })
        const contentType = head.headers.get('content-type') || ''

        if (contentType.includes('video')) {
          return client.sendMessage(m.chat, { video: { url: dl }, caption }, { quoted: m })
        }

        return m.reply('🌽 El contenido no es *compatible*')
      } catch (e) {
        // console.error(e)
        m.reply(msgglobal)
      }
    }
  },
};