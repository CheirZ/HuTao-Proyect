import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['harempokes', 'harempokemones'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      const mentionedJid = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null)
      const who = mentionedJid || m.sender
    const target = await resolveLidToRealJid(who, client, m.chat);

      const userData = global.db.data.chats?.[m.chat]?.users?.[target] || {}

      if (!userData.pokemon || userData.pokemon.length === 0) {
        const name = global.db.data.users?.[target]?.name || target.split('@')[0]
        return m.reply(`🍒 ${target === m.sender ? 'No tienes' : `*${name}* no tiene`} ningún Pokémon atrapado en este grupo.`)
      }

      const pokemonList = userData.pokemon
      const name = global.db.data.users?.[target]?.name || target.split('@')[0]
      let message = `🥦 *Pokémones de ${target === m.sender ? 'ti' : name}*\n\n`

      pokemonList.forEach((poke, index) => {
        const pokemonData = global.db.data.pokemon?.[m.chat]?.[poke.id] || {}
        const poder = pokemonData.poder || poke.poder || 0
        const wins = pokemonData.wins || 0
        const losses = pokemonData.losses || 0

        message += `${index + 1}. 🍒 *${poke.nombre}*\n`
        message += `ׅ  ׄ  🌵   ׅ り Tipo: ${poke.tipo}\n`
        message += `ׅ  ׄ  🌵   ׅ り Poder: ${poder.toLocaleString()}\n`
        message += `ׅ  ׄ  🌵   ׅ り Victorias: ${wins} | Derrotas: ${losses}\n\n`
      })

      message += `🍓 Total: *${pokemonList.length}* Pokémon`

      await m.reply(message, null, { mentions: [target] })
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}