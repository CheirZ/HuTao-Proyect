var handler = async (m, { conn, usedprefix }) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/lolice', {
avatar: await conn.profilePictureUrl(who).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
}), '', '✪ *L O L I C E* ✪', m)
}

handler.help = ['lolice']
handler.tags = ['anime']
handler.group = true;
handler.register = false
handler.command = ['lolice']
export default handler