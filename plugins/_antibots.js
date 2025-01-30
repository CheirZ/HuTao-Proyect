export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  let chat = global.db.data.chats[m.chat];
  let delet = m.key.participant;
  let bang = m.key.id;
  let bot = global.db.data.settings[this.user.jid] || {};
  if (m.fromMe) return true;

  if (m.key.remoteJid.endsWith('@g.us') && m.key.fromMe === false) {
    console.log(`Verificando mensaje de posible bot: ${m.key.remoteJid}, ${m.key.id}`);
    if (chat.antiBot) {
      if (isBotAdmin) {
        console.log(`Eliminando mensaje del bot: ${bang} del participante ${delet}`);
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});

       // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } else {
        console.log('No soy Admin en el grupo, enviando el texto...');
        m.reply('🧧 No soy administrador, el admin le tocara eliminarlo manualmente.\n> 🧨 Postada: Dame Admin Y Listo.');
      }
    }
  }
}