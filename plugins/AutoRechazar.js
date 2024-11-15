let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin}) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (chat.autoRechazar && !isAdmin) {
    if (!isBotAdmin) return !0
        const participants = await conn.groupRequestParticipantsList(m.chat)
        const rawUser = m.messageStubParameters[0];
const users = rawUser.split('@')[0]; 
const prefijosProhibidos = ['91', '57', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '212'];
const usersConPrefijo = users.startsWith('+') ? users : `+${users}`;
        if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
            await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "reject")
conn.reply('573012482597@s.whatsapp.net', 'ya', m)
        }
        if (m.messageStubType === 172 && m.messageStubParameters) {
            const [jid] = m.messageStubParameters
            if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
conn.reply('573012482597@s.whatsapp.net', 'ya', m)
                await conn.groupRequestParticipantsUpdate(m.chat, [jid], "reject")}}
}}
export default handler