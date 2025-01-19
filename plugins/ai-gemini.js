import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `✨ *Ingresé una petición*\n\nEjemplo, ${usedPrefix + command} hola, que es HuTao?`, m)
try {
await m.react('🕒')
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await conn.reply(m.chat, res.result, m)
await m.react('✅️')
} catch (error) {
return conn.reply(m.chat, 'Enseñame que responder.', m)
}}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
export default handler