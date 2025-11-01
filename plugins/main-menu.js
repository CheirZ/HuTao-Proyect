import fs, { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '⚡ SISTEMA',
  'buscador': '🔍 SCANNER',
  'fun': '🎮 ARCADE',
  'rpg': '⚔️ COMBAT',
  'rg': '📝 ACCESS',
  'xp': '💫 MATRIX',
  'sticker': '🎨 GRAFICOS',
  'anime': '🌸 VIRTUAL',
  'database': '� DATABASE',
  'fix': '🔧 DEBUG',
  'grupo': '👥 NETWORK',
  'nable': '⚙️ CONFIG', 
  'descargas': '� DOWNLOADS',
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

const universalMenu = `
┌────────────────────────┐
│  ⚡ H U T A O  C Y B E R ⚡  │
│     B O T  S Y S T E M     │
└────────────────────────┘

HOLA *%name*! %greeting

┌─ 📱 SELECCIONA TU PLATAFORMA ─┐
│                                │
│  🤖 ANDROID USERS:             │
│  ▸ /android - Menú Android     │
│                                │
│  🍎 iPHONE USERS:              │
│  ▸ /ios - Menú iPhone          │
│                                │
│  💻 TODOS:                     │
│  ▸ /help - Ayuda básica        │
│  ▸ /info - Info del bot        │
└────────────────────────────────┘

┌─ ⚡ SYSTEM STATUS ─┐
│ ADMIN: CheirZ
│ MODE: [PUBLIC]  
│ VERSION: Multi-Device
│ UPTIME: %muptime
│ USERS: %totalreg Online
└─────────────────────┘

┌─ 👤 USER PROFILE ─┐
│ ID: %name
│ EXP: %exp XP
│ LVL: %level
│ RANK: %role
└──────────────────┘

┌────────────────────────┐
│  🎯 COMANDOS RÁPIDOS    │
└────────────────────────┘

▸ /play [canción] - Música
▸ /ytv [video] - YouTube  
▸ /s - Hacer sticker
▸ /ia [pregunta] - ChatGPT

┌────────────────────────┐
│     © HUTAO SYSTEM       │
└────────────────────────┘`

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
    
    // Menú universal simplificado
    let text = universalMenu
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
      greeting, level, estrellas, name, time, totalreg, rtotalreg, role
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

    // Reaccionar al mensaje
    await m.react('🎯') 

    // Enviar el menú selector de plataforma
    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: text.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "🎯 HuTao Platform Selector",
          body: "📱 Selecciona tu plataforma - Android o iPhone",
          thumbnailUrl: pp,
          sourceUrl: global.channelURL || "https://github.com/CheirZ/HuTao-Proyect",
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    // Menú de respaldo en caso de error
    let fallbackMenu = `
┌────────────────────────┐
│  ⚠️ E R R O R  M O D E ⚠️  │
└────────────────────────┘

SISTEMA EN MODO SEGURO

▸ SELECCIONA TU PLATAFORMA:
  /android - Menú Android
  /ios - Menú iPhone
  /help - Ayuda básica

⚠️ ERROR: ${e.message}

┌────────────────────────┐
│   REINICIANDO SISTEMA...  │
└────────────────────────┘
    `
    
    conn.reply(m.chat, fallbackMenu.trim(), m)
  }
}

handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenu'] 
handler.group = true

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
  case 0: hour = 'Buenas Noches 🌙'; break;
  case 1: hour = 'Buenas Noches 💤'; break;
  case 2: hour = 'Buenas Noches 🦉'; break;
  case 3: hour = 'Buenos Días ✨'; break;
  case 4: hour = 'Buenos Días 💫'; break;
  case 5: hour = 'Buenos Días 🌅'; break;
  case 6: hour = 'Buenos Días 🌄'; break;
  case 7: hour = 'Buenos Días 🌅'; break;
  case 8: hour = 'Buenos Días 💫'; break;
  case 9: hour = 'Buenos Días ✨'; break;
  case 10: hour = 'Buenos Días 🌞'; break;
  case 11: hour = 'Buenos Días 🌨'; break;
  case 12: hour = 'Buenos Días ❄️'; break;
  case 13: hour = 'Buenos Días 🌤'; break;
  case 14: hour = 'Buenas Tardes 🌇'; break;
  case 15: hour = 'Buenas Tardes 🥀'; break;
  case 16: hour = 'Buenas Tardes 🌹'; break;
  case 17: hour = 'Buenas Tardes 🌆'; break;
  case 18: hour = 'Buenas Noches 🌙'; break;
  case 19: hour = 'Buenas Noches 🌃'; break;
  case 20: hour = 'Buenas Noches 🌌'; break;
  case 21: hour = 'Buenas Noches 🌃'; break;
  case 22: hour = 'Buenas Noches 🌙'; break;
  case 23: hour = 'Buenas Noches 🌃'; break;
}
var greeting = hour;