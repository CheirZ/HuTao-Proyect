import axios from 'axios'

export default {
  command: ['tw', 'twitter', 'x', 'xdl', 'twdl'],
  category: 'downloader',

  run: async (client, m, args) => {
    try {
      const url = args?.[0]?.trim()
      if (!url) return

      const twRegex = /^(https?:\/\/)(www\.)?(twitter\.com|x\.com)\/.+\/status\/\d+/i
      if (!twRegex.test(url)) return

      await m.react('⏳')

      const data = await TwitterDL(url).catch(() => null)

      if (!data || data.status !== 'success' || !data.result?.media) {
        await m.react('❌')
        return
      }

      const result = data.result

      if (result.type === 'video') {

        let videos = []

        for (const media of result.media) {
          if (Array.isArray(media.result)) {
            videos.push(...media.result)
          }
        }

        if (!videos.length) {
          await m.react('❌')
          return
        }
          
        videos.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))
        const best = videos[0]

        if (!best?.url) {
          await m.react('❌')
          return
        }

        await client.sendMessage(
          m.chat,
          {
            video: { url: best.url },
            mimetype: 'video/mp4',
            caption: result.caption || ''
          },
          { quoted: m }
        )
      }

      else if (result.type === 'photo') {

        for (const photo of result.media) {
          const imageUrl = photo?.url || photo?.thumbnail_url
          if (!imageUrl) continue

          await client.sendMessage(
            m.chat,
            {
              image: { url: imageUrl },
              caption: result.caption || ''
            },
            { quoted: m }
          )
        }

      } else {
        await m.react('❌')
        return
      }

      await m.react('✅')

    } catch {
      await m.react('❌')
    }
  }
}

/* =========================
   TwitterDL Helper
========================= */

const _twitterapi = (id) => `https://info.tweeload.site/status/${id}.json`

const getAuthorization = async () => {
  const { data } = await axios.get('https://pastebin.com/raw/SnCfd4ru')
  return data
}

const extractTweetId = (url) => {
  const m =
    url.match(/status\/(\d+)/i) ||
    url.match(/\/(\d+)(?:\?|$)/)

  return m ? m[1] : null
}

const TwitterDL = async (url) => {
  try {
    const id = extractTweetId(url)
    if (!id) return null

    const response = await axios.get(_twitterapi(id), {
      headers: {
        Authorization: await getAuthorization(),
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    })

    if (!response?.data || response.data.code !== 200)
      return null

    const t = response.data.tweet

    let media = []
    let type = null

    if (t?.media?.videos?.length) {
      type = 'video'

      for (const v of t.media.videos) {
        const sources = v.video_urls || []
        const resultVideo = []

        for (const z of sources) {
          resultVideo.push({
            bitrate: z.bitrate || 0,
            content_type: z.content_type || 'video/mp4',
            url: z.url
          })
        }

        if (resultVideo.length) {
          media.push({
            type: v.type,
            result: resultVideo
          })
        }
      }

    } else if (t?.media?.photos?.length) {
      type = 'photo'
      media = t.media.photos
    }

    return {
      status: 'success',
      result: {
        id: t.id,
        caption: t.text,
        type,
        media
      }
    }

  } catch {
    return null
  }
}
