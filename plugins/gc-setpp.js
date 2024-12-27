/*
「✦」 Credits: OfcKing
- github.com/OfcKing
*/

import { makeWASocket, downloadMediaMessage } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let imgBuffer = await downloadMediaMessage(q);
    if (!imgBuffer) return m.reply('「✦」 Por favor, responde a una imagen válida.');

    await conn.updateProfilePicture(m.chat, imgBuffer);
    return m.reply('「✦」 La foto de perfil del grupo se ha cambiado exitosamente.');
  } else {
    return m.reply('「✦」 Por favor, responde a una imagen válida.');
  }
};

handler.command = ['setppgroup'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;