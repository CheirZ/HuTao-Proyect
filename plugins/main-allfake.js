import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

let pp = '' 
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

global.creador = 'Wa.me/5218711426787'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/5218711426787'
global.namechannel = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.namechannel2 = ''
global.namegrupo = '✦͙͙͙*͙*❥⃝∗⁎.ʚ ʰᵘᵗᵃᵒ-ᵖʳᵒʸᵉᶜᵗ ɞ.⁎∗❥⃝**͙✦͙͙͙'
global.namecomu = '𝗖𝗼𝗺𝘂𝗻𝗶𝗱𝗮𝗱 𝝡𝝣𝗚𝗨𝗠𝗜𝗡'

global.canalIdH = ["120363371018732371@newsletter", "120363387958443019@newsletter", "120363420238618096@newsletter", "120363420992828502@newsletter", "120363419837575209@newsletter"]
global.canalNombreH = ["һᥙ𝗍ᥲ᥆ ⍴r᥆ᥡᥱᥴ𝗍 - ᥲ᥎іs᥆s ☄︎", "──͟͞꘩𓎇̶𝐿̸𝑒̤𝑔֟֯፝𝑒⃯𝑛̷̈𝑑̤𝑠͡𔗓𝐵̸͜𝑜𝑡͜ꤩꤨ𝑠ꦁ⃯㍰ꫂ", "⏤͟͟͞͞☆ Stellar Api - Reset ᰔᩚ", "₊· ͟͟͞͞꒰ ✩ 𝐒𝐭𝐞𝐥𝐥𝐚𝐫 𝐖𝐚𝐁𝐨𝐭 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⏤͟͟͞͞✿", "⏤͟͟͞͞☆  Night ⚡︎ Light - Team ✿"]
global.channelRD = await getRandomChannel()

global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

global.emoji = '🔥'
global.emoji2 = '💥'
global.emoji3 = '❤️‍🔥'
global.emoji4 = '🍭'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

global.wait =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waitt =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waittt =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waitttt = 'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';

var grupo = 'https://chat.whatsapp.com/KxHaM2J0NWPDR4RU24OmFw'  

global.redes = "https://github.com/CheirZ"

let category = "imagen"
const db = './src/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }

global.icono = [ 
"https://stellarwa.xyz/files/1752426834891.jpg",
"https://stellarwa.xyz/files/1752426824621.jpg",
"https://stellarwa.xyz/files/1752426820436.jpg"
].getRandom()

global.rcanal = {contextInfo: {forwardingScore: 2025, isForwarded: true, externalAdReply: {title: textbot, body: wm, sourceUrl: redes, thumbnailUrl: icono}}}
}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdH.length)
let id = canalIdH[randomIndex]
let name = canalNombreH[randomIndex]
return { id, name }
}         
