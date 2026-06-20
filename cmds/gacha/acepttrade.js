import db from "#db"
export default {
  command: ['accepttrade', 'aceptarintercambio'],
  category: 'gacha',
  run: async ({ msg, sock }) => {
    const chatId = msg.chat
    const userId = msg.sender
    
    const chatConfig = await db.getChat(chatId)
    
    if (chatConfig.adminonly || !chatConfig.gacha)
      return msg.reply(mess.comandooff)

    let intercambios = chatConfig.intercambios || []
    if (!Array.isArray(intercambios)) {
      try {
        if (typeof intercambios === 'string') intercambios = JSON.parse(intercambios)
        else intercambios = []
      } catch {
        intercambios = []
      }
    }
    
    const intercambio = intercambios.find(
      (i) => i.expiracion > Date.now() && i.destinatario === userId
    )

    if (!intercambio) 
      return msg.reply('《✤》 No tienes ninguna solicitud de intercambio activa.')

    const solicitante = await db.getChatUser(chatId, intercambio.solicitante)
    const destinatario = await db.getChatUser(chatId, intercambio.destinatario)

    solicitante.characters = [
      ...(solicitante.characters || []).filter((c) => c.name !== intercambio.personaje1.name),
      intercambio.personaje2,
    ]

    destinatario.characters = [
      ...(destinatario.characters || []).filter((c) => c.name !== intercambio.personaje2.name),
      intercambio.personaje1,
    ]

    await db.updateChatUser(chatId, intercambio.solicitante, 'characters', solicitante.characters)
    await db.updateChatUser(chatId, intercambio.destinatario, 'characters', destinatario.characters)

    intercambios = intercambios.filter((i) => i !== intercambio)
    await db.updateChat(chatId, 'intercambios', intercambios)
    await db.updateChat(chatId, 'timeTrade', 0)

    const solicitanteGlobal = await db.getUser(intercambio.solicitante)
    const destinatarioGlobal = await db.getUser(intercambio.destinatario)
    
    const nombreSolicitante = solicitanteGlobal?.name || intercambio.solicitante.split('@')[0]
    const nombreDestinatario = destinatarioGlobal?.name || intercambio.destinatario.split('@')[0]

    const mensajeConfirmacion = `ꕥ *Intercambio realizado exitosamente (✿❛◡❛)*\n\n✎ *${intercambio.personaje1.name}* ahora pertenece a *${nombreDestinatario}*\n✎ *${intercambio.personaje2.name}* ahora pertenece a *${nombreSolicitante}*

${dev}`

    await sock.reply(chatId, mensajeConfirmacion, msg)
  }
};
