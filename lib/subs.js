import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import qrcode from 'qrcode';
import chalk from "chalk";
import NodeCache from 'node-cache';
import { handler, callUpdate, participantsUpdate, groupsUpdate } from '../handler.js';

if (globalThis.conns instanceof Array) console.log()
else globalThis.conns = []

const cleanJid = (jid = "") => jid.replace(/:\d+/, "").split("@")[0];
const msgRetryCounterCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const userDevicesCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const groupCache = new NodeCache({ stdTTL: 1800, checkperiod: 600 });
let reintentos = {}; 

export async function startSubBot(m, conn, caption = '', isCode = false, phone = '', chatId = '', commandFlags = {}) {
const id = phone || (m?.sender || '').split('@')[0];
const sessionFolder = `./${jadi}/${id}`;
const senderId = m?.sender;
const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
const { version } = await fetchLatestBaileysVersion();

console.info = () => {} 
const sock = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: false,
browser: ['Windows', 'Chrome'],
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
markOnlineOnConnect: true,
generateHighQualityLinkPreview: true,
syncFullHistory: false,
getMessage: async () => "",
msgRetryCounterCache,
userDevicesCache,
cachedGroupMetadata: async (jid) => groupCache.get(jid),
version,
keepAliveIntervalMs: 55000,
maxIdleTimeMs: 60000
});

sock.ev.on('creds.update', saveCreds);
setupGroupEvents(sock);
sock.isInit = false
let isInit = true

sock.ev.on('connection.update', async ({ connection, lastDisconnect, isNewLogin, qr }) => {
if (isNewLogin) sock.isInit = false

if (connection === 'open') {
sock.isInit = true
sock.userId = cleanJid(sock.user?.id?.split("@")[0])
const ownerName = sock.authState.creds.me?.name || "-";
sock.uptime = Date.now();
reintentos[sock.userId] = 0;
if (globalThis.conns.find(c => c.userId === sock.userId)) return;
globalThis.conns.push(sock); 

if (m && conn && isCode && commandFlags[senderId]) {
conn.sendMessage(m.chat, { text: `*Conectado exitosamente con WhatsApp ✅*` }, { quoted: m });
delete commandFlags[senderId];
}
}

if (connection === 'close') {
const botId = sock.userId || id;

setTimeout(() => {
startSubBot(m, conn, caption, isCode, phone, chatId, {});
}, wait);
return;
}

if (qr && !isCode && m && conn && commandFlags[senderId]) {
try {
const qrBuffer = await qrcode.toBuffer(qr, { scale: 8 });
const msg = await conn.sendMessage(m.chat, { image: qrBuffer, caption: caption }, { quoted: m });
delete commandFlags[senderId];
setTimeout(() => conn.sendMessage(m.chat, { delete: msg.key }).catch(() => {}), 60000);
} catch (err) {
console.error("[QR Error]", err);
}}

if (qr && isCode && phone && conn && chatId && commandFlags[senderId]) {
try {
let codeGen = await sock.requestPairingCode(phone);
codeGen = codeGen.match(/.{1,4}/g)?.join("-") || codeGen;
const msg = await conn.sendMessage(chatId, { image: { url: 'https://files.catbox.moe/re5wkq.jpg' }, caption: caption }, { quoted: m });
const msgCode = await conn.sendMessage(chatId, { text: codeGen }, { quoted: m });
delete commandFlags[senderId];
setTimeout(async () => {
try {
await conn.sendMessage(chatId, { delete: msg.key });
await conn.sendMessage(chatId, { delete: msgCode.key });
//delete commandFlags[senderId];
} catch {}
}, 60000);
} catch (err) {
console.error("[Código Error]", err);
}}
});

process.on('uncaughtException', console.error);

sock.ev.on("messages.upsert", async ({ messages, type }) => {
if (type !== "notify") return;
for (const msg of messages) {
if (!msg.message) continue;
const start = Math.floor(sock.uptime / 1000);
if (msg.messageTimestamp < start || ((Date.now() / 1000) - msg.messageTimestamp) > 60) continue;
try {
//const { handler } = await import("./handler.js");
await handler(sock, msg);
} catch (err) {
console.error(err);
}}
});

function setupGroupEvents(sock) {
sock.ev.on("group-participants.update", async (update) => {
console.log(update)
try {
await participantsUpdate(sock, update);
} catch (err) {
console.error("[ ❌ ] SUB-BOT Error procesando group-participants.update:", err);
}});

sock.ev.on("groups.update", async (updates) => {
console.log(updates)
try {
for (const update of updates) {
await groupsUpdate(sock, update);
}} catch (err) {
console.error("[ ❌ ] SUB-BOT Error procesando groups.update:", err);
}});
}
