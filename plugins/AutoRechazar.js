// import db from '../lib/database.js'

let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (isBotAdmin && chat.autoRechazar) {
const prefixes = ['52', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']
if (prefixes.some(prefix => m.sender.startsWith(prefix))) {
await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')
return await conn.reply(idchannel, 'Un usuario fue rechazado de un grupo, por incumplir el prefijo, su numero es arabe el cual se cancela la solicitud de ingreso', null)
}}}

export default handler