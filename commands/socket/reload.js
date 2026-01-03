/*import { startModBot } from '../../lib/mods.js';
import { startPremBot } from '../../lib/prems.js';
import { startSubBot } from '../../lib/subs.js';
import fs from 'fs';
import path from 'path';
import {jidDecode} from '@whiskeysockets/baileys';

export default {
  command: ['reload'],
  category: 'socket',
  run: async (client, m, args) => {
    const rawId = client.user?.id || ''
    const decoded = jidDecode(rawId)
    const cleanId = decoded?.user || rawId.split('@')[0]

    const sessionTypes = ['Subs', 'Mods', 'Prems']
    const basePath = 'Sessions'
    const sessionPath = sessionTypes
      .map((type) => path.join(basePath, type, cleanId))
      .find((p) => fs.existsSync(p))

    if (!sessionPath) {
      return m.reply('《✧》 Este comando solo puede ser usado desde una instancia de Sub-Bot.')
    }

    const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
    const botSettings = global.db.data.settings[botId] || {}

    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = botSettings.botprem === true
    const isModBot = botSettings.botmod === true

    const botType = isOficialBot
      ? 'Principal/Owner'
      : isPremiumBot
        ? 'Premium'
        : isModBot
          ? 'Main'
          : 'Sub Bot'

    const caption = `🍒 *Sesión del bot reiniciada correctamente!*.`

    const phone = args[0] ? args[0].replace(/\D/g, '') : m.sender.split('@')[0]
    const chatId = m.chat

   // setTimeout(() => {
      if (botType === 'Sub Bot') {
        startSubBot(m, client, caption, false, phone, chatId, {}, true)
      } else if (botType === 'Main') {
        startModBot(m, client, caption, false, phone, chatId, {}, true)
      } else if (botType === 'Premium') {
        startPremBot(m, client, caption, false, phone, chatId, {}, true)
      } else {
       // startModBot(m, client, caption, false, phone, chatId, {}, true)
      }
   // }, 3000)

    await client.reply(m.chat, caption, m)
  },
};*/