import db from "#db"
export default {
  command: ['deldescription', 'deldesc'],
  category: 'profile',
  run: async ({ msg, sock }) => {
    const user = await db.getUser(msg.sender)
    if (!user.description) return msg.reply(`ꕥ No tienes una descripción establecida.`)

    user.description = ''

    await db.updateUser(msg.sender, 'description', user.description)
    return msg.reply(`✐ Tu descripción ha sido eliminada.`)
  },
};