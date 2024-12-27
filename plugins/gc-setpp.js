/* 
「✦」 Thanks OfcKing
- github.com/OfcKing 
*/

import FormData from "form-data";
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import Jimp from "jimp";

const handler = async (m, { conn, usedPrefix, command }) => {
  try {    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) return m.reply(`「✦」 Envía una imagen o responde a la imagen utilizando el comando: ${usedPrefix + command}`);
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`「✦」 El formato del archivo (${mime}) no es compatible, envía o responde a una imagen`);
    
    conn.reply(m.chat, '「✦」 Mejorando la calidad de la imagen y luego colocarla de perfil del grupo....', m);
    
    const stream = await downloadContentFromMessage(q.message[q.mediaType], 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    let enhancedBuffer = await remini(buffer, "enhance");
    await conn.updateProfilePicture(m.chat, enhancedBuffer); 

    return m.reply('「✦」 La foto de perfil del grupo se ha cambiado exitosamente.');
  } catch (e) {
    return m.reply(`✪ Ocurrió un error: ${e.message}`);
  }
};

handler.command = ['setppgroup', 'setgrouppic'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (!availableOperations.includes(operation)) {
      operation = availableOperations[0];
    }

    const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
    formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });

    formData.submit({
      url: baseUrl,
      headers: {
        "User-Agent": "okhttp/4.9.3",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    }, (err, res) => {
      if (err) reject(err);
      
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", err => reject(err));
    });
  });
}