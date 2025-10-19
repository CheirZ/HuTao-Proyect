import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'

const sendAlbumMessage = async (jid, medias, options = {}) => {
    const albumMessage = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
        {}
    )
    await conn.relayMessage(albumMessage.key.remoteJid, albumMessage.message, { messageId: albumMessage.key.id })

    await Promise.all(medias.map(async (media, i) => {
        const imgMessage = await baileys.generateWAMessage(
            albumMessage.key.remoteJid,
            { [media.type]: media.data, ...(i === 0 ? { caption: options.caption || "" } : {}) },
            { upload: conn.waUploadToServer }
        )
        imgMessage.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: albumMessage.key },
        }
        await conn.relayMessage(imgMessage.key.remoteJid, imgMessage.message, { messageId: imgMessage.key.id })
        await baileys.delay(options.delay || 500)
    }))
}

const pinterest = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `📌 Uso Correcto: ${usedPrefix + command} <consulta>`, m)

    await m.react('⏳')

    try {
        const res = await fetch(`https://api.stellarwa.xyz/search/pinterest?query=${encodeURIComponent(text)}&key=proyectsV2`)
        const json = await res.json()

        if (!json.status || !Array.isArray(json.data) || json.data.length < 1) {
            return conn.reply(m.chat, '⚠️ No se encontraron imágenes.', m)
        }

        const images = json.data.slice(0, 4).map(item => ({
            type: "image",
            data: { url: item.hd },
            caption: `🪼 Titulo: ${item.title || "-"}\n🪽 Descripción: ${item.description || "-"}\n🎍 Author: ${item.full_name || "-"}\n🐞 Nick: @${item.username || "-"}\n❤️ Likes: ${item.likes || "0"}\n👥 Followers: ${item.followers || "0"}`
        }))

        const mainCaption = `🚀 Resultados para: ${text}`
        await sendAlbumMessage(m.chat, images, { caption: `${mainCaption}\n\n${images[0].caption}`, quoted: m })
        await m.react('✅')
    } catch (error) {
        console.error(error)
        await m.react('❌')
        conn.reply(m.chat, '⚠️ Error al obtener imágenes de Pinterest.', m)
    }
}

pinterest.help = ['pinterest <query>']
pinterest.tags = ['buscador', 'descargas']
pinterest.command = /^(pinterest|pin)$/i

export default pinterest
