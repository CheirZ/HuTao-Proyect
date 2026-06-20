import db from "#db"

let proposals = {}

export default {
  command: ['marry'],
  category: 'profile',
  run: async ({ msg, sock, args }) => {
    const chatId = msg.chat
    const proposer = msg.sender
    const mentioned = msg.mentionedJid
    const proposee = mentioned.length > 0 ? mentioned[0] : (msg.quoted ? msg.quoted.sender : false)
    if (!proposee) return msg.reply('《✤》 Menciona al usuario al que deseas proponer matrimonio.')

    if (proposer === proposee)
      return msg.reply('「✿」 No puedes proponerte matrimonio a ti mismo.')

    const proposerData = await db.getUser(proposer)
    const proposeeData = await db.getUser(proposee)

    if (proposerData?.marry)
      return msg.reply(`✐ Ya estás casado con *${db.getUser(proposerData.marry)?.name || 'alguien'}*.`)

    if (proposeeData?.marry)
      return msg.reply(`✎ *${proposeeData.name || proposee.split('@')[0]}* ya está casado con *${db.getUser(proposeeData.marry)?.name || 'alguien'}*.`)

    setTimeout(() => {
      delete proposals[proposer]
    }, 120000)

    if (proposals[proposee] === proposer) {
      delete proposals[proposee]

      proposerData.marry = proposee
      proposeeData.marry = proposer

      await db.updateUser(msg.sender, 'marry', proposerData.marry)
      await db.updateUser(proposee, 'marry', proposeeData.marry)
     return msg.reply(`✐ Felicidades, *${proposerData.name || proposer.split('@')[0]}* y *${proposeeData.name || proposee.split('@')[0]}* ahora están casados.`)
    } else {
      proposals[proposer] = proposee
      return sock.reply(
        chatId,
        `✎ @${proposee.split('@')[0]}, el usuario @${proposer.split('@')[0]} te ha enviado una propuesta de matrimonio.\n\n⚘ *Responde con:*\n> ❀ *_marry @${proposer.split('@')[0]}_* para confirmar.\n> ❀ La propuesta expirará en 2 minutos.`,
        msg,
        { mentions: [proposer, proposee] }
      )
    }
  }
}