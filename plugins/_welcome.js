import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://ibb.co/WBYqRDd')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `*⭒─ׄ─ׅ─ׄ─⭒ Welcome User ⭒─ׄ─ׅ─ׄ─⭒*
    
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊ ‹‹ *Welcome* : *@${m.messageStubParameters[0].split`@`[0]}⁩*
┊•*⁀➷ °⭒⭒⭒ *【 ✯ ${groupMetadata.subject} ✰ 】*
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
    
await conn.sendMini(m.chat, packname, textbot,channel, estilo)
  }
  
  if (chat.welcome && m.messageStubType == 28) {
    let bye = `*⭒─ׄ─ׅ─ׄ─⭒ Bye User ⭒─ׄ─ׅ─ׄ─⭒*
    
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊ ‹‹ *Bye* : *@${m.messageStubParameters[0].split`@`[0]}⁩*
┊•*⁀➷ °⭒⭒⭒ *【 ✯ ${groupMetadata.subject} ✰ 】*
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
await conn.sendMini(m.chat, packname, textbot, channel, estilo)
  }
  
  if (chat.welcome && m.messageStubType == 32) {
    let kick = `*⭒─ׄ─ׅ─ׄ─⭒ Adios Put@ ⭒─ׄ─ׅ─ׄ─⭒*
    
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊ ‹‹ *Pendej@ fuera* : *@${m.messageStubParameters[0].split`@`[0]}⁩*
┊•*⁀➷ °⭒⭒⭒ *【 ✯ ${groupMetadata.subject} ✰ 】*
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩`;
await conn.sendMini(m.chat, packname, textbot, channel, estilo)
}}
