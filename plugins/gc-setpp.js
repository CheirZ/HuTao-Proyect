/*
「✦」 Credits: OfcKing
- github.com/OfcKing
*/

import { makeWASocket, downloadMediaMessage } from '@whiskeysockets/baileys';
import fs from 'fs';

let handler = async (m, { conn, args }) => {

  if (!m.quoted || !m.quoted.fileSha256) {
    return m.reply('「✦」 Responde a una imagen que quieres usar como nueva imagen del grupo.');
  }

  try {
    let mime = m.quoted.mimetype || '';
    if (!mime.startsWith('image/')) {
      return m.reply('「✦」 Por favor, proporciona una imagen válida.');
    }

    let mediaMessage = await conn.downloadMediaMessage(m.quoted);
    if (!mediaMessage) {
      return m.reply('「✦」 Error al descargar la imagen.');
    }

    const img = './temp-image';
    fs.writeFileSync(filePath, mediaMessage);

    await conn.updateProfilePicture(m.chat, img);
    fs.unlinkSync(filePath); // Eliminar el archivo después de usarlo
    m.reply('「✦」 Imagen de perfil del grupo actualizada exitosamente.');
  } catch (e) {
    m.reply(`⚠︎ *Error:* ${e.message}`);
  }
};

handler.command = ['setppgroup', 'setgrouppic'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;