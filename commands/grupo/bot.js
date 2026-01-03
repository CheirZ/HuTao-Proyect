export default {
  command: ['bot'],
  category: 'grupo',
  isAdmin: true,
  run: async (client, m, args) => {
    const chat = global.db.data.chats[m.chat]
    const estado = chat.bannedGrupo ?? false

    if (args[0] === 'off') {
      if (estado) return m.reply('🫛 El *Bot* ya estaba *desactivado* en este grupo.')
      chat.bannedGrupo = true
      return m.reply(`🫛 Has *Desactivado* a *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot2}* en este grupo.`)
    }

    if (args[0] === 'on') {
      if (!estado) return m.reply(`《✧》 *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot2}* ya estaba *activado* en este grupo.`)
      chat.bannedGrupo = false
      return m.reply(`🫛 Has *Activado* a *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot2}* en este grupo.`)
    }

    return m.reply(
      `*✿ Estado de ${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot2} (｡•́‿•̀｡)*\n✐ *Actual ›* ${estado ? '✗ Desactivado' : '✓ Activado'}\n\n✎ Puedes cambiarlo con:\n> ● _Activar ›_ *bot on*\n> ● _Desactivar ›_ *bot off*`,
    )
  },
};
