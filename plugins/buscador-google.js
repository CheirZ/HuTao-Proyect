import {googleIt} from '@bochilteam/scraper'
import google from 'google-it'
import axios from 'axios'
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default;
const text = args.join` `
if (!text) return conn.reply(m.chat, '⌨︎ Ingresa lo que deseas buscar en Google.', m, rcanal)
conn.reply(m.chat, `𖠌 Buscando Su Información...`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const url = 'https://google.com/search?q=' + encodeURIComponent(text)
google({'query': text}).then(res => {
let teks = `ᴥ︎︎︎ *Resultado de* : ${text}\n\n`
for (let g of res) {
teks += `➪ *Titulo ∙* ${g.title}\n✍︎ *Info ∙* ${g.snippet}\n🔗 *Url ∙* ${g.link}\n\n`
}
conn.reply(m.chat, teks, m, rcanal)
})
}
handler.help = ['google <búsqueda>']
handler.tags = ['buscador']
handler.command = ['google']
handler.group = true;
handler.register = false
export default handler