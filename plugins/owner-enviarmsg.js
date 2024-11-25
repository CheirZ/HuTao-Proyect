// By: @elrebelde21

import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let suggestionQueue = {};
const idgroup = "120363351999685409@g.us";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  //  let time = global.db.data.users[m.sender].lastmiming + 600000;
  //  if (new Date - global.db.data.users[m.sender].lastmiming < 600000) return return m.reply(`🍄 Por favor espera ${msToTime(time - new Date())} antes de enviar otra solicitud.`);

    if (!text && !m.quoted) {
        return m.reply(`*🚩 Por favor, escribe tu solicitud.*\n\n> *🍄 Elige una categoría:*\n\na). Sugerencia 💡\nb). Propuesta 📝\nc). Publicidad 📢\nd). Opinión 💬\ne). Pregunta 🚀\nf). Eventos 🎉\ng). Frases ✨\n\n> 🌺 Ejemplo: ${usedPrefix + command} a Texto`);
    }

    let [categoryChoice, ...rest] = text.split(' ');
    let suggestionText = rest.join(' ');

    if (!suggestionText) {
        return m.reply(`🍄 Debes agregar un texto después de seleccionar la categoría.\nEjemplo: ${usedPrefix + command} a Mi solicitud es...`);
    }

    let categories = {
        'a': 'sugerencia',
        'b': 'propuesta',
        'c': 'publicidad',
        'd': 'opinión',
        'e': 'pregunta',
        'f': 'eventos',
        'g': 'frases'
    };

    let category = categories[categoryChoice];
    if (!category) {
        return m.reply('🍄 Opción inválida. Elige una categoría correcta: a, b, c o d.');
    }

    m.reply(`🍄 Tu Publicación ha sido enviada a los administradores para su revisión.`);

    let groupMetadata = await conn.groupMetadata(idgroup);
    let groupAdmins = groupMetadata.participants.filter(p => p.admin);

    if (!groupAdmins || groupAdmins.length === 0) {
        return;
    }

    let suggestionId = Math.floor(Math.random() * 901);
    suggestionQueue[suggestionId] = {
        suggestionText, category, sender: m.sender, senderName: m.pushName, pp, suggestionId
    };
    global.db.data.users[m.sender].suggetimme = new Date() * 1;

    let confirmMessage = `🍄 El usuario @${m.sender.split('@')[0]} ha enviado una solicitud!\n\n*${category.charAt(0).toUpperCase() + category.slice(1)}:* ${suggestionText || 'Sin texto'}\n\n_Escriba "si ${suggestionId}" para aceptar_\n_Escriba "no ${suggestionId}" para rechazar._\n\n> *🍁 ID de la publicación:* ${suggestionId}`;

 //  } else {
        await conn.sendMessage(idgroup, { text: confirmMessage, mentions: [m.sender] }, { quoted: m });
  //  }
};

