export default {
  command: [
    'welcome', 'bienvenidas',
    'alerts', 'alertas',
    'nsfw',
    'antilink', 'antienlaces', 'antilinks',
    'rpg', 'economy', 'economia',
    'gacha',
    'adminonly', 'onlyadmin'
  ],
  category: 'grupo',
  isAdmin: true,
  run: async (client, m, args, command) => {
    const chatData = global.db.data.chats[m.chat]
    const stateArg = args[0]?.toLowerCase()
    const validStates = ['on', 'off', 'enable', 'disable']

    const mapTerms = {
      antilinks: 'antilinks',
      antienlaces: 'antilinks',
      antilink: 'antilinks',
      welcome: 'welcome',
      bienvenidas: 'welcome',
      alerts: 'alerts',
      alertas: 'alerts',
      economy: 'rpg',
      rpg: 'rpg',
      economia: 'rpg',
      adminonly: 'adminonly',
      onlyadmin: 'adminonly',
      nsfw: 'nsfw',
      gacha: 'gacha'
    }

    const featureNames = {
      antilinks: 'el *AntiEnlace*',
      welcome: 'el mensaje de *Bienvenida*',
      alerts: 'las *Alertas*',
      rpg: 'los comandos de *Economía*',
      gacha: 'los comandos de *Gacha*',
      adminonly: 'el modo *Solo Admin*',
      nsfw: 'los comandos *NSFW*'
    }

    const featureTitles = {
      antilinks: 'AntiEnlace',
      welcome: 'Bienvenida',
      alerts: 'Alertas',
      rpg: 'Economía',
      gacha: 'Gacha',
      adminonly: 'AdminOnly',
      nsfw: 'NSFW'
    }

    const normalizedKey = mapTerms[command] || command
    const current = chatData[normalizedKey] === true
    const estado = current ? '✓ Activado' : '✗ Desactivado'
    const nombreBonito = featureNames[normalizedKey] || `la función *${normalizedKey}*`
    const titulo = featureTitles[normalizedKey] || normalizedKey

    if (!stateArg) {
      return client.reply(
        m.chat,
        `*✩ ${titulo} (✿❛◡❛)*\n` +
        `❒ *Estado ›* ${estado}\n\n` +
        `ꕥ Un administrador puede activar o desactivar ${nombreBonito} utilizando:\n\n` +
        `> ● _Habilitar ›_ *${prefa + normalizedKey} enable*\n` +
        `> ● _Deshabilitar ›_ *${prefa + normalizedKey} disable*\n\n${dev}`,
        m
      )
    }

    if (!validStates.includes(stateArg)) {
      return m.reply(
        `🌾 Estado no válido. Usa *on*, *off*, *enable* o *disable*\n\nEjemplo:\n${prefa}${normalizedKey} enable`
      )
    }

    const enabled = ['on', 'enable'].includes(stateArg)

    if (chatData[normalizedKey] === enabled) {
      return m.reply(`🌱 *${titulo}* ya estaba *${enabled ? 'activado' : 'desactivado'}*.`)
    }

    chatData[normalizedKey] = enabled
    return m.reply(`🌱 Has *${enabled ? 'activado' : 'desactivado'}* ${nombreBonito}.`)
  }
};