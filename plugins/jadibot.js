import fs from 'fs'
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

    let mensaje = `
「✦」Lista de bots activos (*${totalSessions}*)

✐ Sesiones: ${totalSessions}

`;

    let bots = sesiones.principales.concat(sesiones.premiums, sesiones.subs);
    bots.forEach((bot, index) => {
        mensaje += `\n${index + 1}. ${bot}`;
    });

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['bots'];
handler.tags = ['info'];
handler.command = ['bots', 'listabots', 'subbots'];

export default handler;