import { startSub } from '../lib/conexion.js' 
let commandFlags = {} 

const handler = async (m, { conn, command }) => {
  commandFlags[m.sender] = true

  let rtx = `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤\n\nↂ SUB BOT FUNCION֎\n\n*❤️‍🩹 𝐮𝐬𝐚 𝐨𝐭𝐫𝐨 𝐜𝐞𝐥 𝐨 𝐭𝐮 𝐩𝐜 𝐩𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐫 𝐞𝐥 𝐛𝐨𝐭 𝐞𝐧 𝐭𝐮 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨 𝐪𝐮𝐞 𝐬𝐞𝐫𝐚 𝐞𝐥 𝐛𝐨𝐭🔥*\n\n\`1\` » 𝐡𝐚𝐠𝐚 𝐜𝐥𝐢𝐜𝐤 𝐞𝐧 𝐥𝐨𝐬 3 𝐩𝐮𝐧𝐭𝐨𝐬 𝐝𝐞 𝐥𝐚 𝐩𝐚𝐫𝐭𝐞 𝐬𝐮𝐩𝐞𝐫𝐢𝐨𝐫 𝐝𝐞𝐫𝐞𝐜𝐡𝐚\n\n\`2\` » 𝐭𝐨𝐪𝐮𝐞 𝐞𝐧 𝐝𝐢𝐬𝐩𝐨𝐜𝐢𝐭𝐢𝐯𝐨𝐬 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐝𝐨𝐬\n\n\`3\` » 𝐞𝐬𝐜𝐚𝐧𝐞𝐞 𝐞𝐥 𝐜𝐨𝐝𝐢𝐠𝐨 𝐐𝐑 𝐩𝐚𝐫𝐚 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐜𝐜𝐢𝐨𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐛𝐨𝐭\n\n❤️‍🔥 *¡Este código QR expira en 45 segundos!*\n\n*𝐉𝐀𝐃𝐈𝐁𝐎𝐓 𝐄𝐃𝐈𝐓𝐀𝐃𝐎 𝐏𝐎𝐑 𝐗𝐢_𝐌𝐢𝐠𝐮𝐞𝐥𝐨𝐧77𝐗𝐗*'`

  let rtx2 = `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ\n\n✰ Usa éste Código para convertirte en Sub-Bot Temporal.\n\n→ Tres Puntitos\n→ Dispositivos Vinculados\n→ Vincular Dispositivo\n→ Vincular con el número de teléfono.\n\n➤ *Importante:*\n» No es recomendable usar tu cuenta principal.\n» Si el Bot principal se reinicia, todos los Sub-Bots se desconectarán.\n\n${global.dev}`

  const phone = m.sender.split('@')[0] 
  const isCode = /^(qr|code)$/.test(command) 
  const caption = isCode ? rtx2 : rtx

  await startSubBot(m, conn, caption, isCode, phone, m.chat, commandFlags)
}

handler.help = ['jadibot', 'serbot', 'code']
handler.tags = ['jadibot']
handler.command = /^(code|qr)$/i

export default handler