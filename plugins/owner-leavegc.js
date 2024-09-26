let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
let chat = global.db.data.chats[m.chat]
chat.welcome = false
await conn.reply(id, `(つ .•́ _ʖ •̀.)つ 𝙰𝚍𝚒𝚘𝚜 𝚋𝚘𝚕𝚊 𝚍𝚎 𝚒𝚗𝚞𝚝𝚒𝚕𝚎𝚜 𝚖𝚎 𝚛𝚎𝚝𝚒𝚛𝚘 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘`) 
await conn.groupLeave(id)
try {  
chat.welcome = true
} catch (e) {
await m.reply(`${fg}`) 
return console.log(e)
}}
handler.command = ['salir','leavegc','salirdelgrupo','leave']
handler.group = true
handler.rowner = true
export default handler
