import fetch from 'node-fetch'

export default {
  command: ['instagram', 'ig'],
  category: 'downloader',
  run: async (client, m, args, command) => {

    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = global.db.data.settings[botId]?.botprem === false
    const isModBot = global.db.data.settings[botId]?.botmod === false
    
    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, `🌽 El comando *${command}* no está disponible en *Sub-Bots.*`, m)
    }

    const url = args[0]

    if (!url) {
      return m.reply('🍒 Ingrese un enlace de *Instagram*.')
    }

    if (!url.match(/instagram\.com\/(p|reel|share|tv)\//)) {
        m.react('❌')
      return m.reply('🌽 El enlace no parece *válido*. Asegúrate de que sea de *Instagram*')
    }

    try {
        m.react('⏳')
      const res = await fetch(`https://nexevo-api.vercel.app/download/instagram?url=${encodeURIComponent(url)}`)
      const json = await res.json()

      if (!json.status || !json.result?.dl) {
        m.rract('❌')
        return client.reply(m.chat, '🌽 No se pudo *obtener* el contenido', m)
      }

      const videoUrl = json.result.dl

      m.react('✅')
      const captionMsg = `ㅤ۟∩　ׅ　★ ໌　ׅ　🅘𝖦 🅓ownload　ׄᰙ`.trim()

      await client.sendMessage(
        m.chat,
        { video: { url: videoUrl }, caption: captionMsg, mimetype: 'video/mp4', fileName: 'ig.mp4' },
        { quoted: m }
      )

    } catch (e) {
      m.react('❌')
      await client.reply(m.chat, msgglobal, m)
    }
  }
}
