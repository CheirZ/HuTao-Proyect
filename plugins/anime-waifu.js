import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    try {
        await m.react(emojis)
        conn.reply(m.chat, 'Ꙭ Buscando Su *Waifu*', m, {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: null,
                    mediaType: 1,
                    showAdAttribution: true,
                    title: packname,
                    body: wm,
                    previewType: 0,
                    thumbnail: icons,
                    sourceUrl: channel
                }
            }
        })

        let res = await fetch('https://api.waifu.pics/sfw/waifu')
        if (!res.ok) return
        let json = await res.json()
        if (!json.url) return

   conn.sendMessage(m.chat, {
    image: { url: json.url },
    caption: `Miguel es tu patrona?`, 
    footer: "Sock",
    buttons: [
      {
        buttonId: ".mamar @5218711426787",
        buttonText: {
          displayText: "Yes",
        },
        type: 1,
      },
      {
        buttonId: ".waifu",
        buttonText: {
          displayText: "No",
        },
        type: 1,
      },
    ],
    viewOnce: true,
    headerType: 4,
  }, { quoted: m });

    } catch (e) {
        console.error(e)
        conn.reply(m.chat, 'Hubo un error al intentar enviar el mensaje.', m)
    }
}

handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']
handler.group = true
handler.register = false
export default handler