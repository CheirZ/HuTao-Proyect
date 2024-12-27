import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply('「✦」 Por favor, responde a una imagen válida.');

    try {
      await conn.updateProfilePicture(m.chat, img);
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