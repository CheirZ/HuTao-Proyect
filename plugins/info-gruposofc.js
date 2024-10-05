let media = './src/Grupo.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    await conn.sendMessage(m.chat, { react: { text: '⚡️', key: m.key } })
let str =  `Hola, 
*➤ 𝙶𝚛𝚞𝚙𝚘𝚜 donde puedes encontrar el bot y hablar con amigos*
*1.-* https://chat.whatsapp.com/KxHaM2J0NWPDR4RU24OmFw
`
await conn.sendButton(m.chat, str, `★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★͟͞\n` + wm, media, [
['Menu Lista 💖', '/lista']], null, [
['*＊✿❀𝐇𝐮𝐓𝐚𝐨-𝐌𝐃❀✿＊*', `${md}`]], fkontak)}
                      
handler.command = ['grupos','linksk','gruposofc','gruposoficiales']
handler.register = false

export default handler