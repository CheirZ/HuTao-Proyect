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

        let buttons = [
            {buttonId: ".play hola remix", buttonText: {displayText: 'Yes'}, type: 1},
            {buttonId: ".play2 felices los 4", buttonText: {displayText: "No"}, type: 1}
        ]

        let buttonMessage = {
            image: { url: json.url },
            caption: `Alba es tu patrona?`,
            footer: "Sock",
            buttons: buttons,
            headerType: 4,
            viewOnce: true,
            mentions: [m.sender]
        }

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
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