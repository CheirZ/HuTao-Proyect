const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import fetch from "node-fetch"
// import { startSub } from "../lib/autoconexion.js"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = `[✿] *Vincula el Socket usando este código QR.*\n\n> • *Canal »* https://whatsapp.com/channel/0029Vb7Ji66KbYMTYLU9km3p\n> • *Api »* https://api.stellarwa.xyz`
let rtx2 = `[✿] *Vincula el Socket usando el código de 8 dígitos.*\n\n> • *Canal »* https://whatsapp.com/channel/0029Vb7Ji66KbYMTYLU9km3p\n> • *Api »* https://api.stellarwa.xyz`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sanJBOptions = {}
const retryMap = new Map()
let commandFlags = {}
if (globalThis.conns instanceof Array) console.log()
else globalThis.conns = []
let handler = async (m, { conn, args, usedPrefix, command, isModeration, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split(`@`)[0]}`  //conn.getName(who)
let pathSanJadiBot = path.join(`./${jadi}/`, id)
if (!fs.existsSync(pathSanJadiBot)){
fs.mkdirSync(pathSanJadiBot, { recursive: true })
}
sanJBOptions.pathSanJadiBot = pathSanJadiBot
sanJBOptions.m = m
sanJBOptions.conn = conn
sanJBOptions.args = args
sanJBOptions.usedPrefix = usedPrefix
sanJBOptions.command = command
sanJBOptions.fromCommand = true
sanJadiBot(sanJBOptions, text)
} 
handler.help = ['code', 'qr']
handler.tags = ['socket']
handler.command = ['code', 'qr']
export default handler 

export async function sanJadiBot(options, text) {
let { pathSanJadiBot, m, conn, args, usedPrefix, command } = options
if (command === 'code') {
command = 'qr'; 
args.unshift('code')}
const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false
let txtCode, codeBot, txtQR
if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathSanJadiBot, "creds.json")
if (!fs.existsSync(pathSanJadiBot)){
fs.mkdirSync(pathSanJadiBot, { recursive: true })}
try {
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `❀ *Use correctamente el comando »* ${usedPrefix + command} code`, m)
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathSanJadiBot)

const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: false,
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache, 
browser: mcode ? Browsers.macOS("Chrome") : Browsers.macOS("Desktop"),
version: version,
generateHighQualityLinkPreview: true
}

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true
commandFlags[m.sender] = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
if (m?.chat) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
} else {
return 
}
if (txtQR && txtQR.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
}
return
} 
if (qr && mcode) {
let fixTe = m.sender.split('@')[0]
let secret = await sock.requestPairingCode((fixTe))
secret = secret.match(/.{1,4}/g)?.join("-")
txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
codeBot = await m.reply(`[✿] Código: *${secret}*`)
}
if (txtCode && txtCode.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
}
if (codeBot && codeBot.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
}
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = globalThis.conns.indexOf(sock)                
if (i < 0) return 
delete globalThis.conns[i]
globalThis.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
if (reason === 428 || reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`Intentando reconectar a +${path.basename(pathSanJadiBot)}...`)}`)
await sleep(1000)
await creloadHandler(true).catch(console.error)
}
if (reason === 408) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`Intentando reconectar a +${path.basename(pathSanJadiBot)}.`)}`)
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`La coneción de +${path.basename(pathSanJadiBot)} ha sido reemplazada por otra sesión activa.`)}`)
} if (reason == 405 || reason == 401) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`No se encontró sesión activa de +${path.basename(pathSanJadiBot)}.`)}`)
fs.rmdirSync(pathSanJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`Session perdida de +${path.basename(pathSanJadiBot)}, borrando datos..`)}`)
return creloadHandler(true).catch(console.error)
fs.rmdirSync(pathSanJadiBot, { recursive: true })
}
if (reason === 515) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`Reinicio automatico para +${path.basename(pathSanJadiBot)}.`)}`)
// await startSub()
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(`\n${chalk.bold.whiteBright.bgRed('WARNING:')} ${chalk.bold.magentaBright(`Session cerrada para +${path.basename(pathSanJadiBot)}.`)}`)
fs.rmdirSync(pathSanJadiBot, { recursive: true })
}}
if (globalThis.db.data == null) loadDatabase()
if (connection == `open`) {
if (!globalThis.db.data?.users) loadDatabase()
const isCode = /^(qr|code)$/.test(command)
if (m && conn && isCode && commandFlags[m.sender]) {
await conn.sendMessage(m.chat, {text: `[✿] Listo, tu Sub-Bot ha quedado configurado.\n\n> *Visita:* https://api.stellarwa.xyz` }, { quoted: m })
delete commandFlags[m.sender]
}

