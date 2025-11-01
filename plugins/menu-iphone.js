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

const iphoneMenu = {
  before: `
========================
🍎 iPHONE MODE
⚡ HUTAO CYBER SYSTEM ⚡
========================

HOLA *%name*! %greeting

--- SYSTEM STATUS ---
ADMIN: CheirZ
MODE: iPhone Optimized
VERSION: Multi-Device
UPTIME: %muptime
USERS: %totalreg Online

--- USER PROFILE ---
ID: %name
EXP: %exp XP
LVL: %level
RANK: %role

%readmore
========================
📋 COMMAND LIST
========================
`.trimStart(),
  header: `
--- %category ---`,
  body: `▸ %cmd`,
  footer: `-------------------`,
  after: `
========================
🌐 SYSTEM INFO
========================

▸ Soporte técnico:
https://whatsapp.com/channel/ejemplo

▸ Usa responsablemente
▸ Respeta la comunidad

▸ Neural Networks System
▸ Developed by CheirZ

========================
© HUTAO CYBER SYSTEM
========================`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
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
    let before = conn.menu.before || iphoneMenu.before
    let header = conn.menu.header || iphoneMenu.header
    let body = conn.menu.body || iphoneMenu.body
    let footer = conn.menu.footer || iphoneMenu.footer
    let after = conn.menu.after || iphoneMenu.after
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
botofc: (conn.user.jid == global.conn.user.jid ? '🚩 ESTE ES EL BOT OFICIAL' : `🚩 SUB-BOT DE: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, estrellas, name, week, date, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  // Reaccionar al mensaje
  await m.react('🍎') 

  // Enviar el menú iOS
  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: text.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "🍎 HuTao iOS System",
        body: "📱 Optimizado para iPhone - Caracteres Seguros",
        thumbnailUrl: pp,
        sourceUrl: global.channelURL || "https://github.com/CheirZ/HuTao-Proyect",
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  } catch (e) {
    // Menú de emergencia iPhone
    let iphoneEmergency = `
========================
⚠️ EMERGENCY MODE ⚠️
========================

BASIC COMMANDS:
/menu - Main interface
/help - Help system
/info - System status

COMPATIBILITY:
✅ iPhone iOS
✅ Android
✅ WhatsApp Web

⚠️ Error: ${e.message}

========================
SYSTEM RECOVERY...
========================
    `
    
    conn.reply(m.chat, iphoneEmergency.trim(), m)
  }
}

handler.help = ['ios', 'menuios', 'iphone']
handler.tags = ['main']
handler.command = ['ios', 'menuios', 'iphone', 'menuiphone'] 

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
  case 0: hour = 'NOCHE iOS 🌙'; break;
  case 1: hour = 'MADRUGADA 🍎'; break;
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