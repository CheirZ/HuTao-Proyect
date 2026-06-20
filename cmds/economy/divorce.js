import db from "#db"
export default {
  command: ['divorce'],
  category: 'rpg',
  run: async ({ msg, sock }) => {
    const user = await db.getUser(msg.sender)
    const partnerId = user.marry
    const user2 = await db.getUser(partnerId)

    if (!partnerId) return msg.reply('ꕥ Tú no estás casado con nadie.')

    user.marry = ''
    user2.marry = ''

    await db.updateUser(msg.sender, 'marry', user.marry)
    await db.updateUser(partnerId, 'marry', user2.marry)

    return msg.reply(
      `✐ *${msg.pushName || userId.split('@')[0]}* te has divorciado de *${user2.name || partnerId.split('@')[0]}*.`,
    )
  },
};