let userName, userJid
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathSanJadiBot)}`
console.log(`\n${chalk.bold.whiteBright.bgGreen('INFO:')} ${chalk.bold.cyanBright(`+${userJid.split('@')[0]} Conectado.`)}`)
sock.isInit = true
globalThis.conns.push(sock)
}}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {      
//console.log(await creloadHandler(true).catch(console.error))
}
sock.ev.removeAllListeners()
let i = globalThis.conns.indexOf(sock)                
if (i < 0) return
delete globalThis.conns[i]
globalThis.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error('♡ Nuevo error: ', e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)
sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes > 0) ? minutes : '';
seconds = (seconds < 10 && minutes > 0) ? '0' + seconds : seconds;
if (minutes) {
return `${minutes} minuto${minutes > 1 ? 's' : ''}, ${seconds} segundo${seconds > 1 ? 's' : ''}`;
} else {
return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
}
}

const activeConnections = new Set()
const failedBots = new Map()

async function checkSubBots() {
    const subBotDir = path.resolve(`./${jadi}`)
    if (!fs.existsSync(subBotDir)) return

    const subBotFolders = fs.readdirSync(subBotDir).filter(folder => 
        fs.statSync(path.join(subBotDir, folder)).isDirectory()
    )

    for (const folder of subBotFolders) {
        const pathSanJadiBot = path.join(subBotDir, folder)
        const credsPath = path.join(pathSanJadiBot, "creds.json")
        if (!fs.existsSync(credsPath)) continue

        const isAlreadyConnected = globalThis.conns.find(conn =>
            conn.user?.jid?.includes(folder) || path.basename(pathSanJadiBot) === folder
        )

        if (isAlreadyConnected || activeConnections.has(folder)) continue

        const now = Date.now()
        const pauseInfo = failedBots.get(folder)
        if (pauseInfo && now < pauseInfo.resumeAt) {
            const mins = Math.ceil((pauseInfo.resumeAt - now) / 60000)
           // console.log(chalk.gray(`Sub-bot (+${folder}) está en pausa. Reintento en ${mins} min...`))
            continue
        }

        console.log(chalk.yellow(`Sub-bot (+${folder}) no conectado. Intentando activarlo...`))
        activeConnections.add(folder)

        try {
            await sanJadiBot({
                pathSanJadiBot,
                m: null,
                conn: globalThis.conn,
                args: [],
                usedPrefix: '#',
                command: 'jadibot',
                fromCommand: false
            })
            failedBots.delete(folder) //connection 
        } catch (e) {
            console.error(chalk.red(`Error al activar sub-bot (+${folder}):`), e)
            const retries = (failedBots.get(folder)?.retries || 0) + 1
            if (retries >= 5) {
                console.log(chalk.redBright(`Sub-bot (+${folder}) falló 5 veces. Se pausará 1 hora.`))
                failedBots.set(folder, { retries, resumeAt: Date.now() + 3600000 }) // 1 hora
            } else {
                failedBots.set(folder, { retries, resumeAt: Date.now() + 10000 }) // espera 10s entre intentos
            }
        } finally {
            setTimeout(() => activeConnections.delete(folder), 30000)
        }
    }
}

setInterval(checkSubBots, 60000); //1min