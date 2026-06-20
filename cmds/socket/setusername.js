import db from "#db"
export default {
  command: ['setusername'],
  category: 'socket',
    run: async ({ msg, sock, args, command, text, usedPrefix: prefix }) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = await db.getSettings(idBot)
const owner = config.owner ? config.owner : '' || ''
    const isOwner2 = [idBot, ...global.owner.map((number) => number + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2 && msg.sender !== owner) return msg.reply(mess.socket)
    const value = args.join(' ').trim()
    if (!value) return msg.reply(`✿ Debes escribir un nombre de usuario valido.\n> Ejemplo: *${prefix + command} Sherry Barnet*`)
    await sock.updateProfileName(value)
    return msg.reply(`✿ El nombre de usuario del bot ha sido actualizado a *${value}*!`)
  },
};