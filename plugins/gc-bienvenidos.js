import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let fakegif = {
        key: { 
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: m.chat } : {}) 
        },
        message: {
            videoMessage: { 
                title: 'Hutao-Md', 
                h: `Hmm`,
                seconds: '99999', 
                gifPlayback: true, 
                caption: '❣︎✿︎𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨㋛︎ఌ︎', 
                jpegThumbnail: logo5
            }
        }
    };

    let groupMetadata = await conn.groupMetadata(m.chat);
    let str = `𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨𝐬 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨\n${groupMetadata.subject}\n𝚕𝚎𝚎 𝚕𝚊𝚜 𝚛𝚎𝚐𝚕𝚊𝚜 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 𝚙𝚊𝚛𝚊 𝚎𝚟𝚒𝚝𝚊𝚛 𝚙𝚛𝚘𝚋𝚕𝚎𝚖𝚊𝚜, 𝚞𝚗𝚊 𝚟𝚎𝚣 𝚕𝚎𝚒𝚍𝚊𝚜 𝚍𝚒𝚜𝚏𝚛𝚞𝚝𝚊 𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 `.trim();

    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/c62071be335ec9e97a0cf.mp4';
        const videos = [pp];
        const video = videos[Math.floor(Math.random() * videos.length)];

        const mentionedJid = groupMetadata.participants.map(v => v.id);

        await conn.sendMessage(m.chat, {
            video: { url: video },
            caption: str,
            gifPlayback: true,
            mentions: mentionedJid
        }, { quoted: fakegif });
    }
};

handler.help = ['bienvenidos'];
handler.group = true;
handler.admin = true;
handler.tags = ['bienvenidos'];
handler.command = ['bienvenidos','nuevos'];

export default handler;