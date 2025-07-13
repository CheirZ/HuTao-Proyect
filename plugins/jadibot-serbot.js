import { startSubDynamic } from '../lib/conexion.js';

const commandFlags = {};

const generateCaption = (isCode, devContact = '✿') => {
  if (isCode) {
    return `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ

✰ Usa éste Código para convertirte en Sub-Bot Temporal.

→ Tres Puntitos
→ Dispositivos Vinculados
→ Vincular Dispositivo
→ Vincular con el número de teléfono.

➤ *Importante:*
» No es recomendable usar tu cuenta principal.

${devContact}`;
  }

  return `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤

ↂ SUB BOT FUNCION֎

*❤️‍🩹 Usa otro cel o tu PC para vincular el bot en el dispositivo que será el SubBot*

\`1\` » Haz clic en los 3 puntitos de la parte superior derecha
\`2\` » Toca en dispositivos vinculados
\`3\` » Escanea el código QR para iniciar sesión con el bot
❤️‍🔥 *Este código QR expira en 45 segundos*

*𝐉𝐀𝐃𝐈𝐁𝐎𝐓 𝐄𝐃𝐈𝐓𝐀𝐃𝐎 𝐏𝐎𝐑 𝐗𝐢_𝐌𝐢𝐠𝐮𝐞𝐥𝐨𝐧77𝐗𝐗*`;
};

const handler = async (m, { conn, command }) => {
  const sender = m.sender;
  const phone = sender?.split('@')[0];
  const isCode = command?.toLowerCase() === 'code';
  const caption = generateCaption(isCode, global.dev);

  if (!sender || !phone) {
    return conn.sendMessage(m.chat, {
      text: '[ ✿ ] No se pudo procesar tu solicitud. El identificador del usuario es inválido.',
      quoted: m
    });
  }

  if (commandFlags[sender]) {
    return conn.sendMessage(m.chat, {
      text: '[ ✿ ] Ya estás solicitando un SubBot. Espera unos segundos antes de volver a intentarlo.',
      quoted: m
    });
  }

  commandFlags[sender] = true;

  try {
    const result = await startSubDynamic(m, conn, caption, isCode, phone, m.chat, commandFlags);

  } catch (err) {
    console.error('Error iniciando SubBot:', err);
    await conn.sendMessage(m.chat, {
      text: '[ ✿ ] Hubo un error al iniciar el SubBot. Inténtalo nuevamente más tarde.',
      quoted: m
    });
  } finally {
    setTimeout(() => delete commandFlags[sender], 90000);
  }
};

handler.help = ['qr', 'code'];
handler.tags = ['jadibot'];
handler.command = /^(qr|code)$/i;

export default handler;