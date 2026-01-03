const findCharacterByName = (name, characters) => {
  return characters.find((p) => p.name?.toLowerCase() === name.toLowerCase())
}

export default {
  command: ['trade', 'cambiar'],
  category: 'gacha',
    run: async (client, m, args, command, text, prefix) => {
    const db = global.db.data
    const chatId = m.chat
    const userId = m.sender
    const chatData = db.chats[chatId]

    if (chatData.adminonly || !chatData.gacha)
      return m.reply(`✎ Estos comandos estan desactivados en este grupo.`)

    if (chatData.timeTrade && chatData.timeTrade - Date.now() > 0)
      return m.reply('🫛 Ya hay un intercambio en curso. Espera a que se complete o expire.')

    const partes = args
      .join(' ')
      .split('/')
      .map((s) => s.trim())
    if (partes.length !== 2)
      return m.reply(
        `🫛 Usa el formato correcto:\n› *${prefix}trade Tu personaje / Personaje del otro usuario*`,
      )

 try {
    const [personaje1Nombre, personaje2Nombre] = partes
    const userData = chatData.users[userId]?.characters || []
    const personaje1 = findCharacterByName(personaje1Nombre, userData)

    const personaje2UserEntry = Object.entries(chatData.users || {}).find(([_, u]) =>
      u.characters?.some((c) => c.name?.toLowerCase() === personaje2Nombre.toLowerCase()),
    )
    const personaje2UserId = personaje2UserEntry?.[0]
    const personaje2UserData = personaje2UserEntry?.[1]?.characters || []
    const personaje2 = findCharacterByName(personaje2Nombre, personaje2UserData)

    if (!personaje1) return m.reply(`🫛 No tienes el personaje *${personaje1Nombre}*.`)
    if (!personaje2)
      return m.reply(`🫛 El personaje *${personaje2Nombre}* no está disponible para intercambio.`)

   // chatData.intercambios ||= []
    chatData.intercambios.push({
      solicitante: userId,
      personaje1,
      personaje2,
      destinatario: personaje2UserId,
      expiracion: Date.now() + 60000,
    })

    chatData.timeTrade = Date.now() + 60000

    const solicitudMessage = `🫛 @${personaje2UserId.split('@')[0]}, @${userId.split('@')[0]} te ha enviado una solicitud de intercambio

🪼 *${personaje2.name}* ⇄ *${personaje1.name}*
> 🪻 Para aceptar, usa › *${prefix}accepttrade* dentro de 1 minuto.

${dev}`
await client.reply(
  chatId,
  solicitudMessage,
  m,
  { mentions: [userId, personaje2UserId] }
)

} catch (e) {
 m.reply(msgglobal + e)
 }
}
};
