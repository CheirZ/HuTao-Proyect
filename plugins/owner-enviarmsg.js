// By: @OfcKing  

import { webp2png } from '../lib/webp2mp4.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';
import fs from 'fs'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const idgroup = "120363351999685409@g.us";

let handler = async (m, { conn, text }) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/33bed21a0eaa789852c30.jpg');

    if (!text && !m.quoted) {
        return m.reply(`*🚩 Por favor, escribe tu mensaje o cita el contenido que deseas enviar.*`);
    }

    let content = m.quoted ? m.quoted : m;
    let messageOptions = {};
    let mediaBuffer;
    let mime = (content.msg || content).mimetype || '';

    try {
        if (/image/.test(mime)) {
            mediaBuffer = await content.download();
            let imageUrl = await uploadImage(mediaBuffer);
            messageOptions = { image: { url: imageUrl }, caption: text || content.message?.imageMessage?.caption || '' };
        } else if (/video/.test(mime)) {
            mediaBuffer = await content.download();
            let videoUrl = await uploadFile(mediaBuffer);
            messageOptions = { video: { url: videoUrl }, caption: text || content.message?.videoMessage?.caption || '' };
        } else if (/webp/.test(mime)) {
            mediaBuffer = await content.download();
            let stickerBuffer = await webp2png(mediaBuffer);
            messageOptions = { sticker: stickerBuffer };
        } else {
            messageOptions = { text: text || content.message?.conversation || content.message?.extendedTextMessage?.text || '' };
        }

        await conn.sendMessage(idgroup, messageOptions);

      //  let senderInfo = `Mensaje enviado por @${who.split('@')[0]}`;
       // await conn.sendMessage(idgroup, { text: senderInfo, mentions: [who] });

    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        m.reply('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.\n\n' + err);
    }
};

handler.command = ['enviarmensaje', 'enviar', 'mensajegroup'];

export default handler;