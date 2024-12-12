var handler = async (m, { conn, args, text, usedPrefix, command }) => {

let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)        
let user = global.db.data.users[who]
let nom = conn.getName(m.sender)
if (!text) return conn.reply(m.chat, `⚠️ *Ingrese el número de la persona que quiere añadir*\n\nEjemplo, !${command} 5217299999999`, m)
if (text.includes('+')) return conn.reply(m.chat, `⚠️ *Ingrese todo el número junto sin el (+)*`, m)
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

await conn.reply(text+'@s.whatsapp.net', `${link}`, m, {mentions: [m.sender]} )
conn.reply(m.chat, `🎌 *La invitación fue enviada al privado de*\n${nom}`, m) 

}
handler.help = ['add']
handler.tags = ['grupo']
handler.command = /^(add|agregar|invitar|invite|añadir|\+)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler