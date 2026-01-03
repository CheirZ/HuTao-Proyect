export default {
  command: ['curarpokemon', 'healpoke'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    const now = Date.now();
    const cooldown = 15 * 60 * 1000;

   const userDatass = global.db.data.chats[m.chat].users[m.sender]
    if (userDatass.lastPokemonHeal && now < userDatass.lastPokemonHeal) {
      const timeLeft = Math.ceil((userDatass.lastPokemonHeal - now) / 1000);
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      let timeText = '';
      if (minutes > 0) timeText += `${minutes} minuto${minutes !== 1 ? 's' : ''} `;
      if (seconds > 0 || timeText === '') timeText += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
      return m.reply(`🍒 Debes esperar *${timeText.trim()}* para usar *${prefix + command}* de nuevo.`);
    }

    try {
      if (!text) {
        return m.reply(`🌱 Uso: *${prefix + command} <nombre_pokemon>*\n\n> 🌽 Ejemplo: ${prefix + command} Pikachu`)
      }

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const money = botSettings.currency || ''

      const userData = global.db.data.chats?.[m.chat]?.users?.[m.sender] || {}

      if (!userData.pokemon || userData.pokemon.length === 0) {
        return m.reply('🍒 No tienes ningún Pokémon en este grupo.')
      }

      const pokemonName = text.trim().toLowerCase()
      const myPokemon = userData.pokemon.find(p => (p.nombre || '').toLowerCase() === pokemonName)

      if (!myPokemon) {
        return m.reply(`🌱 No tienes un Pokémon llamado *${text}* en este grupo.`)
      }

      const myPokemonData = global.db.data.pokemon?.[m.chat]?.[myPokemon.id] || {}
      const now = Date.now()

      if (!myPokemonData.lastBattle || now >= myPokemonData.lastBattle) {
        return m.reply(`🌱 Tu *${myPokemon.nombre}* ya está completamente recuperado y listo para pelear.`)
      }

      const cureCost = 1000
      userData.coins = userData.coins || 0

      if (userData.coins < cureCost) {
        return m.reply(
          `🌱 No tienes suficientes ${money} para curar a *${myPokemon.nombre}*.\n\n` +
          `ׅ  ׄ  🌵   ׅ り Costo: ${cureCost.toLocaleString()} ${money}\n` +
          `ׅ  ׄ  🌵   ׅ り Tienes: ${userData.coins.toLocaleString()} ${money}`
        )
      }

      userData.coins -= cureCost
      myPokemonData.lastBattle = 0

      await m.reply(
        `ׅ  ׄ  🧊ᩙ   ׅ り *¡Curación exitosa!*\n\n` +
        `ׅ  ׄ  🌵   ׅ り Has curado a *${myPokemon.nombre}*\n` +
        `ׅ  ׄ  🌵   ׅ り Tu Pokémon está completamente recuperado y listo para pelear\n` +
        `ׅ  ׄ  🌵   ׅ り Costo: ${cureCost.toLocaleString()} ${money}\n\n` +
        `> 🥦 ${money} restantes: ${userData.coins.toLocaleString()}`
      )

      userDatass.lastPokemonHeal = now + cooldown;
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}