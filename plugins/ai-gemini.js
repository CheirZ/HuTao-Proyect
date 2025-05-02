import axios from 'axios'
var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `✨ *Ingresé una petición*\n\nEjemplo, ${usedPrefix + command} hola, que es HuTao?`, m)
  try {
    await m.react('🕒')
    conn.sendPresenceUpdate('composing', m.chat)
    const url = 'http://mindustry.zapto.org:38566/api/index.php'
    const response = await axios.get(url, {
      params: {
        user: 'Miguel',
        msg: m.text,
        type: 'ia'
      }
    })
    const resData = response.data
    if (resData && resData.text) {
      await conn.reply(m.chat, resData.text, m)
    } else {
      await conn.reply(m.chat, 'No se recibió una respuesta válida de la API.', m)
    }
    await m.react('✅️')
  } catch (error) {
    return conn.reply(m.chat, `Ocurrió un error: ${error}`, m)
  }
}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
export default handler
