import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['balance', 'bal'],
  category: 'rpg',
    run: async (client, m, args, command, text, prefix) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]
    const botId = client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botSettings = db.settings[botId]
    const monedas = botSettings.currency

    if (chatData.adminonly || !chatData.rpg)
      return m.reply(`🍒 Estos comandos estan desactivados en este grupo.`)

    const mentioned = m.mentionedJid
    const who2 = mentioned.length > 0 ? mentioned[0] : (m.quoted ? m.quoted.sender : m.sender)
    const who = await resolveLidToRealJid(who2, client, m.chat);

    if (!chatData.users?.[who2])
      return m.reply(`🍒 El usuario mencionado no está registrado en el bot.`)

    const user = chatData.users[who]
    const total = (user.coins || 0) + (user.bank || 0)

    const bal = `*🌵 Balance de ›* ${global.db.data.users[who].name}

	➠ *${monedas}* : *¥${user.coins?.toLocaleString() || 0}*
	➠ *Banco* : *¥${user.bank?.toLocaleString() || 0}*
	➠ *Total* : *¥${total.toLocaleString()}*

> Para proteger tus *${monedas}*, depósitalas en el banco usando *${prefix}dep*`

    await client.sendContextInfoIndex(m.chat, bal, {}, m, true, {})
  }
};