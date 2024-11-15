let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin}) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (chat.autoRechazar && !isAdmin) {
    if (!isBotAdmin) return !0
        const participants = await conn.groupRequestParticipantsList(m.chat)
        const antiprefix = '91', '57', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '212'
        const filteredParticipants = participants.filter(p => p.jid.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith(antiprefix))
        for (const participant of filteredParticipants) {
            await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "reject")
        }
        if (m.messageStubType === 172 && m.messageStubParameters) {
            const [jid] = m.messageStubParameters
            if (jid.includes('@s.whatsapp.net') && jid.split('@')[0].startsWith(antiprefix)) {
                await conn.groupRequestParticipantsUpdate(m.chat, [jid], "reject")}}
}}
export default handler