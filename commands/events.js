// # Función de Welcome, puedes ajustarlo segun lo prefieras!

import chalk from 'chalk'
import moment from 'moment-timezone'
import { getBuffer } from '../lib/message.js'

export default async (client, m) => {
  client.ev.on('group-participants.update', async (anu) => {
  //  console.log(anu)
    try {
      const metadata = await client.groupMetadata(anu.id)
      const chat = global.db.data.chats[anu.id]
      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
      const primaryBotId = chat?.primaryBot
   const botSettings = global.db.data.settings[botId] || {}
  const canalId = botSettings.id || ''
  const canalName = botSettings.nameid || ''
  const icon = botSettings.icon || ''

  let vn = "https://raw.githubusercontent.com/GataNina-Li/GataBot-MD1/master/media/Bienvenido.mp3"
  let vn2 = "https://raw.githubusercontent.com/GataNina-Li/GataBot-MD1/master/media/flash.mp3"
  let welc = await getBuffer(icon)
  let adi = await getBuffer(icon)

      for (const p of anu.participants) {
        const jid = p.phoneNumber
        const phone = p.phoneNumber?.split('@')[0] || jid.split('@')[0]

        if (anu.action === 'add' && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {
    client.sendMessage(anu.id, {
      audio: { url: vn },
      contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: canalId,
                serverMessageId: '0',
                newsletterName: canalName
              },
        "externalAdReply": {
          "thumbnail": welc,
          "title": "  ͟͞ Ｗ Ｅ Ｌ Ｃ Ｏ Ｍ Ｅ ͟͞  ",
          "body": dev,
          "previewType": "PHOTO",
          "thumbnailUrl": null,
          "showAdAttribution": true,
          sourceUrl: global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].link
        }
      },
    //  ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'welcome.mp3'
    }, { quoted: null });
        }

        if ((anu.action === 'remove' || anu.action === 'leave') && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {
    client.sendMessage(anu.id, {
      audio: { url: vn2 }, 
      contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: canalId,
                serverMessageId: '0',
                newsletterName: canalName
              },
        "externalAdReply": {
        "thumbnail": adi,
        "title": '  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  ',
        "body": dev,
        "previewType": "PHOTO",
          "showAdAttribution": true,
          "containsAutoReply": true,
         "thumbnailUrl": null,
          "showAdAttribution": true,
          "sourceUrl": global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].link
        }
      },
     // ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'bye.mp3'
    }, { quoted: null });
        }

        if (anu.action === 'promote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, {
            text: `💣 *@${phone}* ha sido promovido a Administrador por *@${usuario.split('@')[0]}.*`,
            mentions: [jid, usuario]
          })
        }

        if (anu.action === 'demote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, {
            text: `💣 *@${phone}* ha sido degradado de Administrador por *@${usuario.split('@')[0]}.*`,
            mentions: [jid, usuario]
          })
        }
      }
    } catch (err) {
      console.log(chalk.gray(`[ BOT  ]  → ${err}`))
    }
  })
}