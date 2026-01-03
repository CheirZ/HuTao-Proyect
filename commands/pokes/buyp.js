export default {
  command: ['comprarpokemon', 'buypoke', 'comprarpoke', 'buyp'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      if (!text) {
        return m.reply(`🌱 Uso: *${prefix + command} <nombre>*\n\n> 🍒 Usa *${prefix}pokeshop* para ver los Pokémon disponibles.`)
      }

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const money = botSettings.currency || ''

      if (!global.db.data.pokemonShop || !global.db.data.pokemonShop[m.chat] || global.db.data.pokemonShop[m.chat].length === 0) {
        return m.reply('🌱 No hay Pokémon en venta en este grupo.')
      }

      const shop = global.db.data.pokemonShop[m.chat]
      const pokemonName = text.trim().toLowerCase()
      const index = shop.findIndex(p => p.nombre.toLowerCase() === pokemonName)

      if (index === -1) return m.reply(`🌱 No se encontró un Pokémon llamado *${text}* en la tienda.`)

      const item = shop[index]
      if (item.vendedor === m.sender) return m.reply('🌱 No puedes comprar tu propio Pokémon.')

      const userData = global.db.data.chats[m.chat].users?.[m.sender] || {}
      const sellerData = global.db.data.chats[m.chat].users?.[item.vendedor] || {}

      userData.coins = userData.coins || 0
      sellerData.coins = sellerData.coins || 0

      if (userData.coins < item.precio) {
        return m.reply(`🌱 No tienes suficientes ${money}. Necesitas *${item.precio.toLocaleString()}* pero solo tienes *${userData.coins.toLocaleString()}*.`)
      }

      userData.coins -= item.precio
      sellerData.coins += item.precio

      const pokemonData = global.db.data.pokemon?.[m.chat]?.[item.id] || {}
      if (!pokemonData.ownerHistory) pokemonData.ownerHistory = []

      const sellerPokemon = sellerData.pokemon?.find(p => p.id === item.id)
      pokemonData.ownerHistory.push({
        owner: item.vendedor,
        ownedFrom: sellerPokemon?.atrapado || Date.now(),
        ownedUntil: Date.now(),
        transferType: 'venta',
        price: item.precio
      })

      if (!userData.pokemon) userData.pokemon = []
      userData.pokemon.push({
        id: item.id,
        nombre: item.nombre,
        tipo: item.tipo,
        poder: item.poder,
        atrapado: Date.now()
      })

      pokemonData.atrapado = true
      pokemonData.atrapador = m.sender

      if (sellerData.pokemon) {
        const pokemonIndex = sellerData.pokemon.findIndex(p => p.id === item.id)
        if (pokemonIndex !== -1) sellerData.pokemon.splice(pokemonIndex, 1)
      }

      shop.splice(index, 1)

      await m.reply(
        `ׅ  ׄ  🧊ᩙ   ׅ り *¡Compra exitosa!*\n\n` +
        `ׅ  ׄ  🌵   ׅ り Has comprado a *${item.nombre}*\n` +
        `ׅ  ׄ  🌵   ׅ り *Tipo* » ${item.tipo}\n` +
        `ׅ  ׄ  🌵   ׅ り *Poder* » ${item.poder.toLocaleString()}\n` +
        `ׅ  ׄ  🌵   ׅ り *Precio pagado* » ${item.precio.toLocaleString()} ${money}\n\n` +
        `> 🌱 *${money} restantes* » ${userData.coins.toLocaleString()}`
      )

      const from = m.chat
      const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(() => {}) : ''
      const groupName = groupMetadata.subject

      await client.reply(
        item.vendedor,
        `ׅ  ׄ  🥤   ׅ り *¡Venta realizada!*\n\n` +
        `ׅ  ׄ  🌵   ׅ り Grupo: *${groupName}*\n` +
        `ׅ  ׄ  🌵   ׅ り Has vendido a *${item.nombre}* por *${item.precio.toLocaleString()}* ${money}.\n\n` +
        `> 🌱 *${money} actuales* » ${sellerData.coins.toLocaleString()}`,
        m
      )
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}