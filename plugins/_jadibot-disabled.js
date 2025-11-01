// Plugin para bloquear comandos de jadibot/serbot
let handler = async (m, { conn, command, usedPrefix }) => {
  // Mensaje de información sobre la desactivación
  let mensaje = `🚫 *FUNCIÓN DESHABILITADA*

La función de *SubBot/SerBot* ha sido deshabilitada por el administrador.

📋 *Comandos disponibles:*
• ${usedPrefix}menu - Ver menú principal
• ${usedPrefix}help - Ayuda general
• ${usedPrefix}info - Información del bot

*Nota:* Esta función puede ser reactivada por el owner del bot modificando la configuración.`

  await conn.reply(m.chat, mensaje, m)
}

// Lista de comandos relacionados con jadibot que serán bloqueados
handler.command = [
  'jadibot', 'serbot', 'subbot', 
  'getcode', 'token', 'rentbot',
  'bots', 'listbots', 'delbots',
  'stop', 'deletebot'
]

handler.help = ['jadibot (deshabilitado)']
handler.tags = ['info']

export default handler