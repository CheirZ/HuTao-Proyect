import axios from 'axios';

let handler = async (m, { conn, text }) => {
  let botId = conn.user.jid;
  let botSettings = globalThis.db.data.settings[botId];
  let botna = botSettings.namebot;
  let botname = botSettings.namebot2;

  if (!text) return m.reply(`✎ Ingresa el nombre de una canción o una URL de Spotify.`);

  try {
    let song;
    const isSpotifyUrl = text.startsWith('https://open.spotify.com/');
    if (isSpotifyUrl) {
      song = { url: text };
    } else {
      const results = await spotifyxv(text);
      if (!results.length) return m.reply('No se encontró la canción.');
      song = results[0];
    }

    const res = await axios.get(`https://api.stellarwa.xyz/dl/spotify?url=${song.url}&key=proyectsV2`);
    const data = res.data?.data;
    if (!data?.download) return m.reply('No se pudo obtener el enlace de descarga.');

    const info = `➪ Descargando › *${data.title}*\n\n` +
                 `> ✩ Artista › *${data.artist}*\n` +
                 (song.album ? `> ✰ Álbum › *${song.album}*\n` : '') +
                 `> ⴵ Duración › *${data.duration}*\n` +
                 `> ☁︎ Enlace › *${song.url}*\n\n` +
                 `${dev}`;

    await conn.sendMessage(m.chat, { image: { url: data.image }, caption: info }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: data.download },
      fileName: `${data.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (e) {
    // console.error(e);
    await conn.reply(m.chat, '♪ 𝗻𝗼 𝗵𝘂𝗯𝗼 𝗿𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼𝘀 𝗼 𝗵𝘂𝗯𝗼 𝘂𝗻 𝗲𝗿𝗿𝗼𝗿 𝗲𝗻 𝗹𝗮 𝗮𝗽𝗶', m, fake);
  }
};

handler.tags = ['downloader'];
handler.help = ['spotify'];
handler.command = ['spotify'];
export default handler;

async function spotifyxv(query) {
  const res = await axios.get(`https://api.stellarwa.xyz/search/spotify?query=${encodeURIComponent(query)}&key=proyectsV2`);
  if (!res.data?.status || !res.data?.data?.length) return [];

  const firstTrack = res.data.data[0];

  return [{
    name: firstTrack.title,
    artista: [firstTrack.artist],
    album: firstTrack.album,
    duracion: firstTrack.duration,
    url: firstTrack.url,
    imagen: firstTrack.image || ''
  }];
}
