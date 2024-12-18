// By: @OfcKing  

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

const idgroup = "120363351999685409@g.us";

var handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
    if (!m.quoted && !text) return conn.reply(m.chat, `🚩 Por favor, ingrese un texto`, m);

    try {
        let q = m.quoted ? m.quoted : m;
        let c = m.quoted ? await m.getQuotedObj() : m.msg;
        let msg = conn.cMod(idgroup, generateWAMessageFromContent(idgroup, {
            [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }
        }, { quoted: null, userJid: conn.user.id }), text || q.text, conn.user.jid);
        await conn.relayMessage(idgroup, msg.message, { messageId: msg.key.id });
    } catch {
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || '';
        let isMedia = /image|video|sticker|audio/.test(mime);
        let htextos = `${text ? text : ""}`;

        if (isMedia && quoted.mtype === 'imageMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(idgroup, { image: mediax, caption: htextos || null }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'videoMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(idgroup, { video: mediax, mimetype: 'video/mp4', caption: htextos || null }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'audioMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(idgroup, { audio: mediax, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'stickerMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(idgroup, { sticker: mediax }, { quoted: null });
        } else {
            await conn.relayMessage(idgroup, { extendedTextMessage: { text: `${htextos}\n` } }, {});
        }
    }

    let senderInfo = `Mensaje enviado por @${m.sender.split('@')[0]}`;
    await conn.sendMessage(idgroup, { text: senderInfo, mentions: [m.sender] });
};

handler.command = ['enviar'];

export default handler;