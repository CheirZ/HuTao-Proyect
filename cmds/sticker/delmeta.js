import db from "#db"
export default {
  command: ['delmeta', 'delstickermeta'],
  category: 'stickers',
  run: async ({ msg, sock, args }) => {
    try {
      const userData = await db.getUser(msg.sender);
      if ((!userData.metadatos || userData.metadatos === '') && (!userData.metadatos2 || userData.metadatos2 === '')) {
        return msg.reply('《✧》No tienes metadatos asignados.');
      }
      await db.updateUser(msg.sender, 'metadatos', '');
      await db.updateUser(msg.sender, 'metadatos2', '');
      await sock.sendMessage(msg.chat, { text: `✎ Los metadatos de tus stickers se han eliminado correctamente.` }, { quoted: msg });
    } catch (e) {
      await msg.reply(msgglobal);
    }
  },
};