import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } from '@whiskeysockets/baileys';
import pino from 'pino';

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        version,
        syncFullHistory: true
    });

    sock.ev.on('creds.update', saveCreds);
    store.bind(sock.ev);

    sock.ev.on('messages.upsert', async (msg) => {
        const message = msg.messages[0];
        if (!message.message || message.key.fromMe) return;

        const text = message.message.conversation || message.message.extendedTextMessage?.text || '';
        const sender = message.key.remoteJid;

        if (text.startsWith('.')) { // Detectar comandos que comienzan con '.'
            await handleCommand(sock, message, text);
        }
    });

    return sock;
}

// Función para manejar los comandos
async function handleCommand(sock, message, text) {
    const usedPrefix = '!';
    const command = text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
    const from = message.key.remoteJid;

    // Verificar si el comando es válido
    const validCommand = (command, plugins) => {
        for (let plugin of Object.values(plugins)) {
            if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
                return true;
            }
        }
        return false;
    };

    if (validCommand(command, global.plugins)) {
        let chat = global.db.data.chats[from];
        let user = global.db.data.users[message.key.participant || message.key.remoteJid];
        if (chat.isBanned) return;
        if (!user.commands) {
            user.commands = 0;
        }
        user.commands += 1;

        // Notificación al usuario
        let chtxt = `
👤 *Usuario* » Incógnito
⭐️ *Comando utilizado* » ${command}

> Recuerda que si haces mucho spam de comando puedes ser baneado. 🍁💫
`.trim();

await conn.sendMessage(global.idchannel, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
body: '🥳 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚑𝚊 𝚞𝚜𝚊𝚍𝚘 𝚞𝚗 𝚌𝚘𝚖𝚊𝚗𝚍𝚘!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })

    } else {
        const comando = text.trim().split(' ')[0];
       // await sock.sendMessage(from, { text: `⚡︎ El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *#help*` }, { quoted: message });
    }
}

connectToWhatsApp().catch(err => console.log('Error:', err));