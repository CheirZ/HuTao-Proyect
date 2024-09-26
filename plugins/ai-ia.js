import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Tu nombre es HuTao y parece haber sido creado por Xi_miguelon. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, eres la 77.ª directora de la funeraria el caminó, te gusta hacer bromas a la gente y odias estar sentada sin hacer nada. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`
if (isQuotedImage) {
const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error('☢︎︎ Error: No image buffer available')
return conn.reply(m.chat, '☢︎︎ Error: No se pudo descargar la imagen.', m, fake)}
const content = '☢︎︎ ¿Qué se observa en la imagen?'
try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = '𖣘 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m, fake)
} catch (error) {
console.error('☢︎︎ Error al analizar la imagen:', error)
await conn.reply(m.chat, '☢︎︎ Error al analizar la imagen.', m, fake)}
} else {
if (!text) { return conn.reply(m.chat, `✵ *Ingrese su petición*\n☢︎︎ *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal)}
await m.react('💬')
try {
const query = text
const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.reply(m.chat, response, m, fake)
} catch (error) {
console.error('☢︎︎ Error al obtener la respuesta:', error)
await conn.reply(m.chat, 'Error: intenta más tarde.', m, fake)}}}

handler.help = ['chatgpt <texto>', 'ia <texto>']
handler.tags = ['ai']
handler.group = true;
handler.register = false

handler.command = ['ia', 'chatgpt', 'hutao']

export default handler

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
try {
const response = await axios.post('https://lumin-ai.xyz/', {
content: content,
imageBuffer: imageBuffer 
}, {
headers: {
'Content-Type': 'application/json' 
}})
return response.data
} catch (error) {
console.error('Error:', error)
throw error }}
// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://lumin-ai.xyz/", {
content: q,
user: username,
prompt: logic,
webSearchMode: false
})
return response.data.result
} catch (error) {
console.error('☢︎︎ Error al obtener:', error)
throw error }}

/*import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) return conn.reply(m.chat, `🍟 *Ingrese su petición*\n🚩 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal)  
try {
await m.react(rwait)
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/ia2?text=${text}`)
let res = await gpt.json()
await conn.reply(m.chat, res.gpt, m, rcanal)
await m.react(done)
} catch {
try {
//await m.react(done)
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/chatgpt?q=${text}`)
let res = await gpt.json()
await conn.reply(m.chat, res.data, m, rcanal)
await m.react(done) 
} catch{
}}}
handler.help = ['chatgpt <texto>', 'ia <texto>']
handler.tags = ['ai']
handler.register = true
handler.estrellas = false
handler.command = ['ia', 'chatgpt']

export default handler;*/
