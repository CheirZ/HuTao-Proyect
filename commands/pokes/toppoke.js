export default {
  command: ['toppoke', 'toppokemon'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      const chatUsers = global.db.data.chats?.[m.chat]?.users || {}
      const groupUsers = Object.keys(chatUsers)
      const userPokemonCount = []

      for (const userId of groupUsers) {
        const userChatData = chatUsers[userId] || {}
        const userGlobalData = global.db.data.users?.[userId] || {}
        const userPokes = userChatData.pokemon || []

        if (userPokes.length > 0) {
          let totalPower = 0
          for (const poke of userPokes) {
            const pokeData = global.db.data.pokemon?.[m.chat]?.[poke.id] || {}
            totalPower += (pokeData.poder || poke.poder || 0)
          }

          userPokemonCount.push({
            userId,
            name: userGlobalData.name || userId.split('@')[0],
            count: userPokes.length,
            totalPower
          })
        }
      }

      if (userPokemonCount.length === 0) {
        return m.reply('🍒 Aún no hay usuarios con Pokémon en este grupo.')
      }

      userPokemonCount.sort((a, b) => b.count - a.count || b.totalPower - a.totalPower)

      const top10 = userPokemonCount.slice(0, 10)
      let message = `ׅ  ׄ  🥤   ׅ り *Top Entrenadores Pokémon*\n`
      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n\n`

      for (let i = 0; i < top10.length; i++) {
        const rank = i + 1
        const user = top10[i]
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`

        message += `${medal} *${user.name}*\n`
        message += `ׅ  ׄ  🌵   ׅ り Pokémon: ${user.count}\n`
        message += `ׅ  ׄ  🌵   ׅ り Poder total: ${user.totalPower.toLocaleString()}\n\n`
      }

      const userPosition = userPokemonCount.findIndex(u => u.userId === m.sender)
      if (userPosition >= 10 && userPosition !== -1) {
        const userData = userPokemonCount[userPosition]
        message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n`
        message += `ׅ  ׄ  🌵   ׅ り *Tu posición: #${userPosition + 1}*\n`
        message += `ׅ  ׄ  🥤   ׅ り Pokémon: ${userData.count}\n`
        message += `ׅ  ׄ  🥤   ׅ り Poder total: ${userData.totalPower.toLocaleString()}\n`
      }

      message += `\n> 🍓 Total de entrenadores: ${userPokemonCount.length}`
      await m.reply(message)
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}