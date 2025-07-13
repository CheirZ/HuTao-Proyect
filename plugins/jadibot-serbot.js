import { startSubDynamic } from '../lib/conexion.js';
let commandFlags = {}

const mensajes = {
  qr: `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤

ↂ SUB BOT FUNCION֎

*❤️‍🩹 Usa otro cel o tu PC para vincular el bot en tu dispositivo que será el bot🔥*

\`1\` » Haz clic en los 3 puntitos de la parte superior derecha  
\`2\` » Toca en dispositivos vinculados  
\`3\` » Escanea el código QR para iniciar sesión con el bot  

❤️‍🔥 *¡Este código QR expira en 45 segundos!*

*JADIBOT EDITADO POR Xi_Miguelon77XX*`,
  
  code: (devLink) => `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ

✰ Usa éste Código para convertirte en Sub-Bot Temporal.

→ Tres Puntitos  
→ Dispositivos Vinculados  
→ Vincular Dispositivo  
→ Vincular con el número de teléfono.

➤ *Importante:*  
» No es recomendable usar tu cuenta principal.  
» Si el Bot principal se reinicia, todos los Sub-Bots se desconectarán.

${devLink}`
}

const handler = async (m, { conn, command }) => {
  const sender = m.sender
  const phone = sender.split('@')[0]
  const isCode = /^(qr|code)$/i.test(command)

  if (!commandFlags[sender]) commandFlags[sender] = false
  commandFlags[sender] = true

  const caption = isCode
    ? mensajes.code(global.dev)
    : mensajes.qr

  try {
    await startSubDynamic(m, conn, caption, isCode, phone, m.chat, commandFlags)
  } catch (error) {
    console.error("❌ Error starting sub bot:", error)
    await conn.sendMessage(m.chat, {
      text: "⚠️ Hubo un error al intentar iniciar el Sub Bot. Por favor, inténtalo de nuevo más tarde.",
      quoted: m
    })
  }
}

handler.help = ['qr', 'code']
handler.tags = ['jadibot']
handler.command = /^(code|qr)$/i

export default handler