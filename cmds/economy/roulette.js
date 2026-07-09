import db from "#db"

const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)

  const pad = (n) => n.toString().padStart(2, '0')
  if (minutes === 0) return `${pad(seconds)} segundo${seconds !== 1 ? 's' : ''}`
  return `${pad(minutes)} minuto${minutes !== 1 ? 's' : ''}, ${pad(seconds)} segundo${seconds !== 1 ? 's' : ''}`
}

export default {
  command: ['rt', 'roulette', 'ruleta'],
  category: 'rpg',
  run: async ({ msg, sock, args }) => {
    const chatId = msg.chat
    const senderId = msg.sender
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    
    // Obtener configuración del bot y del chat
    const botSettings = await db.getSettings(botId)
    const chatData = await db.getChat(chatId)

    if (chatData.adminonly || !chatData.rpg)
      return msg.reply(mess.comandooff)

    const user = await db.getChatUser(chatId, senderId)
    const cooldown = 5 * 60 * 1000
    const now = Date.now()
    const remaining = (user.rtCooldown || 0) - now
    const currency = botSettings.currency || 'Monedas'

    if (remaining > 0)
      return msg.reply(`🌱 Debes esperar *${msToTime(remaining)}* antes de apostar nuevamente.`)

    if (args.length !== 2)
      return msg.reply(`🌾 Debes ingresar una cantidad de ${currency} y apostar a un color.`)

    const amount = parseInt(args[0])
    const color = args[1].toLowerCase()
    const validColors = ['red', 'black', 'green']

    if (isNaN(amount) || amount < 200)
      return msg.reply(`🌾 La cantidad mínima de ${currency} a apostar es 200.`)

    if (!validColors.includes(color))
      return msg.reply(`🍒 Por favor, elige un color válido: red, black, green.`)

    if (user.coins < amount)
      return msg.reply(`🍒 No tienes suficientes *${currency}* para hacer esta apuesta.`)

    // Actualizar cooldown
    user.rtCooldown = now + cooldown
    await db.updateChatUser(chatId, senderId, 'rtCooldown', user.rtCooldown)

    const resultColor = validColors[Math.floor(Math.random() * validColors.length)]

    if (resultColor === color) {
      const reward = amount * (resultColor === 'green' ? 14 : 2)
      user.coins += reward
      await db.updateChatUser(chatId, senderId, 'coins', user.coins)
      
      await sock.sendMessage(
        chatId,
        { 
          text: `🌱 La ruleta salió en *${resultColor}* y has ganado *¥${reward.toLocaleString()} ${currency}*.`,
          mentions: [senderId]
        },
        { quoted: msg }
      )
    } else {
      user.coins -= amount
      await db.updateChatUser(chatId, senderId, 'coins', user.coins)
      
      await sock.sendMessage(
        chatId,
        { 
          text: `🌱 La ruleta salió en *${resultColor}* y has perdido *¥${amount.toLocaleString()} ${currency}*.`,
          mentions: [senderId]
        },
        { quoted: msg }
      )
    }
  },
}
