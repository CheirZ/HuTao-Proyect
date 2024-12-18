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

    await conn.sendMessage(idchannel, content.message, {
        contextInfo: {
            mentionedJid: [who]
        }
    });

    let senderInfo = `Mensaje enviado por @${who.split('@')[0]}`;
    await conn.sendMessage(idgroup, { text: senderInfo, mentions: [who] });
};

handler.command = ['enviarmensaje', 'hutao'];

export default handler;