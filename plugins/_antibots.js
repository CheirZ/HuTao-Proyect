export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  let chat = global.db.data.chats[m.chat];
  let delet = m.key.participant;
  let bang = m.key.id;
  let bot = global.db.data.settings[this.user.jid] || {};
  if (m.fromMe) return true;

  if (m.key.remoteJid.endsWith('@g.us') && m.key.fromMe === false && m.key.id.length === 22) {
    if (chat.antiBot) {
      if (isBotAdmin) {
        console.log(`Eliminando mensaje del bot: ${bang} del participante ${delet}`);
        
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });

       // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } else {
        console.log('El bot no es administrador, no puede eliminar bots.');
        m.reply('🧧 No soy administrador, el admin le tocara eliminarlo manualmente.\n> 🧨 Postada: Dame Admin Y Listo.');
      }
    }
  }
}