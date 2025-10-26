import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '✨ Ingresa el enlace o término de búsqueda de una publicación de TikTok.', m);

  const isUrl = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text);
  const apiUrl = `https://api.stellarwa.xyz/dl/tiktok?url=${encodeURIComponent(text)}&key=proyectsV2`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
    const json = await res.json();

    if (!json.status || !json.data.dl) return conn.reply(m.chat, 'Ingresa un enlace válido de TikTok.', m);

    const { title, author, duration, dl } = json.data;
    const caption = createCaption(title, author, duration);

    await conn.sendMessage(m.chat, { video: { url: dl }, caption }, { quoted: m });

  } catch (e) {
    await m.reply(`[Error : [${e}]]`);
  }
};

function createCaption(title, creator, duration) {
  return `🌧 *Título ›* ${title || 'No disponible'}\n🦋 *Autor ›* ${creator || 'No disponible'}\n⏳ *Duración ›* ${duration || 'No disponible'} seg`;
}

handler.help = ['tiktok', 'tt'];
handler.tags = ['downloader'];
handler.command = ['tiktok', 'tt'];
handler.group = true

export default handler;
