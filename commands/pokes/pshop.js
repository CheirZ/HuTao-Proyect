export default {
  command: ['pokeshop', 'tiendapokemon', 'pshop', 'shopoke'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      if (!global.db.data.pokemonShop[m.chat] || global.db.data.pokemonShop[m.chat].length === 0) {
        return m.reply('🌱 No hay Pokémon en venta en este grupo.')
      }

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const money = botSettings.currency || ''

      const shop = global.db.data.pokemonShop[m.chat]
      let message = `ׅ  ׄ  🥤   ׅ り *Tienda de Pokémon*\n\n`

      for (let i = 0; i < shop.length; i++) {
        const item = shop[i]
        const sellerData = global.db.data.users[item.vendedor]
        const sellerName = global.db.data.users[item.vendedor].name || 'Desconocido'

        message += `${i + 1}. *${item.nombre}*\n`
        message += `ׅ  ׄ  🌵   ׅ り Tipo: ${item.tipo}\n`
        message += `ׅ  ׄ  🌵   ׅ り Poder: ${Number(item.poder).toLocaleString()}\n`
        message += `ׅ  ׄ  🌵   ׅ り Precio: ${Number(item.precio).toLocaleString()} ${money}\n`
        message += `ׅ  ׄ  🌵   ׅ り Vendedor: ${sellerName}\n\n`
      }

      message += `> 🍒 Usa *${prefix}buypoke <número>* para comprar.`

      await m.reply(message)
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}