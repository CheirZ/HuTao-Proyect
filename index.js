process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
// import './plugins/_allfake.js'
import { setupMaster, fork } from 'cluster'
import { startSub } from './lib/subs.js';
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs';
import { spawn, execSync } from 'child_process'
import lodash from 'lodash'
// import { startSubBots } from './plugins/socket-serbot.js';
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import boxen from 'boxen'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import path, { join, dirname } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, Browsers } = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
import qrcode from 'qrcode-terminal'
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

//const wa = dirname(fileURLToPath(import.meta.url))
//let require = createRequire(wa)
let { say } = cfonts

console.log(chalk.magentaBright('\nIniciando...'))

say('HuTao', {
  font: 'simple',
  align: 'left',
  gradient: ['green', 'white']
})
say('Made With CheirZ', {
  font: 'console',
  align: 'center',
  colors: ['cyan', 'magenta', 'yellow']
})

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true))
}; global.__require = function require(dir = import.meta.url) {
return createRequire(dir)
}

global.timestamp = {start: new Date}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[#!./]')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('datos.json'))
globalThis.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
}}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
users: {},
chats: {},
settings: {},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};
loadDatabase();

const {state, saveState, saveCreds} = await useMultiFileAuthState(global.sessions)
const msgRetryCounterMap = new Map()
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colors = chalk.bold.white
const qrOption = chalk.blueBright
const textOption = chalk.cyan
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${sessions}/creds.json`)) {
do {
        opcion = await question(colors("Seleccione una opción:\n") + qrOption("1. Con código QR\n") + textOption("2. Con código de texto de 8 dígitos\n--> "))

if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(`No se permiten numeros que no sean 1 o 2, tampoco letras o símbolos especiales.`))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${sessions}/creds.json`))
} 

    console.info = () => { }

/*const connectionOptions = {
    logger: pino({ level: "silent" }),
    printQRInTerminal: opcion == "1" ? true : methodCodeQR ? true : false,
    mobile: MethodMobile,
    browser: ["Ubuntu", "Edge", "110.0.1587.56"],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
        const jid = jidNormalizedUser(key.remoteJid)
        const msg = await store.loadMessage(jid, key.id)
        return msg?.message || ""
    },
    msgRetryCounterCache,
    msgRetryCounterMap,
    defaultQueryTimeoutMs: undefined,
    version,
}*/

const connectionOptions = {
logger: pino({ level: 'silent' }),
mobile: MethodMobile, 
browser: opcion == '1' ? Browsers.macOS("Desktop") : methodCodeQR ? Browsers.macOS("Desktop") : Browsers.macOS("Chrome"), 
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: false, 
generateHighQualityLinkPreview: true, 
syncFullHistory: false,
getMessage: async (key) => {
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id);
return msg?.message || "";
} catch (error) {
return "";
}},
msgRetryCounterCache: msgRetryCounterCache || new Map(),
userDevicesCache: userDevicesCache || new Map(),
//msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,
cachedGroupMetadata: (jid) => globalThis.conn.chats[jid] ?? {},
version: version, 
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
};

globalThis.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${sessions}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`[ ✿ ]  Por favor, Ingrese el número de WhatsApp.\n${chalk.bold.magentaBright('---> ')}`)))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta(`[ ✿ ]  Código:`)), chalk.bold.white(chalk.white(codeBot)))
}, 3000)
}}}
}

conn.isInit = false;
conn.well = false;
conn.logger.info(`[ ✿ ]  H E C H O\n`)

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', `${jadi}`], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
}, 30 * 1000);
}

//if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

