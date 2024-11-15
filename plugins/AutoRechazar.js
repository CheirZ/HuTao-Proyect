import db from '../lib/database.js'
let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin} ) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (isBotAdmin && chat.autoRechazar) {
if (m.sender.startsWith('6' || '57' || '212' || '92' || '93' || '94' || '7' || '49' || '2' || '91' || '48' || '90')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}
}}
export default handler