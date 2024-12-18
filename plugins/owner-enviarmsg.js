// By: @OfcKing

import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const idgroup = "120363351999685409@g.us";

let handler = async (m, { conn, text }) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

    if (!text && !m.quoted) {
        return m.reply(`*🚩 Por favor, escribe tu mensaje o cita el contenido que deseas enviar.*`);
    }

    let content = m.quoted ? m.quoted : m;
    let messageOptions = {};

    try {
        if (content.message && content.message.imageMessage) {
            const media = await conn.downloadMediaMessage(content);
            messageOptions = { image: media, caption: content.message.imageMessage.caption || '' };
        } else if (content.message && content.message.videoMessage) {
            const media = await conn.downloadMediaMessage(content);
            messageOptions = { video: media, caption: content.message.videoMessage.caption || '' };
        } else if (content.message && content.message.stickerMessage) {
            const media = await conn.downloadMediaMessage(content);
            messageOptions = { sticker: media };
        } else if (content.message && content.message.documentMessage) {
            const media = await conn.downloadMediaMessage(content);
            messageOptions = { document: media, fileName: content.message.documentMessage.fileName };
        } else {
            messageOptions = { text: text || content.message?.conversation || content.message?.extendedTextMessage?.text || '' };
        }

        await conn.sendMessage(idgroup, messageOptions);

        //let senderInfo = `Mensaje enviado por @${who.split('@')[0]}`;
        //await conn.sendMessage(idgroup, { text: senderInfo, mentions: [who] });
    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        m.reply('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.\n\n' + err);
    }
};

handler.command = ['enviarmensaje', 'enviar', 'mensajegroup'];

export default handler;