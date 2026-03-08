import uploadImage from '../../lib/uploadImage.js';
import fetch from 'node-fetch';

export default {
  command: ['tourl'],
  category: 'utils',
  run: async ({client, m}) => {
  let botId = client.user.id.split(':')[0] + "@s.whatsapp.net";
  let botSettings = global.db.data.settings[botId];
  let botname = botSettings.namebot;
      const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) {
      return client.reply(
        m.chat,
        `《✧》 Por favor, responde a una imagen o video con el comando */tourl* para convertirlo en una URL.`,
        m
      )
    }

  //await client.sendMessage(m.chat, { react: { text: '💥', key: m.key } });

  try {
    let media = await q.download();

    let isMedia = /image\/(png|jpe?g|gif)|video\/mp4|audio\/(mpeg|mp3|wav)/.test(mime);
    if (!isMedia) {
      return client.reply(m.chat, '⚠️ El archivo no es compatible, solo se permiten *imágenes, videos y audios (mp3/wav)*.', m);
    }

    let link = await uploadImage(media);
    let img;
    if (/image|video/.test(mime)) {
      const res = await fetch(link);
      if (!res.ok) {
        throw new Error(`Error al descargar imagen/video: ${res.status}`);
      }
      img = await res.buffer();
    }

    let shortLink = '';
    try {
      const shortRes = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`);
      if (!shortRes.ok) {
        throw new Error(`Error al acortar URL: ${shortRes.status}`);
      }
      shortLink = await shortRes.text();
    } catch (shortError) {
      console.error('Error al acortar URL:', shortError);
      shortLink = 'No disponible';
    }

    let txt = `乂  *L I N K - E N L A C E*  乂\n\n`;
    txt += `*» Enlace* : ${link}\n`;
    txt += `*» Acortado* : ${shortLink}\n`;
    txt += `*» Tamaño* : ${formatBytes(media.length)}\n`;
    txt += `*» Tipo* : ${mime}\n`
    txt += `*» Expiración* : No expira\n\n`;
    txt += `> *${botname}*`;

    if (img) {
      await client.sendMessage(m.chat, {
        image: img,
        caption: txt
      }, { quoted: m });
    } else {
      await client.sendMessage(m.chat, { text: txt }, { quoted: m });
    }

  } catch (e) {
    console.error('Error en tourl:', e);
    client.reply(m.chat, ` Error al procesar el archivo: ${e.message}`, m);
  }
}}

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
