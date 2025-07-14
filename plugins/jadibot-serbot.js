const handler = async (m, { start: conn }) => {

    return start.sendMessage(m.chat, {
      text: '[ ✿ ] Cómando en mantenimiento....',
      quoted: m
    });
};

handler.help = ['qr', 'code'];
handler.tags = ['jadibot'];
handler.command = /^(qr|code)$/i;

export default handler;