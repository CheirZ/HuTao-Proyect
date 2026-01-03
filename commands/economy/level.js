import { resolveLidToRealJid } from "../../lib/utils.js"
export default {
  command: ['levelup', 'level', 'lvl'],
  category: 'profile',
  run: async (client, m, args) => {
    const db = global.db.data
    const chatId = m.chat
    const mentioned = m.mentionedJid
    const who2 = mentioned.length > 0 ? mentioned[0] : (m.quoted ? m.quoted.sender : m.sender)
    const who = await resolveLidToRealJid(who2, client, m.chat);
    const name = who
    const user = db.users[who]

    if (!user)
      return m.reply(`🫛 El usuario mencionado no está registrado en el bot.`)

    const users = Object.entries(db.users).map(([key, value]) => ({
      ...value,
      jid: key
    }))

    const sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0))
    const rank = sortedLevel.findIndex(u => u.jid === who) + 1

    const txt = `*🌊ꨩᰰ𑪐𑂺 ˳Usuario* ◢ ${db.users[who].name} ◤

𖹭  ׄ  ְ 🥦 Experiencia › *${user.exp?.toLocaleString() || 0}*
𖹭  ׄ  ְ 🪶 Nivel › *${user.level || 0}*
𖹭  ׄ  ְ 🌱 Puesto › *#${rank}*

𖹭  ׄ  ְ 🥗 Comandos totales › *${user.usedcommands?.toLocaleString() || 0}*`

          await client.sendContextInfoIndex(m.chat, txt, {}, m, true, {})
  }
};