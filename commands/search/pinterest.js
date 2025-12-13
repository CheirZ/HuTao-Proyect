import fetch from 'node-fetch'

export default {
  command: ['pinterest', 'pin'],
  category: 'search',
  run: async (client, m, args, from) => {
    const text = args.join(' ')
    const isPinterestUrl = /^https?:\/\//.test(text)

    if (!text) {
      return m.reply(
        `🌾 Ingresa un *término* de búsqueda o un enlace de *Pinterest*.`,
      )
    }

    try {
      if (isPinterestUrl) {
        const pinterestUrl = `${api.url}/dl/pinterest?url=${text}&key=${api.key}`
        const ress = await fetch(pinterestUrl)
        if (!ress.ok) throw new Error(`La API devolvió un código de error: ${ress.status}`)

        const { data: result } = await ress.json()
        const mediaType = ['image', 'video'].includes(result.type) ? result.type : 'document'

        const message2 =
          `> 🌱 Resultados para › *${result.title}*\n` +
          `💥 Author › *${result.author}*\n` +
          `💥 Tipo › *${result.type}*\n\n${dev}`

        await client.sendMessage(
          m.chat,
          { [mediaType]: { url: result.dl }, caption: message2 },
          { quoted: m },
        )
      } else {
        const pinterestAPI = `${api.url}/search/pinterest?query=${text}&key=${api.key}`
        const res = await fetch(pinterestAPI)
        if (!res.ok) throw new Error(`La API devolvió un código de error: ${res.status}`)

        const jsons = await res.json()
        const json = jsons.data

        if (!json || json.length === 0) {
          return m.reply(`🌾 No se encontraron resultados para *${text}*`)
        }

        const index = Math.floor(Math.random() * json.length)
        const result = json[index]

        const message =
          `🌱 Resultados para › *${text}*\n\n` +
          `💥 Título › *${result.title}*\n` +
          `🍃 Descripción › *${result.description}*\n` +
          `⛱️ Autor › *${result.full_name}*\n` +
          `🫐 Likes › *${result.likes}*\n` +
          `💣 Publicado › *${result.created}*\n\n${dev}`

        await client.sendMessage(
          m.chat,
          { image: { url: result.hd }, caption: message },
          { quoted: m },
        )
      }
    } catch (e) {
     // console.error('[Pinterest Error]', e)
      await client.reply(
        m.chat,
       msgglobal,
        m
      )
    }
  },
}