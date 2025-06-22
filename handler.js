import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {smsg} from './lib/simple.js';
import {format} from 'util';
import {fileURLToPath} from 'url';
import path, {join} from 'path';
import {unwatchFile, watchFile} from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import ws from 'ws';

/**
 * @type {import('@adiwajshing/baileys')}  
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || []
this.uptime = this.uptime || Date.now()
if (!chatUpdate)
return
    this.pushMessage(chatUpdate.messages).catch(console.error)
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m)
return;
if (global.db.data == null)
await global.loadDatabase()       
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.moras = false
try {
let user = global.db.data.users[m.sender]
//if (typeof user !== 'object')
if (typeof user !== 'object')
global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0
if (!('premium' in user)) user.premium = false
if (!('muto' in user)) user.muto = false
if (!isNumber(user.joincount)) user.joincount = 1
if (!isNumber(user.money)) user.money = 150
if (!isNumber(user.moras)) user.moras = 10
if (!('registered' in user)) user.registered = false

if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!('age' in user)) user.age = 0
//if (!isNumber(user.OTP)) user.OTP = ''
if (!isNumber(user.regTime)) user.regTime = -1
}

if (!isNumber(user.afk)) user.afk = -1
if (!('role' in user)) user.role = 'Novato'
if (!isNumber(user.bank)) user.bank = 0
if (!isNumber(user.coin)) user.coin = 0
if (!isNumber(user.diamond)) user.diamond = 3
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.lastadventure)) user.lastadventure = 0
if (!isNumber(user.lastcoins)) user.lastcoins = 0    
if (!isNumber(user.lastclaim)) user.lastclaim = 0
if (!isNumber(user.lastcode)) user.lastcode = 0
if (!isNumber(user.lastcofre)) user.lastcofre = 0
if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0    
if (!isNumber(user.lastduel)) user.lastduel = 0
if (!isNumber(user.crime)) user.crime = 0
if (!isNumber(user.lastmining)) user.lastmining = 0
if (!isNumber(user.lastpago)) user.lastpago = 0 
if (!isNumber(user.level)) user.level = 0
if (!isNumber(user.warn)) user.warn = 0
if (!user.premium) user.premiumTime = 0
} else
global.db.data.users[m.sender] = {
afk: -1,
afkReason: '',
name: m.name,
age: 0,
//OTP: '',
bank: 0,
banned: false,
BannedReason: '',
Banneduser: false,
coin: 0,
diamond: 3,
joincount: 1,
lastadventure: 0,
lastcoins: 0,
lastclaim: 0,
lastcode: 0,
lastcofre: 0,
lastdiamantes: 0,
lastduel: 0,
lastpago: 0,
lastrob: 0,
level: 0,
moras: 10,
money: 100,
muto: false,
premium: false,
premiumTime: 0,
registered: false,
regTime: -1,
rendang: 0, 
}
let akinator = global.db.data.users[m.sender].akinator
if (typeof akinator !== 'object')
global.db.data.users[m.sender].akinator = {}
if (akinator) {
if (!('sesi' in akinator)) akinator.sesi = false
if (!('server' in akinator)) akinator.server = null
if (!('frontaddr' in akinator)) akinator.frontaddr = null
if (!('session' in akinator)) akinator.session = null
if (!('signature' in akinator)) akinator.signature = null
if (!('question' in akinator)) akinator.question = null
if (!('progression' in akinator)) akinator.progression = null
if (!('step' in akinator)) akinator.step = null
if (!('soal' in akinator)) akinator.soal = null
} else
global.db.data.users[m.sender].akinator = {
sesi: false,
server: null,
frontaddr: null,
session: null,
signature: null,
question: null,
progression: null,
step: null, 
soal: null
}                   
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}

if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false         
if (!('welcome' in chat)) chat.welcome = true           
if (!('detect' in chat)) chat.detect = true               
if (!('sWelcome' in chat)) chat.sWelcome = ''          
if (!('sBye' in chat)) chat.sBye = ''                    
if (!('sPromote' in chat)) chat.sPromote = ''     
if (!('sAutoresponder' in chat)) chat.sAutoresponder = ''         
if (!('sDemote' in chat)) chat.sDemote = '' 
if (!('sCondition' in chat)) chat.sCondition = JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}])                   
if (!('nsfw' in chat)) chat.nsfw = false                   
if (!('autosticker' in chat)) chat.autosticker = false
if (!('autoresponder' in chat)) chat.autoresponder = false      
if (!('audios' in chat)) chat.audios = false               
if (!('antiBot' in chat)) chat.antiBot = false 
if (!('antiBot2' in chat)) chat.antiBot2 = false
if (!('antiver' in chat)) chat.antiver = false 
if (!('antiPorn' in chat)) chat.antiPorn = false     
if (!('antiLink' in chat)) chat.antiLink = true
if (!('antiLink2' in chat)) chat.antiLink2 = false
if (!('antiTiktok' in chat)) chat.antiTiktok = false
if (!('autoRechazar' in chat)) chat.autoRechazar = false
if (!('antiTelegram' in chat)) chat.antiTelegram = false
if (!('antiFacebook' in chat)) chat.antiFacebook = false
if (!('antiInstagram' in chat)) chat.antiInstagram = false
if (!('antiTwitter' in chat)) chat.antiTwitter = false
if (!('antiDiscord' in chat)) chat.antiDiscord = false
if (!('antiThreads' in chat)) chat.antiThreads = false
if (!('antiTwitch' in chat)) chat.antiTwitch = false
if (!('antifake' in chat)) chat.antifake = false  
if (!('viewonce' in chat)) chat.viewonce = false       
if (!('modoadmin' in chat)) chat.modoadmin = false    
if (!('antitoxic' in chat)) chat.antitoxic = false
if (!('simi' in chat)) chat.simi = false
if (!('antiTraba' in chat)) chat.antiTraba = false
if (!('autoAceptar' in chat)) chat.autoAceptar = false
if (!('autolevelup' in chat))  chat.autolevelup = true
if (!isNumber(chat.expired)) chat.expired = 0
} else
global.db.data.chats[m.chat] = {
isBanned: false,
welcome: true,
detect: true,
sWelcome: '',
sAutoresponder: '',
sBye: '',
sPromote: '',
sDemote: '', 
sCondition: JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}]), 
nsfw: false,
autosticker: false,
autoresponder: false,
audios: false,
antiBot: false,
antiBot2: false,
antiver: false,
antiPorn: false,
antiLink: true,
antiLink2: false,
antiTiktok: false,
autoRechazar: false,
antiTelegram: false,
antiFacebook: false,
antiInstagram: false,
antiTwitter: false,
antiDiscord: false,
antiThreads: false,
antiTwitch: false,
antifake: false,
viewonce: false,
modoadmin: false,
antitoxic: false, 
simi: false,
antiTraba: false,
autolevelup: true,
expired: 0,
autoaceptar: false,
}
let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = false
if (!('autoread' in settings)) settings.autoread = true
if (!('autoread2' in settings)) settings.autoread2 = false
if (!('restrict' in settings)) settings.restrict = false
if (!('antiPrivate' in settings)) settings.antiPrivate = false
if (!('antiCall' in settings)) settings.antiCall = true
if (!('antiSpam' in settings)) settings.antiSpam = false
if (!('modoia' in settings)) settings.modoia = false
if (!('jadibotmd' in settings)) settings.jadibotmd = false  
if (!('autobio' in settings)) settings.autobio = false
} else global.db.data.settings[this.user.jid] = {
self: false,
autoread: true,
autoread2: false,
restrict: true,
antiPrivate: false,
antiCall: true,
antiSpam: false,
modoia: false, 
jadibotmd: true,
autobio: false,
}} catch (e) {
console.error(e)
}

const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender)
//const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + detectwhat).includes(m.sender)
const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0
if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque, time = 1000 * 5
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
await delay(time)
}, time)
}

if (opts['nyimak']) return
if (!isROwner && opts['self']) return 
if (opts['pconly'] && m.chat.endsWith('g.us')) return
if (opts['gconly'] && !m.chat.endsWith('g.us')) return
if (opts['swonly'] && m.chat !== 'status@broadcast') return
if (typeof m.text !== 'string')
m.text = ''

if (m.isBaileys) {
return
}
m.exp += Math.ceil(Math.random() * 10)
let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
const numBott = (this.user.lid || '').replace(/:.*/, '') || false
const detectnumbot = m.sender.includes('@lid') ? `${numBott}@lid` : this.user.jid
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == detectnumbot) : {}) || {}
const isRAdmin = user?.admin == 'superadmin' || false
const isAdmin = isRAdmin || user?.admin == 'admin' || false //user admins? 
const isBotAdmin = bot?.admin || false //Detecta sin el bot es admin

