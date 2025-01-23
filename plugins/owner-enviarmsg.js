// By: @OfcKing  

let handler = async (m, { conn, command, args }) => {
  if (command === 'sughutao') {
    const categorias = ['publicidad', 'memes', 'audio', 'pregunta', 'mas'];
    const categoria = args[0].toLowerCase();

    if (!categorias.includes(categoria)) {
      return conn.reply(m.chat, `✿ Categoría inválida. Por favor elige entre: ${categorias.join(', ')}.`, m);
    }

    const sugerencia = args.slice(1).join(' ');
    if (!sugerencia) {
      return conn.reply(m.chat, `✿ Por favor, proporciona una sugerencia.`, m);
    }

    const ADMIN_GROUP_ID = "120363351999685409@g.us"; 
    const CHANNEL_ID = global.idchannel;  
    const senderName = await conn.getName(m.sender);

    let title, body;
    switch (categoria) {
      case 'sugerencia': case 'propuesta': case 'opinion': case 'feedback':
        title = `【 🔔 ¡Nueva ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}! 🔔 】`;
        body = `🌟 ¡Nueva ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} de un usuario! 🌟`;
        break;
      case 'error': case 'queja':
        title = `【 ⚠️ ¡Nueva queja o error! ⚠️ 】`;
        body = `🔧 ¡Nuevo reporte de error o queja de un usuario! 🔧`;
        break;
      case 'música': case 'eventos':
        title = `【 🎵 ¡Nuevo evento o música! 🎵 】`;
        body = `🎤 ¡Nueva sugerencia de música o evento de un usuario! 🎤`;
        break;
      case 'películas': case 'juegos':
        title = `【 🎬 ¡Nueva sugerencia de películas o juegos! 🎮 】`;
        body = `🎥 ¡Nuevo comentario sobre películas/juegos de un usuario! 🎮`;
        break;
      case 'humor':
        title = `【 😜 ¡Nueva broma o chiste compartido! 😂 】`;
        body = `🤣 ¡Nuevo comentario gracioso de un usuario! 🤣`;
        break;
      case 'frases':
        title = `【 ✍️ Nueva frase compartida! 】`;
        body = `Un usuario compartió una frase que te hará reflexionar. ¡Lee y disfruta!`;
        break;
      case 'tecnología': case 'diseño': case 'desarrollo de software':
        title = `【 💻 ¡Nueva sugerencia en tecnología o diseño! 💻 】`;
        body = `💡 ¡Nueva sugerencia de tecnología o diseño de un usuario! 💡`;
        break;
      default:
        title = `【 🔔 ¡Nuevo aporte! 🔔 】`;
        body = `🌟 ¡Nuevo aporte de un usuario! 🌟`;
        break;
    }

    const approvedText = `👤 *Usuario:* ${senderName || 'Anónimo'}\n📝 *${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:* ${sugerencia || 'Sin descripción'}`;

    await conn.sendMessage(ADMIN_GROUP_ID, { text: `${title}\n\n${body}\n\n${approvedText}` });
. globalThis.db.data.sugerencias[m.key.id] = {
      user: m.sender,
      categoria,
      sugerencia,
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
      await conn.reply(sug.user, `❀ Tu sugerencia ha sido aprobada. Gracias por tu aporte: ${sug.sugerencia}`, null);
      await conn.sendMessage(CHANNEL_ID, { text: `🌟 Nueva sugerencia aprobada de la categoría ${sug.categoria}:\n\n${sug.sugerencia}\n\nEnviada por: ${await conn.getName(sug.user)}` });
    } else {
      await conn.reply(sug.user, `❀ Tu sugerencia ha sido rechazada. Motivo: ${motivo}`, null);
    }

    sug.estado = decision;
    sug.motivo = motivo;
  }
}

handler.help = ['sughutao <categoría> <sugerencia>', 'si', 'no <motivo>'];
handler.tags = ['general'];
handler.command = ['sughutao', 'si', 'no'];
handler.admin = command === 'si' || command === 'no'; 
handler.botAdmin = false;

export default handler;