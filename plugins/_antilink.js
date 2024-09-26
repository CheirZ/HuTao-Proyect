let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i

export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return conn.reply(m.chat, '☢︎︎𝐚𝐧𝐭𝐢-𝐥𝐢𝐧𝐤 𝐞𝐬𝐭𝐚 𝐚𝐜𝐭𝐢𝐯𝐨, 𝐩𝐞𝐫𝐨 𝐞𝐫𝐞𝐬 𝐚𝐝𝐦𝐢𝐧, 𝐫𝐞𝐬𝐩𝐞𝐭𝐚 𝐥𝐚𝐬 𝐫𝐞𝐠𝐥𝐚𝐬'``, m, rcanal, )
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}
await conn.reply(m.chat,  `「 𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊𝐒 」\n${user} ▍║▍▏║ No se permiten links en este grupo ║▍▏║▍`, m, rcanal, )
if (!isBotAdmin) return conn.reply(m.chat, ☢︎︎𝚗𝚎𝚌𝚎𝚜𝚒𝚝𝚘 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚛𝚊 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚛 𝚊 𝚕𝚘𝚜 𝚜𝚙𝚊𝚖𝚎𝚛𝚜``, m, rcanal, )
if (isBotAdmin) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return conn.reply(m.chat, `*¡Esta característica esta desactivada!*`, m, rcanal, )
}
return !0

}