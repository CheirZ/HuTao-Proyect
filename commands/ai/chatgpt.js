import fetch from 'node-fetch';

export default {
  command: ['ia', 'chatgpt'],
  category: 'ai',
  run: async (client, m, args, command) => {

    const text = args.join(' ').toLowerCase()

    if (!text) {
      return m.reply(`𖧷 Escriba una *petición* para que *ChatGPT* le responda.`)
    }

    const apiUrl = `${api.url}/ai/chatgpt?text=${encodeURIComponent(text)}&key=${api.key}`

    try {
      const { key } = await client.sendMessage(
        m.chat,
        { text: `𑁍 *ChatGPT* está procesando tu respuesta...` },
        { quoted: m },
      )

      const res = await fetch(apiUrl)
      const json = await res.json()

      if (!json || !json.result) {
        return client.reply(m.chat, '᪥ No se pudo obtener una *respuesta* válida')
      }

      const response = `${json.result}`.trim()
      await client.sendMessage(m.chat, { text: response, edit: key })
    } catch (error) {
      console.error(error)
      await m.reply(msgglobal)
    }
  },
};
