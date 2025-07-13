import { startSubDynamic } from '../lib/conexion.js';
let commandFlags = {}; 

const handler = async (m, { conn, command }) => {
commandFlags[m.sender] = true;

const rtx = `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤

ↂ SUB BOT FUNCION֎

*❤️‍🩹 Usa otro cel o tu PC para vincular el bot en el dispositivo que será el SubBot*

\`1\` » Haz clic en los 3 puntitos de la parte superior derecha
\`2\` » Toca en dispositivos vinculados
\`3\` » Escanea el código QR para iniciar sesión con el bot

❤️‍🔥 *Este código QR expira en 45 segundos*

*𝐉𝐀𝐃𝐈𝐁𝐎𝐓 𝐄𝐃𝐈𝐓𝐀𝐃𝐎 𝐏𝐎𝐑 𝐗𝐢_𝐌𝐢𝐠𝐮𝐞𝐥𝐨𝐧77𝐗𝐗*`;
const rtx2 = `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ

✰ Usa éste Código para convertirte en Sub-Bot Temporal.

→ Tres Puntitos
→ Dispositivos Vinculados
→ Vincular Dispositivo
→ Vincular con el número de teléfono.

➤ *Importante:*
» No es recomendable usar tu cuenta principal.
» Si el Bot principal se reinicia, todos los Sub-Bots se desconectarán.

${devContact}`;

const phone = m.sender?.split('@')[0];
const isCode = /^(qr|code)$/.test(command);
const caption = isCode ? rtx2 : rtx;
await startSubBot(m, conn, caption, isCode, phone, m.chat, commandFlags);
};
handler.help = ['qr', 'code'];
handler.tags = ['jadibot'];
handler.command = /^(qr|code)$/i;
handler.register = false;

export default handler;