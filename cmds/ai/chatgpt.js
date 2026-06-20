import db from "#db"
import fetch from 'node-fetch';

export default {
  command: ['ia', 'chatgpt'],
  category: 'ai',
  run: async ({ msg, sock, args, command }) => {

    const text = args.join(' ').toLowerCase()
    if (!text) {
      return msg.reply(`✎ Escriba una *petición* para que *ChatGPT* le responda.`)
    }

    const apiUrl = `${api.url}/ai/chatgpt?text=${encodeURIComponent(text)}&key=${api.key}`

    try {
      const { key } = await sock.sendMessage(
        msg.chat,
        { text: '✎ *ChatGPT* está procesando tu respuesta...' },
        { quoted: msg },
      )

      const res = await fetch(apiUrl)
      const json = await res.json()

      if (!json || !json.result) {
        return sock.reply(msg.chat, '✎ No se pudo obtener una *respuesta* válida')
      }

      const response = `${json.result}`.trim()

        await sock.sendMessage(msg.chat, { text: response, edit: key })
    } catch (error) {
      console.error(error)
      await msg.reply(msgglobal)
    }
  },
};