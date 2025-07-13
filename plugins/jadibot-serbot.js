import { startSubDynamic } from '../lib/conexion.js';
let commandFlags = {}

const handler = async (m, { conn, command }) => {
  if (!commandFlags[m.sender]) {
    commandFlags[m.sender] = false
  }

  commandFlags[m.sender] = true

  const rtx = `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤
  
ↂ SUB BOT FUNCION֎

*❤️‍🩹 𝐮𝐬𝐚 𝐨𝐭𝐫𝐨 𝐜𝐞𝐥 𝐨 𝐭𝐮 𝐩𝐜 𝐩𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐫 𝐞𝐥 𝐛𝐨𝐭 𝐞𝐧 𝐭𝐮 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨 𝐪𝐮𝐞 𝐬𝐞𝐫𝐚 𝐞𝐥 𝐛𝐨𝐭🔥*

\`1\` » 𝐡𝐚𝐠𝐚 𝐜𝐥𝐢𝐜𝐤 𝐞𝐧 𝐥𝐨𝐬 3 𝐩𝐮𝐧𝐭𝐨𝐬 𝐝𝐞 𝐥𝐚 𝐩𝐚𝐫𝐭𝐞 𝐬𝐮𝐩𝐞𝐫𝐢𝐨𝐫 𝐝𝐞𝐫𝐞𝐜𝐡𝐚

\`2\` » 𝐭𝐨𝐪𝐮𝐞 𝐞𝐧 𝐝𝐢𝐬𝐩𝐨𝐜𝐢𝐭𝐢𝐯𝐨𝐬 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐝𝐨𝐬

\`3\` » 𝐞𝐬𝐜𝐚𝐧𝐞𝐞 𝐞𝐥 𝐜𝐨𝐝𝐢𝐠𝐨 𝐐𝐑 𝐩𝐚𝐫𝐚 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐜𝐜𝐢𝐨𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐛𝐨𝐭

❤️‍🔥 *¡Este código QR expira en 45 segundos!*

*𝐉𝐀𝐃𝐈𝐁𝐎𝐓 𝐄𝐃𝐈𝐓𝐀𝐃𝐎 𝐏𝐎𝐑 𝐗𝐢_𝐌𝐢𝐠𝐮𝐞𝐥𝐨𝐧77𝐗𝐗*`

  const rtx2 = `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ

✰ Usa éste Código para convertirte en Sub-Bot Temporal.

→ Tres Puntitos
→ Dispositivos Vinculados
→ Vincular Dispositivo
→ Vincular con el número de teléfono.

➤ *Importante:*
» No es recomendable usar tu cuenta principal.
» Si el Bot principal se reinicia, todos los Sub-Bots se desconectarán.

${global.dev}`

  const phone = m.sender.split('@')[0]
  const isCode = /^(qr|code)$/i.test(command)
  const caption = isCode ? rtx2 : rtx

  try {
    await startSubDynamic(m, conn, caption, isCode, phone, m.chat, commandFlags)
  } catch (error) {
    console.error("Error starting sub bot:", error)
    await conn.sendMessage(m.chat, {
      text: "Hubo un error al intentar iniciar el Sub Bot. Por favor, inténtalo de nuevo más tarde.",
      quoted: m
    })
  }
}

handler.help = ['qr', 'code']
handler.tags = ['jadibot']
handler.command = /^(code|qr)$/i

export default handler
