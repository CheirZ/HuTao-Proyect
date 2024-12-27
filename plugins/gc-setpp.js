/*
「✦」 Credits: OfcKing
- github.com/OfcKing
*/

import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { writeFileSync } from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix, command }) => {

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    try {
      const stream = await downloadContentFromMessage(q.message.imageMessage, 'image');
      let buffer = Buffer.from([]);

      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      const filePath = path.join(__dirname, 'temp-image.jpg');
      writeFileSync(filePath, buffer);

      await conn.updateProfilePicture(m.chat, { url: filePath });
      return m.reply('「✦」 La foto de perfil del grupo se ha cambiado exitosamente.');
    } catch (e) {
      return m.reply(`「✦」 Hubo un error al actualizar la imagen: ${e.message}`);
    }
  } else {
    return m.reply('「✦」 Por favor, responde a una imagen válida.');
  }
};

handler.command = ['setppgroup'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;