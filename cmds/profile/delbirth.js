import db from "#db"
export default {
  command: ['delbirth'],
  category: 'profile',
  run: async ({ msg, sock }) => {
    const user = await db.getUser(msg.sender)
    if (!user.birth) return msg.reply(`ꕥ No tienes una fecha de nacimiento establecida.`)

    user.birth = ''

   await db.updateUser(msg.sender, 'birth', user.birth)
    return msg.reply(`✐ Tu fecha de nacimiento ha sido eliminada.`)
  },
};