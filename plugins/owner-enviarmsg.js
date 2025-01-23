/*const idgroup = "120363351999685409@g.us"; 
const reports = {}; 

let handler = async (m, { conn, command, args }) => {
  if (command === 'test') {
    const contenido = args.join(' ');

    if (!contenido) {
      return conn.reply(m.chat, `✿ Por favor, proporciona un reporte.`, m);
    }

    const senderName = await conn.getName(m.sender);
    const reportText = `👤 *Usuario:* ${senderName || 'Anónimo'}\n📝 *Reporte:* ${contenido || 'Sin descripción'}`;

    await conn.sendMessage(idgroup, { text: `✿ Nuevo reporte:\n\n${reportText}\n\nUsuario: @${m.sender.split('@')[0]}`, mentions: [m.sender] });

    await conn.reply(m.chat, `❀ Tu reporte ha sido enviado para revisión.`, m);

  } else if (command === 'responder') {
    if (!m.quoted || !reports[m.quoted.key.id]) {
      return conn.reply(m.chat, `✿ No se encontró el reporte para responder.`, m);
    }

    const response = args.join(' ');

    if (!response) {
      return conn.reply(m.chat, `✿ Por favor, proporciona una respuesta.`, m);
    }

    const report = reports[m.quoted.key.id];
    await conn.reply(report.user, `❀ Respuesta a tu reporte: ${response}`, null);

    await conn.sendMessage(idgroup, { text: `✿ Respuesta al reporte:\n\n${response}\n\nReporte original: ${report.contenido}\n\nRespondido por: @${m.sender.split('@')[0]}`, mentions: [m.sender] });

  }
}

handler.command = ['test', 'responder'];

export default handler;*/