async function resolveLidToRealJid(lidJid, groupJid, maxRetries = 3, retryDelay = 1000) {
    if (!lidJid?.endsWith("@lid") || !groupJid?.endsWith("@g.us")) return lidJid?.includes("@") ? lidJid : `${lidJid}@s.whatsapp.net`;
    const cached = lidCache.get(lidJid);
    if (cached) return cached;
    const lidToFind = lidJid.split("@")[0];
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            const metadata = await conn.groupMetadata(groupJid);
            if (!metadata?.participants) throw new Error("No se obtuvieron participantes");
            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue;
                    const contactDetails = await conn.onWhatsApp(participant.jid);
                    if (!contactDetails?.[0]?.lid) continue;
                    const possibleLid = contactDetails[0].lid.split("@")[0];
                    if (possibleLid === lidToFind) {
                        lidCache.set(lidJid, participant.jid);
                        return participant.jid;
                    }
                } catch (e) {
                    continue;
                }
            }
            lidCache.set(lidJid, lidJid);
            return lidJid;
        } catch (e) {
            attempts++;
            if (attempts >= maxRetries) {
                lidCache.set(lidJid, lidJid);
                return lidJid;
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    return lidJid;
}

async function extractAndProcessLids(text, groupJid) {
    if (!text) return text;
    const lidMatches = text.match(/\d+@lid/g) || [];
    let processedText = text;
    for (const lid of lidMatches) {
        try {
            const realJid = await resolveLidToRealJid(lid, groupJid);
            processedText = processedText.replace(new RegExp(lid, 'g'), realJid);
        } catch (e) {
            console.error(`Error procesando LID ${lid}:`, e);
        }
    }
    return processedText;
}

async function processLidsInMessage(message, groupJid) {
    if (!message || !message.key) return message;
    try {
        const messageCopy = {
            key: {...message.key},
            message: message.message ? {...message.message} : undefined,
            ...(message.quoted && {quoted: {...message.quoted}}),
            ...(message.mentionedJid && {mentionedJid: [...message.mentionedJid]})
        };
        const remoteJid = messageCopy.key.remoteJid || groupJid;
        if (messageCopy.key?.participant?.endsWith('@lid')) { messageCopy.key.participant = await resolveLidToRealJid(messageCopy.key.participant, remoteJid) }
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant?.endsWith('@lid')) { messageCopy.message.extendedTextMessage.contextInfo.participant = await resolveLidToRealJid( messageCopy.message.extendedTextMessage.contextInfo.participant, remoteJid ) }
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
            const mentionedJid = messageCopy.message.extendedTextMessage.contextInfo.mentionedJid;
            if (Array.isArray(mentionedJid)) {
                for (let i = 0; i < mentionedJid.length; i++) {
                    if (mentionedJid[i]?.endsWith('@lid')) {
                        mentionedJid[i] = await resolveLidToRealJid(mentionedJid[i], remoteJid);
                    }
                }
            }
        }
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.contextInfo?.mentionedJid) {
            const quotedMentionedJid = messageCopy.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.contextInfo.mentionedJid;
            if (Array.isArray(quotedMentionedJid)) {
                for (let i = 0; i < quotedMentionedJid.length; i++) {
                    if (quotedMentionedJid[i]?.endsWith('@lid')) {
                        quotedMentionedJid[i] = await resolveLidToRealJid(quotedMentionedJid[i], remoteJid);
                    }
                }
            }
        }
        if (messageCopy.message?.conversation) { messageCopy.message.conversation = await extractAndProcessLids(messageCopy.message.conversation, remoteJid) }
        if (messageCopy.message?.extendedTextMessage?.text) { messageCopy.message.extendedTextMessage.text = await extractAndProcessLids(messageCopy.message.extendedTextMessage.text, remoteJid) }
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant && !messageCopy.quoted) {
            const quotedSender = await resolveLidToRealJid( messageCopy.message.extendedTextMessage.contextInfo.participant, remoteJid );
            messageCopy.quoted = { sender: quotedSender, message: messageCopy.message.extendedTextMessage.contextInfo.quotedMessage };
        }
        return messageCopy;
    } catch (e) {
        console.error('Error en processLidsInMessage:', e);
        return message;
    }
}

async function connectionUpdate(update) {
const {connection, lastDisconnect, isNewLogin, qr} = update;
global.stopped = connection;
if (isNewLogin) conn.isInit = true;
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error);
global.timestamp.connect = new Date;
}
if (global.db.data == null) loadDatabase();

