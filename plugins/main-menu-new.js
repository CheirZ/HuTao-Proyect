import fs, { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '📋 INFORMACIÓN',
  'buscador': '🔍 BUSCADORES',
  'fun': '🎮 JUEGOS',
  'jadibot': '🤖 SERBOT',
  'rpg': '⚔️ RPG',
  'rg': '📝 REGISTRO',
  'xp': '⭐ EXPERIENCIA',
  'sticker': '🎨 STICKERS',
  'anime': '🌸 ANIME',
  'database': '🗃️ DATABASE',
  'fix': '🔧 FIXMENSAJE',
  'grupo': '👥 GRUPOS',
  'nable': '⚙️ CONFIGURACIÓN', 
  'descargas': '📱 DESCARGAS',
  'youtube': '📺 YOUTUBE',
  'tools': '🛠️ HERRAMIENTAS',
  'info': 'ℹ️ INFORMACIÓN',
  'nsfw': '🔞 NSFW', 
  'owner': '👑 OWNER', 
  'mods': '🛡️ MODERADORES',
  'audio': '🎵 AUDIOS', 
  'ai': '🧠 INTELIGENCIA ARTIFICIAL',
  'transformador': '🔄 CONVERTIDORES',
}

const defaultMenu = {
  before: `┌─── ⋆⋅☆⋅⋆ ───┐
   🌟 *HuTao Bot* 🌟
└─── ⋆⋅☆⋅⋆ ───┘

¡Hola *%name*! %greeting

┏━━━━━━━━━━━━━━━━━━━┓
┃ 📊 *INFORMACIÓN DEL BOT*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 👤 *Creador:* CheirZ
┃ 🔧 *Modo:* Público
┃ 📱 *Versión:* Multi Device
┃ ⏰ *Activo:* %muptime
┃ 👥 *Usuarios:* %totalreg
┗━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━┓
┃ 👤 *INFORMACIÓN DEL USUARIO*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🆔 *Nombre:* %name
┃ ⭐ *Experiencia:* %exp XP
┃ 📈 *Nivel:* %level
┃ 🏆 *Rango:* %role
┗━━━━━━━━━━━━━━━━━━━┛

%readmore
┏━━━━━━━━━━━━━━━━━━━┓
┃      📋 *MENÚ DE COMANDOS*
┗━━━━━━━━━━━━━━━━━━━┛
`.trimStart(),
  header: `
┏━━『 %category 』━━┓`,
  body: `┃ • %cmd`,
  footer: `┗━━━━━━━━━━━━━━━━━━━┛`,
  after: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 💝 *¡Gracias por usar HuTao Bot!*
┃ 
┃ 📢 Para soporte únete a nuestro canal:
┃ https://whatsapp.com/channel/ejemplo
┃
┃ 💡 *Consejo:* Usa los comandos con
┃ responsabilidad y respeta a otros usuarios
┃
┃ 🎯 *Desarrollado con ❤️ por CheirZ*
┗━━━━━━━━━━━━━━━━━━━┛

> *HuTao Bot - Tu asistente virtual de confianza* ✨`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
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
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
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
greeting, level, estrellas, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  // Reaccionar al mensaje
  await m.react('✨') 

  // Enviar el menú como imagen con texto
  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: text.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "🌟 HuTao Bot - Menú Principal",
        body: "📱 Compatible con iPhone y Android",
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
┌─── ⋆⋅☆⋅⋆ ───┐
   🌟 *HuTao Bot* 🌟
└─── ⋆⋅☆⋅⋆ ───┘

¡Hola! Soy HuTao Bot 🤖

🎯 *Comandos principales:*
• /menu - Ver menú completo
• /help - Ayuda
• /info - Información del bot

📱 *Bot compatible con:*
✅ iPhone
✅ Android
✅ WhatsApp Web

💡 *Consejo:* Si ves caracteres extraños, 
actualiza tu WhatsApp a la última versión.

> Error: ${e.message}
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