export default {
  command: ['pinfo'],
  category: 'pokes',
  run: async (client, m, args) => {
    const chatId = m.chat
    const userId = m.sender
    const chatData = db.data.chats[chatId] || []
    const user = chatData.users[userId] || []
    const now = Date.now()

    if (chatData.adminonly || !chatData.pokes)
      return m.reply(`🌽 Estos comandos están desactivados en este grupo.`)

    const cooldowns = {
      buy: Math.max(0, (user.lastPokemonBuy || 0) - now),
      roll: Math.max(0, (user.lastPokemonRoll || 0) - now),
      heal: Math.max(0, (user.lastPokemonHeal || 0) - now),
      pvp: Math.max(0, (user.lastPokemonPvp || 0) - now),
      pvp2: Math.max(0, (user.lastPokemonAceptar || 0) - now)
    }

    const formatTime = (ms) => {
      const totalSeconds = Math.floor(ms / 1000)
      const hours = Math.floor((totalSeconds % 86400) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const parts = []
      if (hours > 0) parts.push(`${hours} hora${hours > 1 ? 's' : ''}`)
      if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`)
      if (seconds > 0) parts.push(`${seconds} segundo${seconds > 1 ? 's' : ''}`)
      return parts.join(' ')
    }

   const pokeList = user.pokemon || '0'

    const nombre = db.data.users[userId]?.name || userId.split('@')[0]

    const mensaje = `ׅ  ׄ  🧊ᩙ   ׅ り Usuario \`<${nombre}>\`

𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾

ׅ  ׄ  🌵   ׅ り RollPoke » *${cooldowns.roll > 0 ? formatTime(cooldowns.roll) : 'Ahora.'}*
ׅ  ׄ  🌵   ׅ り Claim » *${cooldowns.buy > 0 ? formatTime(cooldowns.buy) : 'Ahora.'}*
ׅ  ׄ  🌵   ׅ り Alimentar » *${cooldowns.heal > 0 ? formatTime(cooldowns.heal) : 'Ahora.'}*
ׅ  ׄ  🌵   ׅ り Pvp » *${cooldowns.pvp > 0 ? formatTime(cooldowns.pvp) : 'Ahora.'}*
ׅ  ׄ  🌵   ׅ り Aceptar Pvp » *${cooldowns.pvp2 > 0 ? formatTime(cooldowns.pvp2) : 'Ahora.'}*

𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾

ׅ  ׄ  🫧   ׅ り Total Pokes » *${pokeList.length}*`

   // await m.reply(mensaje)

await client.sendContextInfoIndex(m.chat, mensaje, {}, m, true, {})
  }
};