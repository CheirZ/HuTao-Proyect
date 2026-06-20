import db from "#db"

export default {
  command: ['givecoins', 'pay', 'coinsgive'],
  category: 'rpg',
  run: async ({ msg, sock, args }) => {

    try {
    const chatId = msg.chat
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = await db.getSettings(botId)
    const monedas = botSettings.currency || 'coins'
    const chatData = await db.getChat(msg.chat)

    if (chatData.adminonly || !chatData.rpg)
      return msg.reply(mess.comandooff)

    const [cantidadInputRaw, ...rest] = args
    const mentioned = msg.mentionedJid || []
    const who = mentioned[0] || args.find(arg => arg.includes('@s.whatsapp.net'))

    if (!who) return msg.reply(`《✤》 Debes mencionar a quien quieras transferir *${monedas}*.`)

    const senderData = await db.getChatUser(msg.chat, msg.sender)
    const targetData = await db.getChatUser(msg.chat, who)

    if (!targetData) return msg.reply(`「✿」 El usuario mencionado no está registrado en el bot.`)

    const cantidadInput = cantidadInputRaw?.toLowerCase()
    const cantidad = cantidadInput === 'all'
      ? senderData.coins
      : parseInt(cantidadInput)

    if (!cantidadInput || isNaN(cantidad) || cantidad <= 0)
      return msg.reply(`ꕥ Ingresa una cantidad válida de *${monedas}* para transferir.`)

    if (senderData.coins < cantidad)
      return msg.reply(`ꕥ No tienes suficientes *${monedas}* para transferir ${cantidad}.`)

    senderData.coins -= cantidad
    targetData.coins += cantidad

   await db.updateChatUser(msg.chat, msg.sender, 'coins', senderData.coins)
   await db.updateChatUser(msg.chat, who, 'coins', targetData.coins)

      const cantidadFormatted = cantidad.toLocaleString()
      const textoTransferencia = `*¥${cantidadFormatted} ${monedas}*`

await sock.reply(
  chatId,
  `「✿」 Transferiste ${textoTransferencia} a *@${who.split('@')[0]}*.`,
  msg,
  { mentions: [who] }
)
    } catch (e) {
      await msg.reply(msgglobal + e)
    }
  }
};