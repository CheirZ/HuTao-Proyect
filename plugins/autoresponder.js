import { sticker } from '../lib/sticker.js'
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
let handler = m => m

handler.all = async function (m, {conn}) {
let chat = global.db.data.chats[m.chat]

if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {
let stiker = await sticker(global.sickerque.getRandom(), false, global.packsticker, global.author)  
this.sendFile(m.chat, stiker, 'sticker.webp', null, m, false, { 
contextInfo: { externalAdReply: { title: '*＊✿❀𝐇𝐮𝐓𝐚𝐨-𝐌𝐃❀✿＊*', body: '𝐐𝐮𝐞 𝐲𝐨 𝐪𝐮𝐞!?', sourceUrl: md, thumbnail: logo2}}})}

return !0 }
export default handler