handler.before = async (response) => {
    if (!response.text || !response.text.match(/^(si|no)\s*(\d+)?/i)) return;

    let groupMetadata = await conn.groupMetadata(idgroup);
    let groupAdmins = groupMetadata.participants.filter(p => p.admin);
    const isAdmin = groupAdmins.some(admin => admin.id === response.sender);
    if (!isAdmin) return;

    let matches = response.text.match(/^(si|no)\s*(\d+)?/i);
    let action = matches[1].toLowerCase();
    let suggestionId = matches[2];

    if (!suggestionId || !suggestionQueue[suggestionId]) {
        return;
    }

    const { suggestionText, category, sender, senderName, pp } = suggestionQueue[suggestionId];

    if (action === 'no') {
        await conn.sendMessage(idgroup, { react: { text: "❌", key: response.key } });
        await conn.reply(sender, `😿 Los administradores rechazaron tu solicitud.`, null, { mentions: [sender] });
        delete suggestionQueue[suggestionId];
        return;
    }

if (action === 'si') {
await conn.sendMessage(idgroup, { react: { text: "✅", key: response.key } });
let approvedText = `${suggestionText || '😿 Desconocido'}`;
let title, body;

switch (category) {
case 'sugerencia': 
title = `【 🔔 𝐍𝐔𝐄𝐕𝐀 𝐒𝐔𝐆𝐄𝐑𝐄𝐍𝐂𝐈𝐀 🔔 】`;
body = `🐢 𝙽𝚞𝚎𝚟𝚊 𝚜𝚞𝚐𝚎𝚛𝚎𝚗𝚌𝚒𝚊 𝚍𝚎 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘`;
break;
case 'eventos':
title = `【 ⭐️ 𝐍𝐔𝐄𝐕𝐎 𝐄𝐕𝐄𝐍𝐓𝐎 ⭐️ 】`;
body = `🍁 𝙽𝚞𝚎𝚟𝚊 𝚜𝚞𝚐𝚎𝚛𝚎𝚗𝚌𝚒𝚊 𝚍𝚎 𝚎𝚟𝚎𝚗𝚝𝚘`;
break;
case 'opinion':
title = `【 😃 𝐍𝐔𝐄𝐕𝐀 𝐎𝐏𝐈𝐍𝐈𝐎𝐍 😃 】`;
body = `🍭 𝙽𝚞𝚎𝚟𝚊 𝚘𝚙𝚒𝚗𝚒𝚘𝚗 𝚍𝚎 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘`;
break;
case 'propuesta':
title = `【 ✨️ 𝐍𝐔𝐄𝐕𝐀 𝐏𝐑𝐎𝐏𝐔𝐄𝐒𝐓𝐀 ✨️ 】`;
body = `🌺 𝚄𝚗𝚊 𝚗𝚞𝚎𝚟𝚊 𝚙𝚛𝚘𝚙𝚞𝚎𝚜𝚝𝚊 𝚍𝚎 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘`;
break;
case 'frases':
title = `【 ✍️ 𝐅𝐑𝐀𝐒𝐄 𝐂𝐎𝐌𝐏𝐀𝐑𝐓𝐈𝐃𝐀 ✍️ 】`;
body = `🌻 𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚑𝚊 𝚌𝚘𝚖𝚙𝚊𝚛𝚝𝚒𝚍𝚘 𝚞𝚗𝚊 𝚏𝚛𝚊𝚜𝚎, 𝚍𝚒𝚏𝚛𝚞𝚝𝚊`;
break;
case 'pregunta': 
title = `【 🪐 𝐏𝐑𝐄𝐆𝐔𝐍𝐓𝐀 🪐 】`;
body = `💡 𝙽𝚞𝚎𝚟𝚊 𝚙𝚛𝚎𝚐𝚞𝚗𝚝𝚊 𝚍𝚎 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘`;
break;
case 'publicidad': 
title = `【 🍄 𝐏𝐔𝐁𝐋𝐈𝐂𝐈𝐃𝐀𝐃 🍄 】`;
body = `☁️ 𝙽𝚞𝚎𝚟𝚊 𝚙𝚞𝚋𝚕𝚒𝚌𝚒𝚍𝚊𝚍 𝚍𝚎 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘`;
break;
}

let options = { contextInfo: { externalAdReply: {
title: title, body: body,
thumbnailUrl: pp, 
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}};

// } else {
await conn.sendMessage(idchannel, { text: approvedText, contextInfo: options.contextInfo }, { quoted: null });
// }

await conn.reply(sender, `🍄 Solicitud aceptada, canal:\nhttps://whatsapp.com/channel/0029Vawz6Y91SWsyLezeAb0f`);
delete suggestionQueue[suggestionId];
}};
handler.command = ['sug', 'sugerencia', 'enviarmensaje', 'solicitud', 'enviarsolicitud'];

export default handler;

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours > 0 ? `${hours} horas, ` : '';
    minutes = minutes > 0 ? `${minutes} minutos, ` : '';
    seconds = `${seconds} segundo(s)`;

    return `${hours}${minutes}`;
}