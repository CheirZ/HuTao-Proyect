import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

let pp = ''
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
//let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/b91fd8009901954bdbe4a.jpg')

//creador y otros
global.creador = 'Wa.me/5218711426787'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/5218711426787'
global.namechannel = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀/★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.namechannel2 = ''
global.namegrupo = '✦͙͙͙*͙*❥⃝∗⁎.ʚ ʰᵘᵗᵃᵒ-ᵖʳᵒʸᵉᶜᵗ ɞ.⁎∗❥⃝**͙✦͙͙͙'
global.namecomu = '𝗖𝗼𝗺𝘂𝗻𝗶𝗱𝗮𝗱 𝝡𝝣𝗚𝗨𝗠𝗜𝗡'
global.namecomu2 = ''
global.colab1 = ''
global.colab2 = ''
global.colab3 = ''

//Ids channel
global.canalIdH = ["120363371018732371@newsletter", "120363307382381547@newsletter", "120363263466636910@newsletter"]
global.canalNombreH = ["һᥙ𝗍ᥲ᥆ ⍴r᥆ᥡᥱᥴ𝗍 - ᥲ᥎іs᥆s ☄︎", "──͟͞꘩𓎇̶𝐿̸𝑒̤𝑔֟֯፝𝑒⃯𝑛̷̈𝑑̤𝑠͡𔗓𝐵̸͜𝑜𝑡͜ꤩꤨ𝑠ꦁ⃯㍰ꫂ", "ᥫ᭡ s𝗍ᥱᥣᥣᥲr ᥕᥲ ᑲ᥆𝗍 - ᥙ⍴ძᥲ𝗍ᥱ ❀"]
global.channelRD = await getRandomChannel()

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//Emojis determinado de HuTao
global.emoji = '🔥'
global.emoji2 = '💥'
global.emoji3 = '❤️‍🔥'
global.emoji4 = '🍭'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//mensaje en espera
global.wait =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waitt =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waittt =  'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';
global.waitttt = 'ꨄ︎ 🅱︎🅰︎🅹︎🅰︎🅽︎🅳︎🅾︎ 🆃︎🆄︎ 🅲︎🅾︎🅽︎🆃︎🅴︎🅽︎🅸︎🅳︎🅾︎\n🄴🅂🄿🄴🅁🄰 🅄🄽 🄼🄾🄼🄴🄽🅃🄾';

//Enlaces
var grupo = 'https://chat.whatsapp.com/KxHaM2J0NWPDR4RU24OmFw'
var canal = 'https://whatsapp.com/channel/0029VacDy0R6hENqnTKnG820'  
var canal2 = 'https://whatsapp.com/channel/0029Vawz6Y91SWsyLezeAb0f'
var git = 'https://github.com/CheirZ/HuTao-proyect.git' 
var youtube = 'https://youtube.com/@davidchian4957' 
var github = 'https://github.com/Cheirz/HuTao-Proyect' 
let correo = 'miguel.doce12000@outlook.com'

global.redes = [canal, canal2, git, youtube, github, correo].getRandom()

//Imagen
let category = "imagen"
const db = './media/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 3: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 4: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 5: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break; case 8: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 10: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 11: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 12: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 18: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 19: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;}
global.saludo = hour;

//tags
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

//Fakes
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

// global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${packname}`, orderTitle: 'Bang', thumbnail: icons, sellerJid: '0@s.whatsapp.net'}}}

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }

global.icono = [ 
'https://cdn.donmai.us/original/ac/b4/__hu_tao_and_boo_tao_genshin_impact_drawn_by_hari_shoku__acb4b09e5cdc3d5ea69de50472d08db6.png',
'https://cdn.donmai.us/original/6f/a1/__hu_tao_and_hu_tao_genshin_impact_drawn_by_xxx_da_n00b_xxx__6fa15f3e1e0ad43dbc6cf07816ea3f52.png',
'https://cdn.donmai.us/original/75/ec/__hu_tao_boo_tao_and_hu_tao_genshin_impact_drawn_by_xinzhizhu__75ec378366088bd10a88f0684703df80.jpg',
'https://cdn.donmai.us/original/2b/e8/__hu_tao_and_boo_tao_genshin_impact_drawn_by_miz_mizillustration__2be8efe2c6ee80472122f6ce33db9517.jpg',
'https://cdn.donmai.us/original/90/2b/__hu_tao_xiangling_hu_tao_and_xiangling_genshin_impact_drawn_by_arikuigames1105__902b1950beac1798f009c8c67e82b867.jpg',
].getRandom()

//global.rcanal = { contextInfo: { isForwarded: true, externalAdReply: { showAdAttribution: true, title: textbot, body: 'ఌ︎ 𝙃𝙪𝙏𝙖𝙤 𝙙𝙞𝙧𝙚𝙘𝙩𝙤𝙧𝙖 𝙣𝙪𝙢77', mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }}}; }

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { showAdAttribution: true, title: textbot, body: 'ఌ︎ 𝙃𝙪𝙏𝙖𝙤 𝙙𝙞𝙧𝙚𝙘𝙩𝙤𝙧𝙖 𝙣𝙪𝙢77', mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

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
