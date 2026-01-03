export default {
  command: ['intercambiarpoke', 'poketrade', 'tradep', 'tradepoke'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      if (!text) {
        return m.reply(`🌱 Uso: *${prefix + command} <tu_pokemon> / <su_pokemon>*\n\n> 🐢 Ejemplo: ${prefix + command} Pikachu / Charmander`)
      }

      const argsClean = text.trim()
      if (!argsClean.includes('/')) {
        return m.reply(`🌱 Uso correcto: *${prefix + command} <tu_pokemon> / <su_pokemon>*\n\n> 🐢 Ejemplo: ${prefix + command} Pikachu / Charmander`)
      }

      const [myPokemonNameRaw, theirPokemonNameRaw] = argsClean.split('/').map(arg => arg.trim())
      if (!myPokemonNameRaw || !theirPokemonNameRaw) {
        return m.reply(`🍓 Debes especificar ambos Pokémon separados por " / ".\n\n> Ejemplo: *${prefix + command} Pikachu / Charmander*`)
      }

      const myPokemonName = myPokemonNameRaw.toLowerCase()
      const theirPokemonName = theirPokemonNameRaw.toLowerCase()

      const userData = global.db.data.chats[m.chat].users[m.sender]
      if (!userData?.pokemon || userData.pokemon.length === 0) {
        return m.reply('🍒 No tienes ningún Pokémon para intercambiar en este grupo.')
      }

      const myPokemonIndex = userData.pokemon.findIndex(p => p.nombre.toLowerCase() === myPokemonName)
      if (myPokemonIndex === -1) return m.reply(`🍒 No tienes un Pokémon llamado *${myPokemonNameRaw}* en este grupo.`)

      const allUsers = global.db.data.chats[m.chat].users
      let partnerId = null
      let theirPokemonIndex = -1
      let theirPokemon = null

      for (const [uid, pdata] of Object.entries(allUsers)) {
        if (uid === m.sender) continue
        if (pdata?.pokemon) {
          const idx = pdata.pokemon.findIndex(p => p.nombre.toLowerCase() === theirPokemonName)
          if (idx !== -1) {
            partnerId = uid
            theirPokemonIndex = idx
            theirPokemon = pdata.pokemon[idx]
            break
          }
        }
      }

      if (!partnerId) {
        return m.reply(`🌱 Ningún usuario en este grupo tiene un Pokémon llamado *${theirPokemonNameRaw}*.`)
      }

      const myPokemon = userData.pokemon[myPokemonIndex]

      const tradeId = `${m.chat}_${Date.now()}`
      global.db.data.pokemonTrades[tradeId] = {
        proposer: m.sender,
        partner: partnerId,
        proposerPokemon: myPokemon,
        proposerPokemonIndex: myPokemonIndex,
        partnerPokemon: theirPokemon,
        partnerPokemonIndex: theirPokemonIndex,
        status: 'pending',
        createdAt: Date.now(),
        expiresAt: Date.now() + 300000
      }

      const proposerName = m.pushName || 'Desconocido'
      const partnerName = global.db.data.users[partnerId]?.name || 'Desconocido' 

await client.reply(m.chat,
  `🥤 *Propuesta de Intercambio*\n\n` +
  `ׅ  ׄ  🫧   ׅ り @${m.sender.split('@')[0]} quiere intercambiar:\n` +
  `ׅ  ׄ  🌵   ׅ り ${myPokemon.nombre} / ${theirPokemon.nombre}\n\n` +
  `ׅ  ׄ  🌵   ׅ り @${partnerId.split('@')[0]}, se ha solicitado un intercambio contigo.\n\n` +
  `> 🌱 Para aceptar este intercambio responde a este mensaje con el comando *${prefix}aceptarpoke*\n` +
  `> ⏰ Esta propuesta expira en 5 minutos.`,
  m,
  { mentions: [partnerId, m.sender] }
)
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}