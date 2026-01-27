import fetch from 'node-fetch';

export default {
  command: ['ia', 'chatgpt'],
  category: 'ai',
  run: async (client, m, args, command) => {

    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = global.db.data.settings[botId]?.botprem === false
    const isModBot = global.db.data.settings[botId]?.botmod === false

    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, `🌽 El comando *${command}* no esta disponible en *Sub-Bots.*`, m)
    }

    const text = args.join(' ').toLowerCase()

    if (!text) {
      return m.reply(`🍒 Escriba una *petición* para que *ChatGPT* le responda.`)
    }

    const apiUrl = `${api.url}/ai/chatgpt?text=${encodeURIComponent(text)}&key=${api.key}`

    try {
     const txc = `🌾 *ChatGPT* está procesando tu respuesta...`;
      const { key } = await client.sendMessage(
        m.chat,
        { text: txc },
        { quoted: m },
      )

      const res = await fetch(apiUrl)
      const json = await res.json()

      if (!json || !json.result) {
        return client.reply(m.chat, '🐣 No se pudo obtener una *respuesta* válida')
      }

      const response = `${json.result}`.trim()
      await client.sendMessage(m.chat, { text: response, edit: key })
    } catch (error) {
      console.error(error)
      await m.reply(msgglobal)
    }
  },
};
