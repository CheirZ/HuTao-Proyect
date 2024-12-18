// By: @OfcKing  

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

const idgroup = "120363351999685409@g.us";

var handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
    if (!m.quoted && !text) return conn.reply(m.chat, `*🚩 Por favor, escribe tu mensaje o cita el contenido que deseas enviar.*`, m);

    try {
        let q = m.quoted ? m.quoted : m;
        let c = m.quoted ? await m.getQuotedObj() : m.msg;
        let msg = conn.cMod(idchannel, generateWAMessageFromContent(idchannel, {
            [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }
        }, { quoted: null, userJid: conn.user.id }), text || q.text, conn.user.jid);
        await conn.relayMessage(idchannel, msg.message, { messageId: msg.key.id });
    } catch {
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || '';
        let isMedia = /image|video|sticker|audio/.test(mime);
        let htextos = `${text ? text : ""}`;

        if (isMedia && quoted.mtype === 'imageMessage') {
            var mediax = await quoted.download?.();
            await conn.sendMessage(idchannel, { image: mediax, caption: htextos || null }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'videoMessage') {
            var mediax = await quoted.download?.();
            await conn.sendMessage(idchannel, { video: mediax, mimetype: 'video/mp4', caption: htextos || null }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'audioMessage') {
            var mediax = await quoted.download?.();
            await conn.sendMessage(idchannel, { audio: mediax, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'stickerMessage') {
            var mediax = await quoted.download?.();
            await conn.sendMessage(idchannel, { sticker: mediax }, { quoted: null });
        } else {
            await conn.relayMessage(idchannel, { extendedTextMessage: { text: `${htextos}\n` } }, {});
        }
    }

    let contentType = isMedia ? (quoted.mtype === 'imageMessage' ? 'una imagen' : quoted.mtype === 'videoMessage' ? 'un video' : quoted.mtype === 'audioMessage' ? 'un audio' : 'un sticker') : 'un texto';
    let senderInfo = `✨️ *HuTao-Proyect* ✨️

👤 Usuario: @${m.sender.split('@')[0]}
🎋 Tipo: ${contentType}`;
    await conn.sendMessage(idgroup, { text: senderInfo, mentions: [m.sender] });
};

handler.command = ['enviar'];

export default handler;