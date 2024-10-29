var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
conn.reply(m.chat, '> toma el link de esta chingadera de grupo\n' + link, m, rcanal, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link','linkgroup']

handler.group = true
handler.botAdmin = true

export default handler
