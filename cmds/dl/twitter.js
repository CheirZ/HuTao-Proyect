import axios from 'axios';
import db from "#db"

let enviando = false;

export default {
  command: ['twitter', 'x', 'xdl'],
  category: 'downloader',
  run: async ({ msg, sock, text, usedPrefix, command }) => {
    if (!text) throw `Ejemplo: *${usedPrefix + command}* https://twitter.com/auronplay/status/1586487664274206720?s=20&t=3snvkvwGUIez5iWYQAehpw`;
    if (enviando) return;
    enviando = true;

    try {
      // Indicador de procesamiento
      if (typeof msg.react === 'function') msg.react('🕒');

      const res = await TwitterDL(text);

      // Manejar errores devueltos por TwitterDL
      if (!res || res.status !== 'success') {
        if (typeof msg.react === 'function') msg.react('✖️');
        throw new Error(res?.message || 'Error al procesar la URL de Twitter.');
      }

      const type = res.result?.type;

      if (type === 'video') {
        if (typeof msg.react === 'function') msg.react('✔️');
        const caption = res.result?.caption ? res.result.caption : '*Aquí tiene su video*';
        const media = res.result?.media || [];

        for (const item of media) {
          // item.result es un array de resoluciones para video
          const videoUrl = item?.result?.[0]?.url;
          if (videoUrl) {
            await sock.sendMessage(msg.chat, { video: { url: videoUrl }, caption }, { quoted: msg });
          }
        }
        return;
      } else if (type === 'photo') {
        if (typeof msg.react === 'function') msg.react('✔️');
        const caption = res.result?.caption ? res.result.caption : '*Aquí tiene su imagen*';
        const media = res.result?.media || [];

        for (const item of media) {
          // para fotos se espera que cada item tenga .url
          const imageUrl = item?.url || item?.result;
          if (imageUrl) {
            await sock.sendMessage(msg.chat, { image: { url: imageUrl }, caption }, { quoted: msg });
          }
        }
        return;
      } else {
        // Tipo no esperado
        if (typeof msg.react === 'function') msg.react('✖️');
        throw new Error('Tipo de contenido no soportado o no encontrado.');
      }
    } catch (err) {
      if (typeof msg.react === 'function') msg.react('✖️');
      // Propaga un mensaje amigable
      throw `> Error, intente mas tarde. ${err?.message || ''}`.trim();
    } finally {
      enviando = false;
    }
  },
};

const _twitterapi = (id) => `https://info.tweeload.site/status/${id}.json`;

const getAuthorization = async () => {
  const { data } = await axios.get('https://pastebin.com/raw/SnCfd4ru');
  return data;
};

const TwitterDL = async (url) => {
  try {
    const idMatch = url.match(/\/([\d]+)/);
    if (!idMatch) {
      return {
        status: 'error',
        message: 'There was an error getting twitter id. Make sure your twitter url is correct!',
      };
    }
    const id = idMatch[1];

    const response = await axios(_twitterapi(id), {
      method: 'GET',
      headers: {
        Authorization: await getAuthorization(),
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      },
    });

    if (!response?.data) {
      return { status: 'error', message: 'Empty response from twitter api.' };
    }

    if (response.data.code !== 200) {
      return {
        status: 'error',
        message: 'An error occurred while sending the request.',
      };
    }

    const tweet = response.data.tweet || {};

    const author = {
      id: tweet.author?.id,
      name: tweet.author?.name,
      username: tweet.author?.screen_name,
      avatar_url: tweet.author?.avatar_url,
      banner_url: tweet.author?.banner_url,
    };

    let media = [];
    let type;

    if (tweet?.media?.videos) {
      type = 'video';
      tweet.media.videos.forEach((v) => {
        const resultVideo = [];
        (v.video_urls || []).forEach((z) => {
          const resolutionMatch = z.url?.match(/([\d ]{2,5}[x][\d ]{2,5})/);
          resultVideo.push({
            bitrate: z.bitrate,
            content_type: z.content_type,
            resolution: resolutionMatch ? resolutionMatch[0] : null,
            url: z.url,
          });
        });
        if (resultVideo.length !== 0) {
          media.push({
            type: v.type,
            duration: v.duration,
            thumbnail_url: v.thumbnail_url,
            result: v.type === 'video' ? resultVideo : v.url,
          });
        }
      });
    } else if (tweet?.media?.photos) {
      type = 'photo';
      tweet.media.photos.forEach((v) => {
        media.push(v);
      });
    } else {
      // No media
      type = tweet.media ? (tweet.media.videos ? 'video' : 'photo') : null;
    }

    return {
      status: 'success',
      result: {
        id: tweet.id,
        caption: tweet.text,
        created_at: tweet.created_at,
        created_timestamp: tweet.created_timestamp,
        replies: tweet.replies,
        retweets: tweet.retweets,
        likes: tweet.likes,
        url: tweet.url,
        possibly_sensitive: tweet.possibly_sensitive,
        author,
        type,
        media: media.length !== 0 ? media : null,
      },
    };
  } catch (err) {
    return { status: 'error', message: err?.message || String(err) };
  }
};
