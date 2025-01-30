/*import { WASocket, useMultiFileAuthState, makeInMemoryStore } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  let chat = global.db.data.chats[m.chat];
  if (m.fromMe) return true;

  const botPatterns = [
    /^3EB0/, 
    /^4EB0/,
    /^5EB0/,
    /^6EB0/,
    /^7EB0/,
    /^8EB0/,
    /^9EB0/,
    /^AEB0/,
    /^BEB0/,
    /^CEB0/,
    /^DEB0/,
    /^EEB0/,
    /^FEB0/,
    /^BAE5/,
    /^BAE7/,
    /^CAEB0/,
    /^DAEB0/,
    /^EAEB0/,
    /^FAEB0/,
  ];

  if (botPatterns.some(pattern => pattern.test(m.key.id)) && m.key.remoteJid.endsWith('@g.us')) {
    if (chat.antiBot) {
      if (isBotAdmin) {
        console.log(`Eliminando mensaje del bot: ${m.key.id} del participante ${m.key.participant}`);
        
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });

       // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } else {
        console.log('El bot no es administrador, no puede eliminar bots.');
        m.reply('🧧 No soy administrador, el admin le tocara eliminarlo manualmente.\n> 🧨 Postada: Dame Admin Y Listo.');
      }
    }
  }
}*/