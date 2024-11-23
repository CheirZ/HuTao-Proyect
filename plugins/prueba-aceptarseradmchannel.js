

const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, proto } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');

// Inicializa el socket
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

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
        const channelMetadata = await sock.groupMetadata(sender);

        if (text.startsWith('!aceptarAdm') && channelMetadata) {
            await handleAcceptAdmin(sock, message, channelMetadata);
        }
    });

    return sock;
}

// Función para manejar la aceptación de administración
async function handleAcceptAdmin(sock, message, channelMetadata) {
    const participants = channelMetadata.participants;
    const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';

    const isAdmin = participants.some(p => p.id === botNumber && (p.admin === 'admin' || p.admin === 'superadmin'));
    if (isAdmin) {
        await sock.sendMessage(message.key.remoteJid, { text: '✅ Ya soy administrador del canal.' }, { quoted: message });
    } else {
        try {
            await sock.groupParticipantsUpdate(message.key.remoteJid, [botNumber], 'promote');
            await sock.sendMessage(message.key.remoteJid, { text: '✅ ¡Ahora soy administrador del canal!' }, { quoted: message });
        } catch (err) {
            console.error(err);
            await sock.sendMessage(message.key.remoteJid, { text: '❌ No se pudo aceptar la solicitud de administración.' }, { quoted: message });
        }
    }
}

handler.command = ['aceptar']

connectToWhatsApp().catch(err => console.log('Error:', err));