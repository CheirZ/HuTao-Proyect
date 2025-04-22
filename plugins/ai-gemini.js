import fetch from 'node-fetch'
//Modificado por Ramón V3.2 wa.me//523142183828

var handler = async (m, { text,  usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `✨ *Ingresé una petición*\n\nEjemplo, ${usedPrefix + command} hola, que es HuTao?`, m)
  try {
    await m.react('🕒')
    conn.sendPresenceUpdate('composing', m.chat)
    var apii = await fetch(`mindustry.zapto.org:38566/api?user=Miguel&msg=${text}`)
    var res = await apii.json()
    await conn.reply(m.chat, res.text, m)
    await m.react('✅️')
  } catch (error) {
    return conn.reply(m.chat, `Ocurrio un error {error: ${error}}.`, m)
  }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
export default handler
