import axios from 'axios'

export default {
  command: ['fb', 'facebook'],
  category: 'downloader',
  run: async (client, m, args, command) => {

    if (!args[0]) {
      return m.reply('💣 Ingrese un enlace de *Facebook*')
    }

    if (!args[0].match(/facebook\.com|fb\.watch|video\.fb\.com/)) {
      return m.reply('💣 Por favor, envía un link de Facebook válido')
    }

    try {
      const res = await axios.get(`${api.url}/dl/facebook`, {
        params: {
          url: args[0],
          key: api.key
        }
      })

      const json = res.data
      const downloads = json?.resultados?.filter(v =>
        v.url && v.url !== '/' && !v.quality.toLowerCase().includes('kbps')
      )

      if (!json.status || !downloads || downloads.length === 0) {
        return m.reply('ꕥ No se pudo obtener el *video*')
      }

      const random = downloads[Math.floor(Math.random() * downloads.length)]
      const videoUrl = random.url
      const quality = random.quality

      const caption = `ㅤ۟∩　ׅ　★　ׅ　🅕𝖡 🅓ownload　ׄᰙ　

𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Enlace* › ${args[0]}
𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Calidad* › ${quality}`.trim()

      await client.sendMessage(
        m.chat,
        { video: { url: videoUrl }, caption, mimetype: 'video/mp4', fileName: 'fb.mp4' },
        { quoted: m }
      )
    } catch (e) {
      await m.reply(msgglobal + e)
    }
  }
}