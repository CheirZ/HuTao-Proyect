/*
「✦」 Credits: OfcKing
- github.com/OfcKing
*/

import { makeWASocket } from '@whiskeysockets/baileys';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!m.quoted || !m.quoted.fileSha256) {
    return m.reply('「✦」 Responde a una imagen que quieres usar como nueva imagen del grupo.');
  }

  try {
    let mime = m.quoted.mimetype || '';
    if (!mime.startsWith('image/')) {
      return m.reply('「✦」 Por favor, proporciona una imagen válida.');
    }

    let media = await conn.downloadAndSaveMediaMessage(m.quoted, 'group-profile-picture');
    await conn.updateProfilePicture(m.chat, { url: media });
    fs.unlinkSync(media); // Eliminar el archivo después de usarlo
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