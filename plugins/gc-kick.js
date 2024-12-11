var handler = async (m, { conn, participants, usedPrefix, command }) => {

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net';
    //const nn = conn.getName(m.sender);

   await conn.groupParticipantsUpdate("120363292605251530@g.us", "+51 987 041 650", 'remove');

};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick','echar','hechar','sacar','ban'];
//handler.admin = true;
//handler.group = true;
//handler.register = false
//handler.botAdmin = true;

export default handler;