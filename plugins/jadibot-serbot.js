import { startSubDynamic } from '../lib/conexion.js';
let commandFlags = {};

const handler = async (m, { conn, command }) => {
  if (!commandFlags[m.sender]) commandFlags[m.sender] = true;

  const isCode = /^(code|qr)$/i.test(command);
  const phone = m.sender.split('@')[0];
  const caption = isCode
    ? `☯ Vinculación temporal por número\n→ Vincula desde WhatsApp Web\n→ Código expira pronto`
    : `↝ Escanea el QR desde otro dispositivo\n→ ¡No uses tu cuenta principal!\n→ Código expira en 45 segundos`;

  try {
    await startSubDynamic(m, conn, caption, isCode, phone, m.chat, commandFlags);
  } catch (err) {
    console.error("❌ Error en SubBot:", err);
    await conn.sendMessage(m.chat, {
      text: "Hubo un error iniciando el sub-bot. Intenta nuevamente.",
      quoted: m
    });
  }
};

handler.help = ['qr', 'code'];
handler.tags = ['jadibot'];
handler.command = /^(code|qr)$/i;
export default handler;