const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
/*if (m.sender === this.user.jid) {
continue
}*/
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
// if (typeof e === 'string') continue
console.error(e)
}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
// global.dfail('restrict', m, this)
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? // RegExp Mode?
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ? // Array?
_prefix.map(p => {
let re = p instanceof RegExp ? // RegExp in Array?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ? // String?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') {
if (await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}
if (typeof plugin !== 'function')
continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail // When failed
let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
plugin.command.test(command) :
Array.isArray(plugin.command) ? // Array?
plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
cmd.test(command) :
cmd === command
) :
typeof plugin.command === 'string' ? // String?
plugin.command === command :
false

if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) return

if (!isAccept) {
continue
}
m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['mods-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
if (name != 'mods-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return 
if (m.text && user.banned && !isROwner) {
m.reply(`🚫 Está baneado(a), no puede usar los comandos de este bot!\n\n${user.bannedReason ? `\n💌 *Motivo:* 
${user.bannedReason}` : '💌 *Motivo:* Sin Especificar'}\n\n⚠️ *Si este bot es cuenta oficial y tiene evidencia que respalde que este mensaje es un error, puede exponer su caso en:*\n\n🤍 ${asistencia}`)        
return
}
}

let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mini = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { //número bot owner
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { 
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { 
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { 
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { 
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) {
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { 
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { 
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { 
fail('unreg', m, this)
continue
}

m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
if (xp > 2000)
m.reply('Exp limit') 
else               
if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
conn.reply(m.chat, `❮💰❯ 𝗡𝗼 𝘁𝗶𝗲𝗻𝗲𝘀 𝘀𝘂𝗳𝗶𝗰𝗶𝗲𝗻𝘁𝗲𝘀 𝗛𝘂𝘁𝗮𝗼𝗖𝗼𝗶𝗻𝘀 𝗽𝗮𝗿𝗮 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼.`, m, rcanal)       
continue     
}

m.exp += xp
if (!isPrems && plugin.moras && global.db.data.users[m.sender].moras < plugin.moras * 1) {
conn.reply(m.chat, `❮🪙❯ 𝗡𝗼 𝘁𝗶𝗲𝗻𝗲𝘀 𝘀𝘂𝗳𝗶𝗰𝗶𝗲𝗻𝘁𝗲𝘀 𝗠𝗼𝗿𝗮𝘀 𝗽𝗮𝗿𝗮 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼. 𝗣𝗮𝗿𝗮 𝗰𝗼𝗺𝗽𝗿𝗮𝗿 𝗺𝗮𝘀 𝗠𝗼𝗿𝗮𝘀, 𝘂𝘀𝗲 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼.\n\n• 𝗣𝗼𝗿 𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n\n*${usedPrefix}buyall*\n*${usedPrefix}buy*`, m, rcanal) 
continue
}


if (plugin.level > _user.level) {
conn.reply(m.chat, `❮📣❯ 𝗥𝗲𝗾𝘂𝗶𝗲𝗿𝗲 𝗲𝗹 𝗻𝗶𝘃𝗲𝗹: *${plugin.level}*\n\n• 𝗧𝘂 𝗻𝗶𝘃𝗲𝗹 𝗮𝗰𝘁𝘂𝗮𝗹 𝗲𝘀: *${_user.level}*\n\n• 𝗨𝘀𝗮 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝘀𝘂𝗯𝗶𝗿 𝗱𝗲 𝗻𝗶𝘃𝗲𝗹:\n*${usedPrefix}levelup*`, m, rcanal)       
continue
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
if (!isPrems)
m.moras = m.moras || plugin.moras || false
m.money = m.money || plugin.money || false
} catch (e) {
// Error occured
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), 'Admin')
if (e.name)
m.reply(text)
}} finally {

if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.moras)
conn.reply(m.chat, `Utilizaste *${+m.moras}* 🪙`, m)
}
if (m.money)
conn.reply(m.chat, `Utilizaste *${+m.money}* 💰`, m)
break
}}} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
//console.log(global.db.data.users[m.sender])
let user, stats = global.db.data.stats
if (m) { let utente = global.db.data.users[m.sender]
if (utente.muto == true) {
let bang = m.key.id
let cancellazzione = m.key.participant
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
}
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.moras -= m.moras * 1
user.money -= m.money * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) {
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
if (settingsREAD.autoread2) await this.readMessages([m.key])  
//await conn.sendPresenceUpdate('composing', m.chat);
//this.sendPresenceUpdate('recording', m.chat);
}}

