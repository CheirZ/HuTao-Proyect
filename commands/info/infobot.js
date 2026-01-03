import os from 'os';

function rTime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d === 1 ? " día, " : " días, ") : ""
  const hDisplay = h > 0 ? h + (h === 1 ? " hora, " : " horas, ") : ""
  const mDisplay = m > 0 ? m + (m === 1 ? " minuto, " : " minutos, ") : ""
  const sDisplay = s > 0 ? s + (s === 1 ? " segundo" : " segundos") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}

export default {
  command: ['infobot', 'infosocket', 'info'],
  category: 'info',
  run: async (client, m) => {
    const botId = client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botSettings = global.db.data.settings[botId] || {}

    const botname = botSettings.namebot || 'Ai Surus'
    const botname2 = botSettings.namebot2 || 'Surus'
    const monedas = botSettings.currency || 'BitCoins'
    const banner = botSettings.banner
    const prefijo = botSettings.prefijo
    const owner = botSettings.owner
    const canalId = botSettings.id
    const canalName = botSettings.nameid
    const link = botSettings.link
    const comando = botSettings.commandsejecut

    let desar = 'Oculto'
    if (owner && !isNaN(owner.replace(/@s\.whatsapp\.net$/, ''))) {
      const userData = global.db.data.users[owner]
      desar = userData?.genre || 'Oculto'
    }

    const platform = os.type()
    const now = new Date()
    const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    const nodeVersion = process.version
    const sistemaUptime = rTime(os.uptime())

    const uptime = process.uptime()
    const uptimeDate = new Date(colombianTime.getTime() - uptime * 1000)
    const formattedUptimeDate = uptimeDate.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/^./, m => m.toUpperCase())

    const isOficialBot = botId === global.client.user.id.split(':')[0] + "@s.whatsapp.net"
    const isPremiumBot = botSettings.botprem === true
    const isModBot = botSettings.botmod === true

    const botType = isOficialBot ? 'Owner' : isPremiumBot ? 'Premium' : isModBot ? 'Main' : 'Sub Bot'

    try {
    const message = `> 🪼  ˖⁩   ౼ Información :: *${botname2}*

ׅ  ׄ  🌵   ׅ り Nombre Largo :: *${botname}*
ׅ  ׄ  🌵   ׅ り Nombre Corto :: *${botname2}*
ׅ  ׄ  🌵   ׅ り 𝖬𝗈𝗇𝖾𝖽𝖺 :: *${monedas}*   
ׅ  ׄ  🌵   ׅ り 𝖯𝗋𝖾𝖿𝗂𝗃𝗈s :: *${prefijo}*
ׅ  ׄ  🌵   ׅ り 𝖢𝗆𝖽 𝖤𝗃𝖾𝖼 :: *${comando.toLocaleString()}*

𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾

ׅ  ׄ  🥤   ׅ り Tipo :: *${botType}*
ׅ  ׄ  🥤   ׅ り Developer :: ${owner ? (!isNaN(owner.replace(/@s\.whatsapp\.net$/, '')) ? `@${owner.split('@')[0]}` : owner) : "Oculto por privacidad"}
ׅ  ׄ  🥤   ׅ り Activo Desde :: *${formattedUptimeDate}*
ׅ  ׄ  🥤   ׅ り Plataforma :: *${platform}*
ׅ  ׄ  🥤   ׅ り NodeJS :: *${nodeVersion}*

𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾

> \`Enlace:\` ${link}`.trim()

    await client.sendContextInfoIndex(m.chat, message, {}, m, true, [owner])

    /*await client.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        mentionedJid: [...message.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
        externalAdReply: {
          renderLargerThumbnail: true,
          title: botname,
          body: `${botname2}, Built With 💛 By Stellar`,
          mediaType: 1,
          thumbnailUrl: banner,
         // thumbnail: banner,
         // sourceUrl: redes
        }
      }
    }, { quoted: m })*/
   } catch (e) {
     m.reply(msgglobal)
   }
  }
};