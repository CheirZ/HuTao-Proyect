let handler = async (m, { conn, command }) => {

let grupos =  `Hola, 
*➤ 𝙶𝚛𝚞𝚙𝚘𝚜 donde puedes encontrar el bot y hablar con amigos*
> HuTao-Proyect 
*1.-* https://chat.whatsapp.com/KxHaM2J0NWPDR4RU24OmFw
> Furina-Proyect 
*2.-* https://chat.whatsapp.com/JD5t9cd2mzr5eLMLbSr2lF
`
await m.react('❤️‍🔥')
await conn.sendFile(m.chat, imagen1, "hutao.jpg", grupos, fkontak, null, rcanal)}
                      
handler.command = ['grupos','linksk','gruposofc','gruposoficiales']
handler.register = false

export default handler
