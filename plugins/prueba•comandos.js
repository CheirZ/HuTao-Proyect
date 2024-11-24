/*import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } from '@whiskeysockets/baileys';
import pino from 'pino';

// Definición del prefijo global
global.prefix = /[!#\/.]/;  // Puedes definir múltiples prefijos utilizando una expresión regular

export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }
  
  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');
  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    if (chat.isBanned) return;
    if (!user.commands) {
      user.commands = 0;
    }
    user.commands += 1;

    // Notificación al usuario sobre el uso del comando
    //  await m.reply(`Has utilizado el comando: *${command}*, ${m.pushName || m.sender}`);

    let chtxt = `
👤 *Usuario* » ${m.pushName || 'Incógnito'}
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
      }}}, { quoted: null });

  } else {
    const comando = m.text.trim().split(' ')[0];
   // await m.reply(`⚡︎ El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *#help*`);
  }
}

// Inicialización y configuración del bot de WhatsApp
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
    if (global.prefix.test(text)) { // Detectar comandos que comienzan con el prefijo global
      await before({ ...message, text, conn: sock });
    }
  });

  return sock;
}

//connectToWhatsApp().catch(err => console.log('Error:', err));*/