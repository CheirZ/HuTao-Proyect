import fs, { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '⚡ SYSTEM',
  'buscador': '🔍 SCANNER',
  'fun': '🎮 ARCADE',
  'rpg': '⚔️ COMBAT',
  'rg': '📝 ACCESS',
  'xp': '💫 MATRIX',
  'sticker': '🎨 GRAFICOS',
  'anime': '🌸 VIRTUAL',
  'database': '💾 DATABASE',
  'fix': '🔧 DEBUG',
  'grupo': '👥 NETWORK',
  'nable': '⚙️ CONFIG', 
  'descargas': '📦 DOWNLOADS',
  'youtube': '📺 STREAM',
  'tools': '🛠️ UTILITIES',
  'info': 'ℹ️ STATUS',
  'nsfw': '🔞 RESTRICTED', 
  'owner': '👑 ADMIN', 
  'mods': '🛡️ SECURITY',
  'audio': '🎵 AUDIO', 
  'ai': '🧠 NEURAL NET',
  'transformador': '🔄 CONVERT',
}

const androidMenu = {
  before: `
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█                    █
█   🤖 ANDROID MODE   █  
█   ⚡ HUTAO CYBER ⚡   █
█                    █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

▸ USER: *%name*
▸ %greeting

┌─[ ⚡ SYSTEM STATUS ]─┐
│ ADMIN: CheirZ
│ MODE: Android Optimized
│ VERSION: Multi-Device
│ UPTIME: %muptime
│ USERS: %totalreg Online
└─────────────────────────┘

┌─[ 👤 USER PROFILE ]─┐ 
│ ID: %name
│ EXP: %exp XP
│ LVL: %level
│ RANK: %role
└────────────────────┘

%readmore
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█  📋 COMMAND MATRIX  █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`.trimStart(),
  header: `
┌─[ %category ]─┐`,
  body: `│ ▸ %cmd`,
  footer: `└─────────────────────┘`,
  after: `
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█    🌐 ANDROID NET   █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

▸ Support Channel:
  https://whatsapp.com/channel/support

▸ Optimizado para Android
▸ Usa caracteres avanzados
▸ Máximo rendimiento

▸ Neural Network System
  Developed by CheirZ

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█  © HUTAO ANDROID    █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || androidMenu.before
    let header = conn.menu.header || androidMenu.header
    let body = conn.menu.body || androidMenu.body
    let footer = conn.menu.footer || androidMenu.footer
    let after = conn.menu.after || androidMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? ' 💎' : '')
                .replace(/%isPremium/g, menu.premium ? ' 👑' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, estrellas, name, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  // Reaccionar al mensaje
  await m.react('🤖') 

  // Enviar el menú Android
  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: text.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "🤖 HuTao Android System",
        body: "⚡ Optimizado para Android - Caracteres Avanzados",
        thumbnailUrl: pp,
        sourceUrl: global.channelURL || "https://github.com/CheirZ/HuTao-Proyect",
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  } catch (e) {
    // Menú de emergencia Android
    let androidEmergency = `
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█     ⚠️ ERROR ⚠️    █
█   ANDROID MODE     █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

▸ BASIC COMMANDS:
  /menu - Platform selector
  /ios - iPhone menu
  /help - Help system
  /info - System status

⚠️ ERROR: ${e.message}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
█  SYSTEM RECOVERY   █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    `
    
    conn.reply(m.chat, androidEmergency.trim(), m)
  }
}

handler.help = ['android', 'menuandroid']
handler.tags = ['main']
handler.command = ['android', 'menuandroid', 'droid'] 

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

var ase = new Date();
var hour = ase.getHours();
switch(hour){
  case 0: hour = 'NOCHE ANDROID 🌙'; break;
  case 1: hour = 'MADRUGADA 🤖'; break;
  case 2: hour = 'MADRUGADA 🦉'; break;
  case 3: hour = 'AMANECER ✨'; break;
  case 4: hour = 'AMANECER 💫'; break;
  case 5: hour = 'AMANECER 🌅'; break;
  case 6: hour = 'MAÑANA 🌄'; break;
  case 7: hour = 'MAÑANA 🌅'; break;
  case 8: hour = 'MAÑANA 💫'; break;
  case 9: hour = 'MAÑANA ✨'; break;
  case 10: hour = 'MAÑANA 🌞'; break;
  case 11: hour = 'MEDIODÍA 🌨'; break;
  case 12: hour = 'MEDIODÍA ❄️'; break;
  case 13: hour = 'TARDE 🌤'; break;
  case 14: hour = 'TARDE 🌇'; break;
  case 15: hour = 'TARDE 🥀'; break;
  case 16: hour = 'TARDE 🌹'; break;
  case 17: hour = 'TARDE 🌆'; break;
  case 18: hour = 'NOCHE 🌙'; break;
  case 19: hour = 'NOCHE 🌃'; break;
  case 20: hour = 'NOCHE 🌌'; break;
  case 21: hour = 'NOCHE 🌃'; break;
  case 22: hour = 'NOCHE 🌙'; break;
  case 23: hour = 'NOCHE 🌃'; break;
}
var greeting = hour;