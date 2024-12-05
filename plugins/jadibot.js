import fs from 'fs'
import ws from 'ws'
import path, { join } from 'path'

const path = './jadibots'; 

let handler = async (m, { conn }) => {
    let sesiones = {
        principales: [],
        premiums: [], 
        subs: [] 
    };

    let totalSessions = 0;
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);
        totalSessions = files.length;
        files.forEach(file => {
            if (file.startsWith('bot_principal')) {
                sesiones.principales.push(file.replace('.json', ''));
            } else if (file.startsWith('bot_premium')) {
                sesiones.premiums.push(file.replace('.json', ''));
            } else {
                sesiones.subs.push(file.replace('.json', ''));
            }
        });
    }

const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

const replyMessage = mensaje.length === 0 ? `` : mensaje;

const totalUsers = users.length;

    let mensaje = `
「✦」Lista de bots activos (*${totalSessions}*)

✐ Sesiones: ${totalSessions}
✧ Sockets: ${totalUsers || '0'}\n\n${replyMessage.trim()}`;

mensaje += users.map((v, index) => `• 「 ${index + 1} 」\n👤 Usuario: ${v.user.name || 'Sub-Bot'}\nWa.me/${v.user.jid.replace(/[^0-9]/g, '')}`).join('\n\n__________________________\n\n');

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['bots'];
handler.tags = ['info'];
handler.command = ['bots', 'listabots', 'subbots'];

export default handler;