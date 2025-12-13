/*
 # ------------√ ×------------
    # Agradecimientos :: ZyxlJs
    # Agradecimientos :: AzamiJs
    # Agradecimientos :: GataDios

    - Recuerda dejar los creditos, no quites los creditos de los autores del código!
    - Puedes modificar esta base a tu gusto, recuerda dejar los creditos correspondiente!
 # ------------√ ×------------
*/

import "./settings.js"
import cfonts from 'cfonts'
import handler from './handler.js'
import events from './commands/events.js'
import {
  Browsers,
  makeWASocket,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  jidDecode,
  DisconnectReason,
} from "@whiskeysockets/baileys";

import pino from "pino";
import crypto from 'crypto';
import chalk from "chalk";
import fs from "fs";
import path from "path";
import readline from "readline";
import os from "os";
import qrcode from "qrcode-terminal";
import parsePhoneNumber from "awesome-phonenumber";
import { smsg } from "./lib/message.js";
import db from "./lib/system/database.js";
import { startSubBot } from './lib/subs.js';
import { exec, execSync } from "child_process";
import moment from 'moment-timezone';

const log = {
  info: (msg) => console.log(chalk.bgBlue.white.bold(`INFO`), chalk.white(msg)),
  success: (msg) =>
    console.log(chalk.bgGreen.white.bold(`SUCCESS`), chalk.greenBright(msg)),
  warn: (msg) =>
    console.log(
      chalk.bgYellowBright.blueBright.bold(`WARNING`),
      chalk.yellow(msg),
    ),
  warning: (msg) =>
    console.log(chalk.bgYellowBright.red.bold(`WARNING`), chalk.yellow(msg)),
  error: (msg) =>
    console.log(chalk.bgRed.white.bold(`ERROR`), chalk.redBright(msg)),
};

const print = (label, value) =>
  console.log(
    `${chalk.green.bold("║")} ${chalk.cyan.bold(label.padEnd(16))}${chalk.magenta.bold(":")} ${value}`,
  );
const pairingCode = process.argv.includes("--qr")
  ? false
  : process.argv.includes("--pairing-code") || global.pairing_code;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => {
  return new Promise((resolve) => {
    rl.question(text, (answer) => {
      resolve(answer.trim());
    });
  });
};
const usePairingCode = true;

const userInfoSyt = () => {
  try {
    return os.userInfo().username;
  } catch (e) {
    return process.env.USER || process.env.USERNAME || "desconocido";
  }
};

  const DIGITS = (s = "") => String(s).replace(/\D/g, "");

  function normalizePhoneForPairing(input) {
    let s = DIGITS(input);
    if (!s) return "";
    if (s.startsWith("0")) s = s.replace(/^0+/, "");
    if (s.length === 10 && s.startsWith("3")) {
      s = "57" + s;
    }
    if (s.startsWith("52") && !s.startsWith("521") && s.length >= 12) {
      s = "521" + s.slice(2);
    }
    if (s.startsWith("54") && !s.startsWith("549") && s.length >= 11) {
      s = "549" + s.slice(2);
    }
    return s;
  }

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

const BOT_TYPES = [
  { name: 'SubBot', folder: './Sessions/Subs', starter: startSubBot }
]

global.conns = global.conns || []
const reconnecting = new Set()

async function loadBots() {
  for (const { name, folder, starter } of BOT_TYPES) {
    if (!fs.existsSync(folder)) continue
    const botIds = fs.readdirSync(folder)
    for (const userId of botIds) {
      const sessionPath = path.join(folder, userId)
      const credsPath = path.join(sessionPath, 'creds.json')
      if (!fs.existsSync(credsPath)) continue
      if (global.conns.some((conn) => conn.userId === userId)) continue
      if (reconnecting.has(userId)) continue
      try {
        reconnecting.add(userId)
        await starter(null, null, 'Auto reconexión', false, userId, sessionPath)
      } catch (e) {
        // console.log(chalk.gray(`[ ✿  ]  Falló la carga de ${userId} (${name})`))
        reconnecting.delete(userId)
      }
      await new Promise((res) => setTimeout(res, 2500))
    }
  }
  setTimeout(loadBots, 60 * 1000)
}

