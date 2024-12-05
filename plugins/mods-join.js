import fs from 'fs';

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply('🪴 Por favor, proporciona un enlace de invitación de grupo.');

    let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply('❗️ Enlace de invitación no válido.');

    if (isOwner) {
        await conn groupAcceptInvite(code)
            .then(res => m.reply(`✓ Me he unido exitosamente al grupo.`))
            .catch(err => m.reply(`✗ Error al unirse al grupo: ${err.message}`));
    } else {
        let message = `💥 Invitación a un grupo:\n${text}\n\nPor: @${m.sender.split('@')[0]}`;
        await conn.sendMessage('573012482597' + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`⭐️ El enlace de invitación ha sido enviado al propietario para su aprobación.`);
    }
};

handler.help = ['join'];
handler.tags = ['group'];
handler.command = ['join'];

export default handler;