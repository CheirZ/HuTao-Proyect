// By: @OfcKing

import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const idgroup = "120363351999685409@g.us";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

    if (!text && !m.quoted) {
        return m.reply(`*🚩 Por favor, escribe tu mensaje o cita el contenido que deseas enviar.*`);
    }

    let content = m.quoted ? m.quoted : m;
    let messageOptions = {};

    if (content.message.imageMessage) {
        messageOptions = { image: content.message.imageMessage, caption: content.message.imageMessage.caption || '' };
    } else if (content.message.videoMessage) {
        messageOptions = { video: content.message.videoMessage, caption: content.message.videoMessage.caption || '' };
    } else if (content.message.stickerMessage) {
        messageOptions = { sticker: content.message.stickerMessage };
    } else if (content.message.documentMessage) {
        messageOptions = { document: content.message.documentMessage, fileName: content.message.documentMessage.fileName };
    } else {
        messageOptions = { text: text || content.message.conversation || content.message.extendedTextMessage.text };
    }

    await conn.sendMessage(idgroup, messageOptions)
        .then(() => {
           // let senderInfo = `Mensaje enviado por @${who.split('@')[0]}`;
           // conn.sendMessage(idgroup, { text: senderInfo, mentions: [who] });
        })
        .catch(err => {
            console.error('Error al enviar el mensaje:', err);
            m.reply('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        });
};

handler.command = ['enviarmensaje', 'enviar', 'mensajegroup'];

export default handler;