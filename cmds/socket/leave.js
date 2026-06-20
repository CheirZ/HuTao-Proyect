import db from "#db"
export default {
  command: ['leave'],
  category: 'socket',
  run: async ({ msg, sock, args }) => {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const settings = await db.getSettings(botId)
    const owner = settings.owner
    const isSocketOwner = [
      botId,
      ...(global.mods || []).map((n) => n + '@s.whatsapp.net'),
    ].includes(msg.sender)

    if (!isSocketOwner && msg.sender !== owner)
      return msg.reply(mess.socket)

    const groupId = args[0] || msg.chat

    try {
      await sock.groupLeave(groupId)
    } catch (e) {
      return msg.reply(msgglobal)
    }
  },
};
