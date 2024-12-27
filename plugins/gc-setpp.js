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

    let media = await downloadMediaMessage(m.quoted, 'buffer', {});
    let groupId = m.chat;

    await conn.updateProfilePicture(groupId, media);
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