global.dfail = (type, m, conn) => {
const msg = {
rowner: '[ ⚠︎ ] el comando es exclusivo para owners.',
    owner: '[ ⚠︎ ] el comando es exclusivo para owners.',
    mods: '[ ⚠︎ ] el comando solo lo pueden usar los moderadores.',
    premium: '[ ⚠︎ ] este comando es solo para usuarios premium.',
    group: '[ ⚠︎ ] este comando solo se puede usar en grupos.',
    private: '[ ⚠︎ ] este comando solo se puede usar en chat privado.',
    admin: '[ ⚠︎ ] este comando solo lo pueden usar los admins del grupo.',
    botAdmin: '[ ⚠︎ ] para usar este comando es necesario que yo sea admin.',
    unreg: '[⌨︎] 𝕙𝕠𝕝𝕒, 𝕓𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 𝕒 𝕝𝕒 𝕔𝕠𝕞𝕦𝕟𝕚𝕕𝕒𝕕 𝕕𝕖 𝕙𝕦𝕥𝕒𝕠-𝕞𝕕, 𝕝𝕖 𝕚𝕟𝕗𝕠𝕣𝕞𝕠 𝕢𝕦𝕖 𝕟𝕠 𝕤𝕖 𝕖𝕟𝕔𝕦𝕖𝕟𝕥𝕣𝕒 𝕣𝕖𝕘𝕚𝕤𝕥𝕣𝕒𝕕𝕠, 𝕡𝕒𝕣𝕒 𝕙𝕒𝕔𝕖𝕣𝕝𝕠 𝕦𝕤𝕖 𝕖𝕝 𝕔𝕠𝕞𝕒𝕟𝕕𝕠\n\n!Reg Name.22\n\n𝕒𝕢𝕦𝕚 𝕦𝕟 𝕖𝕛𝕖𝕞𝕡𝕝𝕠 = !reg huato.22\n\n\n 𝕖𝕤𝕡𝕖𝕣𝕠 𝕙𝕒𝕪𝕒𝕤 𝕖𝕟𝕥𝕖𝕟𝕕𝕚𝕕𝕠 𝕪 𝕒𝕤𝕚 𝕡𝕦𝕖𝕕𝕒𝕤 𝕦𝕤𝕒𝕣 𝕖𝕝 𝕓𝕠𝕥',
    restrict: '[ ⚠︎ ] This command is restricted/disables owner',
       restrict: '[ ⚠︎ ]\nᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᴱˢᵗᵃ ᴿᵉˢᵗʳⁱⁿᵍⁱᵈᵒ/ᴰᵉˢᵃᶜᵗⁱᵛᵃ ᴾᵒʳ ᴰᵉˢⁱᶜⁱᵒⁿ ᴰᵉˡ ᴾʳᵒᵖⁱᵉᵗᵃʳⁱᵒ/ᴬ (ᵒʷⁿᵉʳ) ᴰᵉˡ ᴮᵒᵗ'
}[type];
if (msg) return conn.reply(m.chat, msg, m, rcanal).then(_ => m.react('✖️'))}
const file = global.__filename(import.meta.url, true);

// NO TOCAR
watchFile(file, async () => {
unwatchFile(file);
console.log(chalk.green('Actualizando "handler.js"'));
//if (global.reloadHandler) console.log(await global.reloadHandler());

if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
for (const userr of users) {
userr.subreloadHandler(false)
}}});
