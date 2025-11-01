// Manejador de respuestas para el menú interactivo
let handler = async (m, { conn, usedPrefix }) => {
  let text = m.text.trim()
  
  // Solo procesar si es una respuesta numérica del 1 al 5
  if (!/^[1-5]$/.test(text)) return
  
  let response = ''
  
  switch (text) {
    case '1':
      // Menú completo
      response = `📋 *MENÚ COMPLETO DISPONIBLE*

Para ver el menú completo usa:
${usedPrefix}menu

O estos comandos alternativos:
• ${usedPrefix}help
• ${usedPrefix}allmenu
• ${usedPrefix}menucompacto (versión corta)`
      break
      
    case '2':
      // Comandos populares
      response = `🔥 *COMANDOS MÁS POPULARES*

🎵 *MÚSICA Y VIDEOS:*
• ${usedPrefix}play [canción] - Descargar música
• ${usedPrefix}ytv [video] - Descargar video YT
• ${usedPrefix}spotify [url] - Descargar de Spotify

📱 *REDES SOCIALES:*
• ${usedPrefix}tiktok [url] - Descargar TikTok
• ${usedPrefix}ig [url] - Descargar Instagram
• ${usedPrefix}fb [url] - Descargar Facebook

🎨 *STICKERS:*
• ${usedPrefix}s - Crear sticker (responder imagen)
• ${usedPrefix}sticker - Sticker animado

🤖 *INTELIGENCIA ARTIFICIAL:*
• ${usedPrefix}ia [pregunta] - ChatGPT
• ${usedPrefix}gemini [texto] - Google Gemini

🔍 *BÚSQUEDAS:*
• ${usedPrefix}google [búsqueda] - Buscar en Google
• ${usedPrefix}imagen [búsqueda] - Buscar imágenes`
      break
      
    case '3':
      // Información del bot
      response = `ℹ️ *INFORMACIÓN DEL BOT*

Para ver información detallada:
• ${usedPrefix}info - Info general
• ${usedPrefix}estado - Estado del sistema  
• ${usedPrefix}ping - Velocidad del bot
• ${usedPrefix}uptime - Tiempo activo
• ${usedPrefix}dashboard - Estadísticas
• ${usedPrefix}version - Versión actual`
      break
      
    case '4':
      // Configuración
      response = `⚙️ *CONFIGURACIÓN DEL BOT*

Para configurar el bot en grupos:
• ${usedPrefix}config - Panel de configuración
• ${usedPrefix}enable - Activar funciones
• ${usedPrefix}disable - Desactivar funciones

*Funciones configurables:*
• welcome - Mensajes de bienvenida
• antilink - Anti enlaces
• detect - Detectar cambios
• autolevelup - Subir nivel automático
• autoresponder - Respuestas automáticas`
      break
      
    case '5':
      // Ayuda y soporte
      response = `🆘 *AYUDA Y SOPORTE*

📞 *CONTACTO:*
• Creador: CheirZ
• GitHub: https://github.com/CheirZ

📢 *CANALES OFICIALES:*
• Canal principal: ${global.channelURL || 'No configurado'}

❓ *COMANDOS DE AYUDA:*
• ${usedPrefix}help - Ayuda general
• ${usedPrefix}comando [nombre] - Info específica
• ${usedPrefix}report [problema] - Reportar error

🔧 *PROBLEMAS COMUNES:*
• Si no responde: ${usedPrefix}ping
• Si hay errores: ${usedPrefix}report [detalle]
• Para restart: Solo owners`
      break
  }
  
  await m.react('✅')
  await conn.reply(m.chat, response, m)
}

handler.before = async function (m, { conn, usedPrefix }) {
  // Solo procesar mensajes que sean respuestas numéricas 1-5
  if (!m.text || !/^[1-5]$/.test(m.text.trim())) return
  
  // Verificar si el mensaje anterior era del menú interactivo
  let chat = global.db.data.chats[m.chat]
  if (!chat.lastMenuInteractive) return
  
  // Verificar que no haya pasado mucho tiempo (5 minutos)
  if (Date.now() - chat.lastMenuInteractive > 300000) {
    delete chat.lastMenuInteractive
    return
  }
  
  // Procesar la respuesta
  return handler.call(this, m, { conn, usedPrefix })
}

export default handler