import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `✨ *Ingresé una petición*\n\nEjemplo, ${usedPrefix + command} hola, que es HuTao?`, m)
try {
await m.react('🕒')
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://api.dorratz.com/ai/gemini?prompt=${text}`)
var res = await apii.json()
await conn.reply(m.chat, res.message, m, rcanal)
await m.react('✅️')
} catch (error) {
await m.react('✖️')
console.error(error)
return conn.reply(m.chat, `💔 *Ocurrió un fallo*\n🍄 *Detalles:* ${error}`, m, rcanal)
}}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
export default handler