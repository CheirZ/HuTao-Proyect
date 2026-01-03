export default {
  command: ['waifusboard', 'waifustop', 'topwaifus'],
  category: 'gacha',
  use: '[página]',
  run: async (client, m, args) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]

    if (chatData.adminonly || !chatData.gacha)
      return m.reply(`🌽 Estos comandos estan desactivados en este grupo.`)

    const users = Object.entries(chatData.users || {})
      .filter(([_, u]) => (u.characters?.length || 0) > 5)
      .map(([id, u]) => ({
        ...u,
        userId: id,
        name: db.users[id]?.name || id.split('@')[0]
      }))

    if (users.length === 0)
      return m.reply('🌽 No hay usuarios en el grupo con más de 5 waifus.')

    const sorted = users.sort((a, b) => (b.characters?.length || 0) - (a.characters?.length || 0))
    const page = parseInt(args[0]) || 1
    const pageSize = 10
    const totalPages = Math.ceil(sorted.length / pageSize)

    if (isNaN(page) || page < 1 || page > totalPages)
      return m.reply(`🍒 La página *${page}* no existe. Hay un total de *${totalPages}* páginas.`)

    const startIndex = (page - 1) * pageSize
    const list = sorted.slice(startIndex, startIndex + pageSize)

    let message = `🌱 Usuarios con más waifus\n\n`
    message += list.map((u, i) =>
      `✩ ${startIndex + i + 1} › *${u.name}*\n     Waifus → *${u.characters.length}*`
    ).join('\n\n')

    message += `\n\n> ⌦ Página *${page}* de *${totalPages}*`
    if (page < totalPages)
      message += `\n> Para ver la siguiente página › *waifusboard ${page + 1}*`

    await m.reply(message)
  }
};