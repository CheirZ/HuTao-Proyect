import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec).bind(cp)
export default {
  command: ['r'],
  isOwner: true,
  run: async (client, m, args, command, text) => {
  if (!global.db.data.settings[client.user.id.split(':')[0] + '@s.whatsapp.net']?.owner) return
    let o
    try {
      // await m.react('🕒')
      o = await exec(command.trimStart() + ' ' + text.trimEnd())
      // await m.react('✔️')
    } catch (e) {
      o = e
     // await m.react('✖️')
    } finally {
     const { stdout, stderr } = o
      if (stdout?.trim()) client.reply(m.chat, stdout, m)
      if (stderr?.trim()) client.reply(m.chat, stderr, m)
    }  
  }
}