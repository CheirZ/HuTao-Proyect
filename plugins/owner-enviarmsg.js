// By: @OfcKing  

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

idgroup = global.idchannel
idgp = "120363351999685409@g.us"; 

const idgroup, idgp

var handler = async (m, { conn, text }) => {
    if (!m.quoted && !text) return conn.reply(m.chat, `🚩 Por favor, escribe tu mensaje o cita el contenido que deseas enviar.`, m);

    let messageType = 'un texto'; 
    let isMedia = false;
    let quoted, mime, mediax, htextos;

    try {
        quoted = m.quoted ? m.quoted : m;
        mime = (quoted.msg || quoted).mimetype || '';
        isMedia = /image|video|sticker|audio/.test(mime);
        htextos = `${text ? text : ""}`;

        if (isMedia && quoted.mtype === 'imageMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(idgroup, { image: mediax, caption: htextos || null }, { quoted: null });
            messageType = htextos ? 'una imagen con texto' : 'una imagen';
        } else if (isMedia && quoted.mtype === 'videoMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(idgroup, { video: mediax, caption: htextos || null }, { quoted: null });
            messageType = htextos ? 'un video con texto' : 'un video';
        } else if (isMedia && quoted.mtype === 'audioMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(idgroup, { audio: mediax, mimetype: 'audio/mp4', fileName: `hutao.mp3` }, { quoted: null });
            messageType = 'un audio';
        } else if (isMedia && quoted.mtype === 'stickerMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(idgroup, { sticker: mediax }, { quoted: null });
            messageType = 'un sticker';
        } else {
            await conn.relayMessage(idgroup, { extendedTextMessage: { text: `${htextos}\n` } }, {});
            messageType = 'un texto';
        }

        let senderInfo = `✨️ *HuTao-Proyect* ✨️\n\n👤 Usuario: @${m.sender.split('@')[0]}\n🎋 Tipo: ${messageType}`;
        await conn.sendMessage(idgp, { text: senderInfo, mentions: [m.sender] });
        
    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        m.reply('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.\n\n' + err);
    }
};

handler.help = ['enviar'];
handler.tags = ['main'];
handler.command = ['enviar', 'sug', 'solicitud', 'enviarcanal'];
handler.register = false;

export default handler;