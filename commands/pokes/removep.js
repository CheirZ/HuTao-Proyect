export default {
  command: ['removepoke', 'removepokemon', 'removep'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      if (!global.db.data.pokemonShop[m.chat] || global.db.data.pokemonShop[m.chat].length === 0) {
        return m.reply('🌱 No hay Pokémon en venta en este grupo.')
      }

      if (!text) {
        return m.reply('🌱 Ingresa el nombre del Pokémon para retirarlo del store.')
      }

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const money = botSettings.currency || ''

      const pokemonName = text.trim().toLowerCase()
      const index = global.db.data.pokemonShop[m.chat].findIndex(p => p.nombre.toLowerCase() === pokemonName)

      if (index === -1) {
        return m.reply(`🍒 No se encontró un Pokémon llamado ${text} en la tienda.`)
      }

      const item = global.db.data.pokemonShop[m.chat][index]

      if (item.vendedor !== m.sender) {
        return m.reply('🍒 Solo el vendedor original puede remover su Pokémon de la tienda.')
      }
 global.db.data.pokemonShop[m.chat].splice(index, 1)

      const userData = global.db.data.chats[m.chat].users[m.sender]
      if (!userData.pokemon) userData.pokemon = []
      userData.pokemon.push({
        id: item.id,
        nombre: item.nombre,
        tipo: item.tipo,
        poder: item.poder
      })

      await m.reply(
        `🐢 Pokémon removido de la tienda\n\n` +
        `ׅ  ׄ  🌵   ׅ り Pokémon » ${item.nombre}\n` +
        `ׅ  ׄ  🌵   ׅ り Tipo » ${item.tipo}\n` +
        `ׅ  ׄ  🌵   ׅ り Poder » ${item.poder.toLocaleString()}\n` +
        `ׅ  ׄ  🌵   ׅ り Precio » ${item.precio.toLocaleString()} ${money}\n\n` +
        `> 🌱 El Pokémon ha vuelto a tu inventario.`
      )
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}