// Manejo del código QR
if (qr && (opcion == '1' || methodCodeQR)) {
console.log(chalk.green.bold(`[ ✿ ]  Escanea este código QR:`));
qrcode.generate(qr, {small: true});
}
        if (connection === "open") {
            const userJid = jidNormalizedUser(conn.user.id)
         try {
           await joinChannels(conn)
         } catch (e) {
           console.log("Error uniendo canales:", e.message)
         }
            const userName = conn.user.name || conn.user.verifiedName || "Desconocido"
            console.log(chalk.green.bold(`[ ✿ ]  Conectado a: ${userName}`))
        }
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(chalk.bold.cyanBright(`\n💦 Sin conexión, borra la session principal del Bot, y conectate nuevamente.`))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(chalk.bold.magentaBright(`\n🎋 Reconectando la conexión del Bot...`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(chalk.bold.blueBright(`\n🍁 Conexión perdida con el servidor, reconectando el Bot...`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(chalk.bold.yellowBright(`\n🐷 La conexión del Bot ha sido reemplazada.`))
} else if (reason === DisconnectReason.loggedOut) {
console.log(chalk.bold.redBright(`\n🍀 Sin conexión, borra la session principal del Bot, y conectate nuevamente.`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(chalk.bold.cyanBright(`\n🐞 Conectando el Bot con el servidor...`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.bold.yellowBright(`\n🦋 Conexión agotada, reconectando el Bot...`))
await globalThis.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
console.log(chalk.bold.redBright(`\n🎍 Conexión cerrada, conectese nuevamente.`))
}}
}
process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats
try {
globalThis.conn.ws.close()
} catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(connectionOptions, {chats: oldChats})
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.handler = handler.handler.bind(globalThis.conn)
conn.connectionUpdate = connectionUpdate.bind(globalThis.conn)
conn.credsUpdate = saveCreds.bind(globalThis.conn, true)

const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev)
if (currentDateTime >= messageDateTime) {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])

} else {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
}

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
};

setInterval(() => {
console.log('[ ✿ ]  Reiniciando...');
process.exit(0); 
}, 10800000) //3hs
//3600000

let rtU = join(__dirname, `./${jadi}`)

if (!existsSync(rtU)) {
mkdirSync(rtU, { recursive: true }) 
}

// <---• Iniciador de Sub-Bots •--->
 /* 
   Credits: 
      - https://github.com/DevAlexJs
      - https://stellarwa.xyz
      - https://api.stellarwa.xyz 
 */

  await startSub();

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
globalThis.plugins = {}
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
globalThis.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = global.__filename(join(pluginFolder, filename), true);
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
else {
conn.logger.warn(`deleted plugin - '${filename}'`)
return delete global.plugins[filename]
}} else conn.logger.info(`new plugin - '${filename}'`);
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
else {
try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}
}}
Object.freeze(global.reload)
watch(pluginFolder, globalThis.reload)
await global.reloadHandler()
async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false));
})]);
}));
const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
Object.freeze(global.support);
}

// Tmp
setInterval(async () => {
const tmpDir = join(__dirname, 'tmp')
try {
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
console.log(chalk.gray(`→ Archivos de la carpeta TMP eliminados`))
} catch {
console.log(chalk.gray(`→ Los archivos de la carpeta TMP no se pudieron eliminar`));
}}, 30 * 1000) 

// Sessions Subs
setInterval(async () => {
const directories = [`./${sessions}/`, `./${jadi}/`]
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
if (file !== 'creds.json') {
const filePath = path.join(dir, file);
unlinkSync(filePath, err => {
if (err) {
console.log(chalk.gray(`\n→ El archivo ${file} no se logró borrar.\n` + err))
} else {
console.log(chalk.gray(`\n→ ${file} fué eliminado correctamente.`))
} }) }
}) }) }) }, 10 * 60 * 1000)

_quickTest().catch(console.error)

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
if (number.startsWith('+521')) {
number = number.replace('+521', '+52');
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52');
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}

async function joinChannels(conn) {
try {
  for (const channelId of Object.values(global.channel)) {
    // Intentar diferentes métodos de suscripción según la versión
    if (typeof conn.subscribeNewsletterUpdates === 'function') {
      await conn.subscribeNewsletterUpdates(channelId).catch(() => {})
    } else if (typeof conn.newsletterFollow === 'function') {
      await conn.newsletterFollow(channelId).catch(() => {})
    } else {
      console.log("Métodos de suscripción a canales no disponibles en esta versión")
      break
    }
  }
} catch (e) {
  console.log("Error en joinChannels:", e.message)
}}