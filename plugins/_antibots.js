export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  let chat = global.db.data.chats[m.chat];
  let delet = m.key.participant;
  let bang = m.key.id;
  let bot = global.db.data.settings[this.user.jid] || {};
  if (m.fromMe) return true;

  if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) { 
    if (chat.antiBot) {
      if (isBotAdmin) {
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
        await m.reply('🧧 Un Bot.');
       // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } else {
        m.reply('🧧 No soy administrador, el admin le tocara eliminarlo manualmente.\n> 🧨 Postada: Dame Admin Y Listo.');
      }
    }
  }
}