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
        let users = participants.map(u => conn.decodeJid(u.id));
        let q = m.quoted ? m.quoted : m;
        let c = m.quoted ? await m.getQuotedObj() : m.msg;
        let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {
            [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }
        }, { quoted: null, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users });
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch {
        let users = participants.map(u => conn.decodeJid(u.id));
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || '';
        let isMedia = /image|video|sticker|audio/.test(mime);
        let htextos = `${text ? text : "*Hola!!*"}`;

        if (isMedia && quoted.mtype === 'imageMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'videoMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'audioMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: null });
        } else if (isMedia && quoted.mtype === 'stickerMessage') {
            var mediax = await quoted.download?.();
            conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: null });
        } else {
            let more = String.fromCharCode(8206);
            let masss = more.repeat(850);
            await conn.relayMessage(m.chat, { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { mentionedJid: users } } } }, {});
        }
    }
};

handler.help = ['enviar'];
handler.tags = ['group'];
handler.command = ['enviar'];

handler.group = true;
handler.admin = true;

export default handler;