(async () => {
  await loadBots()
})()

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const logger = pino({ level: "silent" })

  console.info = () => {}
  console.debug = () => {}
  const clientt = makeWASocket({
    version,
    logger,
    printQRInTerminal: false,
  //  browser: ['Windows', 'Chrome'],
    browser: Browsers.macOS('Chrome'),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    getMessage: async () => "",
    keepAliveIntervalMs: 45000,
    maxIdleTimeMs: 60000,
  })

  global.client = clientt;
  client.isInit = false
  client.ev.on("creds.update", saveCreds)

  if (!client.authState.creds.registered) {
      log.warn("Ingrese su número de WhatsApp\n")
       log.info("Ejemplo: 57301××××××")
        console.log(chalk.yellow('--->'))
        const fixed = await question("")
        const phoneNumber = normalizePhoneForPairing(fixed);
    try {
      log.info("Solicitando código de emparejamiento...")
      const pairing = await client.requestPairingCode(phoneNumber)
      log.success(
        `Código de emparejamiento: ${chalk.cyanBright(pairing)} (expira en 15s)`,
      )
    } catch (err) {
      log.error("Error al solicitar el código de emparejamiento:", err);
      exec("rm -rf ./Sessions/Owner/*")
      process.exit(1)
    }
  }

  client.sendText = (jid, text, quoted = "", options) =>
    client.sendMessage(jid, { text: text, ...options }, { quoted })

  client.ev.on("connection.update", async (update) => {
    const {
      qr,
      connection,
      lastDisconnect,
      isNewLogin,
      receivedPendingNotifications,
    } = update

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode || 0;
      if (reason === DisconnectReason.connectionLost) {
        log.warning(
          "Se perdió la conexión al servidor, intento reconectarme..",
        )
        startBot()
      } else if (reason === DisconnectReason.connectionClosed) {
        log.warning("Conexión cerrada, intentando reconectarse...")
        startBot()
      } else if (reason === DisconnectReason.restartRequired) {
        log.warning("Es necesario reiniciar..")
        startBot();
      } else if (reason === DisconnectReason.timedOut) {
        log.warning("Tiempo de conexión agotado, intentando reconectarse...")
        startBot()
      } else if (reason === DisconnectReason.badSession) {
        log.warning("Eliminar sesión y escanear nuevamente...")
        startBot()
      } else if (reason === DisconnectReason.connectionReplaced) {
        log.warning("Primero cierre la sesión actual...")
      } else if (reason === DisconnectReason.loggedOut) {
        log.warning("Escanee nuevamente y ejecute...")
        exec("rm -rf ./Sessions/Owner/*")
        process.exit(1)
      } else if (reason === DisconnectReason.forbidden) {
        log.error("Error de conexión, escanee nuevamente y ejecute...")
        exec("rm -rf ./Sessions/Owner/*")
        process.exit(1);
      } else if (reason === DisconnectReason.multideviceMismatch) {
        log.warning("Inicia nuevamente")
        exec("rm -rf ./Sessions/Owner/*")
        process.exit(0)
      } else {
        client.end(
          `Motivo de desconexión desconocido : ${reason}|${connection}`,
        )
      }
    }

    if (connection == "open") {
                  console.log(
        chalk.bold.greenBright(
          '\n✩ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦ 𝗢𝗡𝗟𝗜𝗡𝗘 ✦┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✩\n│\n│★ CONEXIÓN EXITOSA CON WHATSAPP 🌷\n│\n✩ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦ ✅  ✦┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ✩'
        )
      )
    }


    if (isNewLogin) {
      log.info("Nuevo dispositivo detectado")
    }

    if (receivedPendingNotifications == "true") {
      log.warn("Por favor espere aproximadamente 1 minuto...")
      client.ev.flush()
    }
  });

  let m
  client.ev.on("messages.upsert", async ({ messages }) => {
    try {
      m = messages[0]
      if (!m.message) return
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message
      if (m.key && m.key.remoteJid === "status@broadcast") return
      if (!client.public && !m.key.fromMe && messages.type === "notify") return
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return
      m = await smsg(client, m)
      handler(client, m, messages)
    } catch (err) {
      console.log(err)
    }
  })

  try {
  await events(client, m)
  } catch (err) {
   console.log(chalk.gray(`[ BOT  ]  → ${err}`))
  }

  client.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      )
    } else return jid
  }
}

(async () => {
    global.loadDatabase()
    console.log(chalk.gray('[ ✿  ]  Base de datos cargada correctamente.'))
  await startBot()
})()