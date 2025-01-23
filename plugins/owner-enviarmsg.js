const idgroup = global.idchannel;
const idgp = "120363351999685409@g.us";

let handler = async (m, { conn, command, args }) => {
  if (command === 'sughutao') {
    const tipo = m.message.imageMessage ? 'imagen' : m.message.stickerMessage ? 'sticker' : 'texto';
    const contenido = tipo === 'texto' ? args.join(' ') : '';

    if (!contenido && tipo === 'texto') {
      return conn.reply(m.chat, `✿ Por favor, proporciona una sugerencia.`, m);
    }

    const senderName = await conn.getName(m.sender);
    const approvedText = `👤 *Usuario:* ${senderName || 'Anónimo'}\n📝 *Sugerencia:* ${contenido || 'Sin descripción'}`;

    await conn.sendMessage(idgroup, { text: `✿ Nueva sugerencia:\n\n${approvedText}\n\nUsuario: @${m.sender.split('@')[0]}`, mentions: [m.sender] });

    if (tipo !== 'texto') {
      await conn.forwardMessage(idgroup, m.message);
    }
    globalThis.db.data.sugerencias[m.key.id] = {
      user: m.sender,
      tipo,
      contenido: tipo === 'texto' ? contenido : null,
      media: tipo !== 'texto' ? m.message : null,
      estado: 'pendiente'
    };

    await conn.reply(m.chat, `❀ Tu sugerencia ha sido enviada para revisión.`, m);

  } else if (command === 'si' || command === 'no') {
    if (!m.quoted || !globalThis.db.data.sugerencias[m.quoted.key.id]) {
      return conn.reply(m.chat, `✿ No se encontró la sugerencia para revisar.`, m);
    }

    const sug = globalThis.db.data.sugerencias[m.quoted.key.id];
    const decision = command === 'si' ? 'aprobada' : 'rechazada';
    const motivo = command === 'no' ? args.join(' ') : 'sin motivo';

    if (decision === 'aprobada') {
      await conn.reply(sug.user, `❀ Tu sugerencia ha sido aprobada. Gracias por tu aporte: ${sug.contenido}`, null);
      if (sug.tipo === 'texto') {
        await conn.sendMessage(idgp, { text: `🌟 Nueva sugerencia aprobada:\n\n${sug.contenido}\n\nEnviada por: ${await conn.getName(sug.user)}` });
      } else {
        await conn.forwardMessage(idgp, sug.media);
        await conn.sendMessage(idgp, { text: `🌟 Nueva sugerencia aprobada:\n\nEnviada por: ${await conn.getName(sug.user)}` });
      }
    } else {
      await conn.reply(sug.user, `❀ Tu sugerencia ha sido rechazada. Motivo: ${motivo}`, null);
    }

    sug.estado = decision;
    sug.motivo = motivo;
  }
}

handler.command = ['sughutao', 'si', 'no'];

export default handler;