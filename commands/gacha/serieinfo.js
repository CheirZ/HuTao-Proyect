import {promises as fs} from 'fs';

async function loadCharacters() {
  try {
    const data = await fs.readFile('./lib/characters.json', 'utf-8')
    return JSON.parse(data)
  } catch {
    throw new Error('ꕥ No se pudo cargar el archivo characters.json.')
  }
}

export default {
  command: ['serieinfo', 'animeinfo', 'ainfo'],
  category: 'gacha',
  run: async (client, m, args) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]

    if (chatData.adminonly || !chatData.gacha)
      return m.reply(`🫛 Estos comandos estan desactivados en este grupo.`)

    try {
      const name = args.join(' ')
      if (!name) return m.reply('🫛 Por favor especifica un anime.')

      const characters = await loadCharacters()
      const animeCharacters = characters.filter(
        (character) =>
          character.source && character.source.toLowerCase().trim() === name.toLowerCase().trim(),
      )

      if (animeCharacters.length === 0)
        return m.reply(`🫛 No se encontró el anime con nombre: "${name}".`)

      const claimedCount = animeCharacters.filter((char) => {
        const usuarioPoseedor = Object.entries(chatData.users).find(
          ([_, u]) => Array.isArray(u.characters) && u.characters.some((c) => c.name === char.name),
        )
        return !!usuarioPoseedor
      }).length

      const totalCharacters = animeCharacters.length

      const message =
        '☆ *Serie Info* (●´ϖ`●)' +
        `\n➭ *Nombre ›* ${name}\n\n` +
        `☆ *Personajes ›* ${totalCharacters}\n` +
        `❀ *Reclamados ›* ${claimedCount}/${totalCharacters}\n\n` +
        `✎ *Lista de personajes* \n${animeCharacters
          .map((char) => {
            const usuarioPoseedor = Object.entries(chatData.users).find(
              ([_, u]) =>
                Array.isArray(u.characters) && u.characters.some((c) => c.name === char.name),
            )
            const userId = usuarioPoseedor ? usuarioPoseedor[0] : null
            const estado = userId
              ? `Reclamado por ${db.users[userId]?.name || userId.split('@')[0]}`
              : 'Libre'
            return `› *${char.name}* (${char.value}) • ${estado}`
          })
          .join('\n')}`

      await client.reply(chatId, message, m)
    } catch (error) {
      await m.reply(msgglobal)
    }
  },
};
