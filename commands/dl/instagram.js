import fetch from 'node-fetch';

export default {
  command: ['instagram', 'ig'],
  category: 'downloader',
  run: async (client, m, args, command) => {

    const url = args[0]

    if (!url) {
      return m.reply('💣 Ingrese un enlace de *Instagram*.')
    }

    if (!url.match(/instagram\.com\/(p|reel|share|tv)\//)) {
      return m.reply('💣 El enlace no parece *válido*. Asegúrate de que sea de *Instagram*')
    }

    try {
      const res = await fetch(`${api.url}/dl/instagram?url=${encodeURIComponent(url)}&key=${api.key}`)
      const json = await res.json()

      if (!json.status || !json.data || !json.data.dl) {
        return client.reply(m.chat, '💣 No se pudo *obtener* el contenido', m)
      }

      const { title, like, comment, type, dl } = json.data
      const caption = `ㅤ۟∩　ׅ　★ ໌　ׅ　🅘𝖦 🅓ownload　ׄᰙ

𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Titulo* › ${title}
𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Likes* › ${like}
𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Comentarios* › ${comment}
𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Tipo* › ${type}
𖣣ֶㅤ֯⌗ 💥  ׄ ⬭ *Enlace* › ${url}
`.trim()

      await client.sendMessage(
        m.chat,
        {
          [type]: { url: dl },
          caption
        },
        { quoted: m }
      )

    } catch (e) {
     // console.error(e)
      await client.reply(m.chat, msgglobal, m)
    }
  }
};