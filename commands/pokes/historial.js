import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['historial', 'historypoke'],
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
        return m.reply(`🍒 ${target === m.sender ? 'No tienes' : `*${name}* no tiene`} ningún Pokémon en este grupo.`)
      }

      const pokemonList = userData.pokemon
      let totalWins = 0
      let totalLosses = 0
      let totalPower = 0

      const name = global.db.data.users?.[target]?.name || target.split('@')[0]
      let message = `ׅ  ׄ  🌵   ׅ り *Historial de Batallas de ${target === m.sender ? 'ti' : name}*\n`
      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n\n`

      pokemonList.forEach((poke, index) => {
        const pokemonData = global.db.data.pokemon?.[m.chat]?.[poke.id] || {}
        const wins = pokemonData.wins || 0
        const losses = pokemonData.losses || 0
        const poder = pokemonData.poder || poke.poder || 0
        const totalBattles = wins + losses
        const winRate = totalBattles > 0 ? ((wins / totalBattles) * 100).toFixed(1) : 0

        totalWins += wins
        totalLosses += losses
        totalPower += poder

        message += `${index + 1}. *${poke.nombre}* (${poke.tipo})\n`
        message += `ׅ  ׄ  🫧   ׅ り Poder: ${poder.toLocaleString()}\n`
        message += `ׅ  ׄ  🫧   ׅ り Victorias: ${wins}\n`
        message += `ׅ  ׄ  🫧   ׅ り Derrotas: ${losses}\n`
        message += `ׅ  ׄ  🫧   ׅ り Win Rate: ${winRate}%\n`
        message += `ׅ  ׄ  🫧   ׅ り Total batallas: ${totalBattles}\n\n`
      })

      const globalWinRate = (totalWins + totalLosses) > 0 ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1) : 0

      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n`
      message += `ׅ  ׄ  🥤   ׅ り *Resumen Global*\n\n`
      message += `ׅ  ׄ  🌵   ׅ り Victorias totales: ${totalWins}\n`
      message += `ׅ  ׄ  🌵   ׅ り Derrotas totales: ${totalLosses}\n`
      message += `ׅ  ׄ  🌵   ׅ り Win Rate global: ${globalWinRate}%\n`
      message += `ׅ  ׄ  🌵   ׅ り Poder total: ${totalPower.toLocaleString()}\n\n`
      message += `> 🌱 Pokémon activos: ${pokemonList.length}`

      await m.reply(message, null, { mentions: [target] })
    } catch (e) {
      m.reply(msgglobal + e)
    }
  }
}