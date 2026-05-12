import fetch from 'node-fetch';
import { getDevice, prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone';

const COMMANDS_URL = 'https://stellarwa.xyz/js/commands.js'

export default {
  command: ['allmenu', 'help', 'menu'],
  category: 'info',
  run: async (client, m, args, command, text, prefix) => {
    try {
      const res = await fetch(COMMANDS_URL)
      const commandsText = await res.text()
      const commandsMatch = commandsText.match(/const commands = (\[[^]*?\]);/)
      if (!commandsMatch)
        throw new Error('No se pudo encontrar la variable `commands` en el archivo.')

      const commands = eval(commandsMatch[1])
      const now = new Date()
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
      const tiempo = colombianTime
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .replace(/,/g, '')
      const tiempo2 = moment.tz('America/Bogota').format('hh:mm A')

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const botname = botSettings.namebot || ''
      const botname2 = botSettings.namebot2 || ''
      const banner = botSettings.banner || ''
      const owner = botSettings.owner || ''
      const canalid = botSettings.id || ''
      const canalname = botSettings.nameid || ''
      const link = botSettings.link || ''

      const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
      const isPremiumBot = botSettings.botprem === true
      const isModBot = botSettings.botmod === true
      const botType = isOficialBot
        ? 'Owner'
        : isPremiumBot
          ? 'Premium'
          : isModBot
            ? 'Main'
            : 'Sub Bot'
      const users = Object.keys(global.db.data.users).length

     const time = client.uptime ? formatearMs(Date.now() - client.uptime) : "Desconocido"
      const device = getDevice(m.key.id);

      let menu = `> *¡ʜᴏʟᴀ!* ${global.db.data.users[m.sender].name}, como está tu día?, mucho gusto mi nombre es *${botname2}*

︵ׄ⏜︵ׄ⠑ ⏜ 𓊈    𓊉 ⏜ ⠊︵ֺ⏜︵ֺ

→ *ᴅᴇᴠᴇʟᴏᴘᴇʀ ::* ${owner ? (!isNaN(owner.replace(/@s\.whatsapp\.net$/, '')) ? `${global.db.data.users[owner].name}` : owner) : "Oculto por privacidad"}
→ *ᴛɪᴘᴏ ::* ${botType}
→ *sɪsᴛᴇᴍᴀ/ᴏᴘʀ ::* ${device}

→ *ᴛɪᴍᴇ ::* ${tiempo}, ${tiempo2}
→ *ᴜsᴇʀs ::* ${users.toLocaleString()}
→ *ᴜʀʟ ::* ${link}
→ *ᴍɪ ᴛɪᴇᴍᴘᴏ ::* ${time}

࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛   .   ࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛࿙⃛࿚⃛

乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂\n`

      const categoryArg = args[0]?.toLowerCase()
      const categories = {}

      for (const command of commands) {
        const category = command.category || 'otros'
        if (!categories[category]) categories[category] = []
        categories[category].push(command)
      }

      if (categoryArg && !categories[categoryArg]) {
        return m.reply(` La categoría *${categoryArg}* no fue encontrada.`)
      }

      for (const [category, cmds] of Object.entries(categories)) {
        if (categoryArg && category.toLowerCase() !== categoryArg) continue
        const catName = category.charAt(0).toUpperCase() + category.slice(1)
         menu += `\n .  . ︵ *${catName}*.  ◌Ⳋ𝅄\n`;
        cmds.forEach((cmd) => {
          const cleanPrefix = prefix
          const aliases = cmd.alias
            .map((a) => {
              const aliasClean = a
                .split(/[\/#!+.\-]+/)
                .pop()
                .toLowerCase()
              return `${prefix}${aliasClean}`
            })
            .join(' › ')
          menu += `.꒷.𖦹˙ ${aliases} ${cmd.uso ? `+ ${cmd.uso}` : ''}\n`
          menu += `> ${cmd.desc}\n`
        })
      }

menu += `\n> *${botname2} desarrollado por ZyxlJs* ૮(˶ᵔᵕᵔ˶)ა`

      const isVideo = banner.includes('.mp4') || banner.includes('.gif') || banner.includes('.webm');
      const contextBase = {
        mentionedJid: [owner, m.sender].filter(Boolean),
        isForwarded: false
      };

      if (isVideo) {
        await sock.sendMessage(
          m.chat,
          { video: { url: banner }, caption: menu.trim(), contextInfo: contextBase },
          { quoted: m }
        );
      } else {
        await sock.sendMessage(m.chat, { 
          text: menu.trim(), 
          linkPreview: link && banner ? (await prepareWAMessageMedia({ image: { url: banner } }, { upload: sock.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }).then(({ imageMessage }) => ({ 'canonical-url': link, 'matched-text': link, title: botname, description: dev, jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined, highQualityThumbnail: imageMessage || undefined }))) : undefined, 
          contextInfo: contextBase
        }, { quoted: m });
      }
    } catch (e) {
      await m.reply(msgglobal + e)
    }
  }
};

function formatearMs(ms) {
  const segundos = Math.floor(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  return [dias && `${dias}d`, `${horas % 24}h`, `${minutos % 60}m`, `${segundos % 60}s`].filter(Boolean).join(" ");
}
