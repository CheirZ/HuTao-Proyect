// By: @GataDios >> GataBot

let handler = async (m, { conn, text, usedPrefix, command, args }) => {

let toUser = `${m.sender.split("@")[0]}`
let aa = toUser + '@s.whatsapp.net'        
let template = (args[0] || '').toLowerCase() 
if (/comprar|prem1/i.test(command)) {
var tiempoPremium = 5 * text 
var tiempoDecretado = 5 * 1 
const gata = 15
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 300000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem2/i.test(command)) {
var tiempoPremium = 15 * text 
var tiempoDecretado = 15 * 1 
const gata = 25
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 900000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem3/i.test(command)) {
var tiempoPremium = 30 * text 
var tiempoDecretado = 30 * 1 
const gata = 35
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 1800000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem4/i.test(command)) {
var tiempoPremium = 1 * text 
var tiempoDecretado = 1 * 1 
const gata = 50
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 3600000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem5/i.test(command)) {
var tiempoPremium = 3 * text 
var tiempoDecretado = 3 * 1 
const gata = 65
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 10800000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem6/i.test(command)) {
var tiempoPremium = 7 * text 
var tiempoDecretado = 7 * 1 
const gata = 90
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 25200000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem7/i.test(command)) {
var tiempoPremium = 1 * text 
var tiempoDecretado = 1 * 1   
const gata = 100
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 86400000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem8/i.test(command)) {
var tiempoPremium = 3 * text  
var tiempoDecretado = 3 * 1 
const gata = 150
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.moras < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
user.moras -= gata * text

var tiempo = 259200000 * text 
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
const imgpre = [ 
'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg', 
'https://i.imgur.com/oUAGYc2.jpg',
'https://i.imgur.com/i0pccuo.jpg'];

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} dias\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/premium/i.test(command)) {
await conn.reply(m.chat, `🍄 \`\`\`SER PREMIUM\`\`\`\n\n♻️ Premium basico\n• ${usedPrefix}prem1 1\n> 15 Moras por 5 minutos de premium.\n\n💚 Premium verduzco\n• ${usedPrefix}prem3 1\n> 25 Moras por 15 minutos de premium\n\n⚜️ Premium torre de encanto\n• ${usedPrefix}prem2 1\n> 35 Moras por 20 minutos de premium\n\n🗑 Premium residuos eco\n• ${usedPrefix}prem4 1\n> 50 Moras por 1 hora de premium\n\n♦️ Premium brillante\n• ${usedPrefix}prem5 1\n> 65 Moras por 3 horas de premium\n\n🌀 Premium cripto\n• ${usedPrefix}prem6 1\n> 90 Moras por 7 horas de premium\n\n🔱 Premium gema\n• ${usedPrefix}prem7 1\n> 100 Moras por 1 dia de premium\n\n🪙 Premium oro\n• ${usedPrefix}prem8 1\n> 150 Moras por 3 dias de premium`, m, fake)        

}}
handler.help = ['serprem']
handler.tags = ['rpg']
handler.command = ['comprar', 'prem1', 'prem2', 'prem3', 'prem4', 'prem5', 'prem6', 'prem7', 'prem8', 'premium']

export default handler
// function _0xa0b1(_0x500045,_0x1576dd){var _0x3574ad=_0x3574();return _0xa0b1=function(_0xa0b103,_0x46bc3d){_0xa0b103=_0xa0b103-0x1a5;var _0x4776f3=_0x3574ad[_0xa0b103];return _0x4776f3;},_0xa0b1(_0x500045,_0x1576dd);}var _0x2b86e6=_0xa0b1;(function(_0x2bfa7c,_0x2200cd){var _0x309372=_0xa0b1,_0x230be1=_0x2bfa7c();while(!![]){try{var _0x3f4531=parseInt(_0x309372(0x1d0))/0x1+-parseInt(_0x309372(0x1b1))/0x2*(parseInt(_0x309372(0x1c9))/0x3)+-parseInt(_0x309372(0x1d8))/0x4*(parseInt(_0x309372(0x1c0))/0x5)+parseInt(_0x309372(0x1a6))/0x6+-parseInt(_0x309372(0x1d1))/0x7*(-parseInt(_0x309372(0x1d9))/0x8)+parseInt(_0x309372(0x1cd))/0x9+parseInt(_0x309372(0x1c4))/0xa;if(_0x3f4531===_0x2200cd)break;else _0x230be1['push'](_0x230be1['shift']());}catch(_0x358f71){_0x230be1['push'](_0x230be1['shift']());}}}(_0x3574,0x662ae));let handler=async(_0x40e06f,{conn:_0x501ecb,text:_0x314394,usedPrefix:_0x14800d,command:_0x2f4786,args:_0x1e66ec})=>{var _0x34d9b6=_0xa0b1;let _0x2b20f9=''+_0x40e06f[_0x34d9b6(0x1b4)][_0x34d9b6(0x1dc)]('@')[0x0],_0x21ec44=_0x2b20f9+_0x34d9b6(0x1b8),_0xba7f17=(_0x1e66ec[0x0]||'')[_0x34d9b6(0x1b0)]();if(/comprar|prem1/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x5*_0x314394,_0x55dfe5=0x5*0x1;const _0x8176a0=0xf;let _0x218f1b=global['db']['data'][_0x34d9b6(0x1b6)][_0x40e06f['sender']];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x8176a0+'\x20Moras\x20🪙\x0a\x0a👏\x20Ejemplo:\x20'+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x218f1b[_0x34d9b6(0x1ca)]<_0x8176a0)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x218f1b[_0x34d9b6(0x1ca)]-=_0x8176a0*_0x314394;var _0x4961cc=0x493e0*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x218f1b[_0x34d9b6(0x1ac)])_0x218f1b[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x218f1b[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x218f1b[_0x34d9b6(0x1c8)]=!![];const _0xf5c14a=['https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg','https://i.imgur.com/oUAGYc2.jpg',_0x34d9b6(0x1ce)];await _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1da)+_0x218f1b[_0x34d9b6(0x1c2)]+_0x34d9b6(0x1ba)+_0x8176a0*_0x314394+_0x34d9b6(0x1bf)+(_0x218f1b[_0x34d9b6(0x1ca)]+_0x8176a0)+_0x34d9b6(0x1cb)+_0x218f1b[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem2/i['test'](_0x2f4786)){var _0x248e1e=0xf*_0x314394,_0x55dfe5=0xf*0x1;const _0x2eb97e=0x19;let _0x3090ef=global['db']['data'][_0x34d9b6(0x1b6)][_0x40e06f['sender']];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x2eb97e+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],'🌹\x20Solo\x20se\x20aceptan\x20numeros.',_0x40e06f,fake);if(_0x3090ef[_0x34d9b6(0x1ca)]<_0x2eb97e)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x3090ef[_0x34d9b6(0x1ca)]-=_0x2eb97e*_0x314394;var _0x4961cc=0xdbba0*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x3090ef[_0x34d9b6(0x1ac)])_0x3090ef[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x3090ef[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x3090ef[_0x34d9b6(0x1c8)]=!![];const _0x52c5d2=[_0x34d9b6(0x1b3),_0x34d9b6(0x1a7),'https://i.imgur.com/i0pccuo.jpg'];await _0x501ecb['reply'](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1da)+_0x3090ef[_0x34d9b6(0x1c2)]+_0x34d9b6(0x1ba)+_0x2eb97e*_0x314394+_0x34d9b6(0x1bf)+(_0x3090ef[_0x34d9b6(0x1ca)]+_0x2eb97e)+_0x34d9b6(0x1cb)+_0x3090ef[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem3/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x1e*_0x314394,_0x55dfe5=0x1e*0x1;const _0x46368f=0x23;let _0x5c08f3=global['db'][_0x34d9b6(0x1a9)][_0x34d9b6(0x1b6)][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],_0x34d9b6(0x1af)+_0x55dfe5+'\x20Minutos\x0a'+_0x46368f+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x5c08f3[_0x34d9b6(0x1ca)]<_0x46368f)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x5c08f3[_0x34d9b6(0x1ca)]-=_0x46368f*_0x314394;var _0x4961cc=0x1b7740*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x5c08f3['premiumTime'])_0x5c08f3[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x5c08f3[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x5c08f3[_0x34d9b6(0x1c8)]=!![];const _0x39c951=[_0x34d9b6(0x1b3),_0x34d9b6(0x1a7),_0x34d9b6(0x1ce)];await _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1da)+_0x5c08f3[_0x34d9b6(0x1c2)]+_0x34d9b6(0x1ba)+_0x46368f*_0x314394+_0x34d9b6(0x1bf)+(_0x5c08f3[_0x34d9b6(0x1ca)]+_0x46368f)+_0x34d9b6(0x1cb)+_0x5c08f3[_0x34d9b6(0x1ca)]+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗶𝗲𝗺𝗽𝗼\x20╌\x0a┃⋗\x20'+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem4/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x1*_0x314394,_0x55dfe5=0x1*0x1;const _0x275e4b=0x32;let _0x95ad99=global['db'][_0x34d9b6(0x1a9)]['users'][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x275e4b+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x95ad99[_0x34d9b6(0x1ca)]<_0x275e4b)return _0x501ecb['reply'](_0x40e06f['chat'],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x95ad99['moras']-=_0x275e4b*_0x314394;var _0x4961cc=0x36ee80*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x95ad99[_0x34d9b6(0x1ac)])_0x95ad99[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x95ad99[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x95ad99[_0x34d9b6(0x1c8)]=!![];const _0x35f552=[_0x34d9b6(0x1b3),_0x34d9b6(0x1a7),_0x34d9b6(0x1ce)];await _0x501ecb['reply'](_0x40e06f[_0x34d9b6(0x1d7)],'╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20╌\x0a┃⋗\x20'+_0x95ad99['name']+_0x34d9b6(0x1ba)+_0x275e4b*_0x314394+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲𝗻𝗶𝗮𝘀\x20╌\x0a┃⋗\x20'+(_0x95ad99[_0x34d9b6(0x1ca)]+_0x275e4b)+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲\x20𝗾𝘂𝗲𝗱𝗮𝗻╌\x0a┃⋗\x20'+_0x95ad99[_0x34d9b6(0x1ca)]+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗶𝗲𝗺𝗽𝗼\x20╌\x0a┃⋗\x20'+_0x248e1e+'\x20dias\x0a╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\x0a\x0a>\x20⌜★⌟\x20\x20Nota:\x0a_Ahora\x20tiene\x20Premium\x20por\x20lo\x20tanto\x20no\x20va\x20tener\x20límites._',fkontak,{'mentions':[_0x21ec44]});}if(/prem5/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x3*_0x314394,_0x55dfe5=0x3*0x1;const _0x1d7755=0x41;let _0x246401=global['db'][_0x34d9b6(0x1a9)]['users'][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],'🍄\x20*Ingrese\x20el\x20tiempo\x20de\x20premium*\x0a\x0a🎟️\x201\x20=\x20'+_0x55dfe5+'\x20Minutos\x0a'+_0x1d7755+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x246401[_0x34d9b6(0x1ca)]<_0x1d7755)return _0x501ecb['reply'](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x246401[_0x34d9b6(0x1ca)]-=_0x1d7755*_0x314394;var _0x4961cc=0xa4cb80*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x246401[_0x34d9b6(0x1ac)])_0x246401[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x246401[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x246401[_0x34d9b6(0x1c8)]=!![];const _0x529678=[_0x34d9b6(0x1b3),_0x34d9b6(0x1a7),_0x34d9b6(0x1ce)];await _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1da)+_0x246401[_0x34d9b6(0x1c2)]+_0x34d9b6(0x1ba)+_0x1d7755*_0x314394+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲𝗻𝗶𝗮𝘀\x20╌\x0a┃⋗\x20'+(_0x246401[_0x34d9b6(0x1ca)]+_0x1d7755)+_0x34d9b6(0x1cb)+_0x246401[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem6/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x7*_0x314394,_0x55dfe5=0x7*0x1;const _0x230575=0x5a;let _0x131504=global['db']['data'][_0x34d9b6(0x1b6)][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x230575+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x131504['moras']<_0x230575)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1c6),_0x40e06f,rcanal);_0x131504[_0x34d9b6(0x1ca)]-=_0x230575*_0x314394;var _0x4961cc=0x1808580*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x131504['premiumTime'])_0x131504[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x131504['premiumTime']=_0x132c37+_0x4961cc;_0x131504[_0x34d9b6(0x1c8)]=!![];const _0x585852=['https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg',_0x34d9b6(0x1a7),_0x34d9b6(0x1ce)];await _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],_0x34d9b6(0x1da)+_0x131504['name']+'\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗣𝗮𝗴𝗼\x20╌\x0a┃⋗\x20'+_0x230575*_0x314394+_0x34d9b6(0x1bf)+(_0x131504[_0x34d9b6(0x1ca)]+_0x230575)+_0x34d9b6(0x1cb)+_0x131504[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem7/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x1*_0x314394,_0x55dfe5=0x1*0x1;const _0x43b83f=0x64;let _0x5021d4=global['db']['data'][_0x34d9b6(0x1b6)][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x43b83f+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x5021d4[_0x34d9b6(0x1ca)]<_0x43b83f)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],'🍄\x20No\x20tienes\x20suficiente\x20chocolates\x20para\x20adquirir\x20el\x20premium.',_0x40e06f,rcanal);_0x5021d4[_0x34d9b6(0x1ca)]-=_0x43b83f*_0x314394;var _0x4961cc=0x5265c00*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x5021d4[_0x34d9b6(0x1ac)])_0x5021d4[_0x34d9b6(0x1ac)]+=_0x4961cc;else _0x5021d4[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x5021d4[_0x34d9b6(0x1c8)]=!![];const _0x1de872=['https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg',_0x34d9b6(0x1a7),_0x34d9b6(0x1ce)];await _0x501ecb['reply'](_0x40e06f[_0x34d9b6(0x1d7)],'╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20╌\x0a┃⋗\x20'+_0x5021d4[_0x34d9b6(0x1c2)]+'\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗣𝗮𝗴𝗼\x20╌\x0a┃⋗\x20'+_0x43b83f*_0x314394+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲𝗻𝗶𝗮𝘀\x20╌\x0a┃⋗\x20'+(_0x5021d4[_0x34d9b6(0x1ca)]+_0x43b83f)+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲\x20𝗾𝘂𝗲𝗱𝗮𝗻╌\x0a┃⋗\x20'+_0x5021d4[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}if(/prem8/i[_0x34d9b6(0x1d3)](_0x2f4786)){var _0x248e1e=0x3*_0x314394,_0x55dfe5=0x3*0x1;const _0x60fecc=0x96;let _0x5efc6a=global['db'][_0x34d9b6(0x1a9)][_0x34d9b6(0x1b6)][_0x40e06f[_0x34d9b6(0x1b4)]];if(!_0x314394)return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1af)+_0x55dfe5+_0x34d9b6(0x1be)+_0x60fecc+_0x34d9b6(0x1d2)+(_0x14800d+_0x2f4786)+'\x201',_0x40e06f,rcanal);if(isNaN(_0x314394))return _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f[_0x34d9b6(0x1d7)],_0x34d9b6(0x1d4),_0x40e06f,fake);if(_0x5efc6a[_0x34d9b6(0x1ca)]<_0x60fecc)return _0x501ecb['reply'](_0x40e06f[_0x34d9b6(0x1d7)],'🍄\x20No\x20tienes\x20suficiente\x20chocolates\x20para\x20adquirir\x20el\x20premium.',_0x40e06f,rcanal);_0x5efc6a[_0x34d9b6(0x1ca)]-=_0x60fecc*_0x314394;var _0x4961cc=0xf731400*_0x314394,_0x132c37=new Date()*0x1;if(_0x132c37<_0x5efc6a[_0x34d9b6(0x1ac)])_0x5efc6a['premiumTime']+=_0x4961cc;else _0x5efc6a[_0x34d9b6(0x1ac)]=_0x132c37+_0x4961cc;_0x5efc6a[_0x34d9b6(0x1c8)]=!![];const _0x49ce8a=[_0x34d9b6(0x1b3),_0x34d9b6(0x1a7),'https://i.imgur.com/i0pccuo.jpg'];await _0x501ecb[_0x34d9b6(0x1b5)](_0x40e06f['chat'],'╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20╌\x0a┃⋗\x20'+_0x5efc6a[_0x34d9b6(0x1c2)]+_0x34d9b6(0x1ba)+_0x60fecc*_0x314394+_0x34d9b6(0x1bf)+(_0x5efc6a[_0x34d9b6(0x1ca)]+_0x60fecc)+'\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲\x20𝗾𝘂𝗲𝗱𝗮𝗻╌\x0a┃⋗\x20'+_0x5efc6a[_0x34d9b6(0x1ca)]+_0x34d9b6(0x1b2)+_0x248e1e+_0x34d9b6(0x1c7),fkontak,{'mentions':[_0x21ec44]});}/premium/i[_0x34d9b6(0x1d3)](_0x2f4786)&&await _0x501ecb['reply'](_0x40e06f['chat'],_0x34d9b6(0x1c1)+_0x14800d+'prem1\x201\x0a>\x2015\x20Moras\x20por\x205\x20minutos\x20de\x20premium.\x0a\x0a💚\x20Premium\x20verduzco\x0a•\x20'+_0x14800d+_0x34d9b6(0x1b7)+_0x14800d+_0x34d9b6(0x1d6)+_0x14800d+_0x34d9b6(0x1bc)+_0x14800d+_0x34d9b6(0x1a5)+_0x14800d+_0x34d9b6(0x1aa)+_0x14800d+_0x34d9b6(0x1ae)+_0x14800d+_0x34d9b6(0x1b9),_0x40e06f,fake);};function _0x3574(){var _0x58281e=['split','prem5\x201\x0a>\x2065\x20Moras\x20por\x203\x20horas\x20de\x20premium\x0a\x0a🌀\x20Premium\x20cripto\x0a•\x20','4574220TVEfQO','https://i.imgur.com/oUAGYc2.jpg','comprar','data','prem6\x201\x0a>\x2090\x20Moras\x20por\x207\x20horas\x20de\x20premium\x0a\x0a🔱\x20Premium\x20gema\x0a•\x20','prem2','premiumTime','prem8','prem7\x201\x0a>\x20100\x20Moras\x20por\x201\x20dia\x20de\x20premium\x0a\x0a🪙\x20Premium\x20oro\x0a•\x20','🍄\x20*Ingrese\x20el\x20tiempo\x20de\x20premium*\x0a\x0a🎟️\x201\x20=\x20','toLowerCase','1190SUnwup','\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗶𝗲𝗺𝗽𝗼\x20╌\x0a┃⋗\x20','https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg','sender','reply','users','prem3\x201\x0a>\x2025\x20Moras\x20por\x2015\x20minutos\x20de\x20premium\x0a\x0a⚜️\x20Premium\x20torre\x20de\x20encanto\x0a•\x20','@s.whatsapp.net','prem8\x201\x0a>\x20150\x20Moras\x20por\x203\x20dias\x20de\x20premium','\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗣𝗮𝗴𝗼\x20╌\x0a┃⋗\x20','prem4','prem4\x201\x0a>\x2050\x20Moras\x20por\x201\x20hora\x20de\x20premium\x0a\x0a♦️\x20Premium\x20brillante\x0a•\x20','tags','\x20Minutos\x0a','\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲𝗻𝗶𝗮𝘀\x20╌\x0a┃⋗\x20','500645icnRWg','🍄\x20```SER\x20PREMIUM```\x0a\x0a♻️\x20Premium\x20basico\x0a•\x20','name','help','1687360DzZgSX','prem7','🍄\x20No\x20tienes\x20suficiente\x20chocolates\x20para\x20adquirir\x20el\x20premium.','\x20dias\x0a╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\x0a\x0a>\x20⌜★⌟\x20\x20Nota:\x0a_Ahora\x20tiene\x20Premium\x20por\x20lo\x20tanto\x20no\x20va\x20tener\x20límites._','premium','2307lHPMuD','moras','\x20Moras\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗧𝗲\x20𝗾𝘂𝗲𝗱𝗮𝗻╌\x0a┃⋗\x20','command','211239bCbQDG','https://i.imgur.com/i0pccuo.jpg','prem1','286305QYqHhn','21ufyWnH','\x20Moras\x20🪙\x0a\x0a👏\x20Ejemplo:\x20','test','🌹\x20Solo\x20se\x20aceptan\x20numeros.','prem3','prem2\x201\x0a>\x2035\x20Moras\x20por\x2020\x20minutos\x20de\x20premium\x0a\x0a🗑\x20Premium\x20residuos\x20eco\x0a•\x20','chat','16eDuvtT','95112JRjPEL','╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\x0a┃\x20⌍⛧⌎\x20\x20╌\x20𝗨𝘀𝘂𝗮𝗿𝗶𝗼\x20╌\x0a┃⋗\x20','prem5'];_0x3574=function(){return _0x58281e;};return _0x3574();}handler[_0x2b86e6(0x1c3)]=['serprem'],handler[_0x2b86e6(0x1bd)]=['rpg'],handler[_0x2b86e6(0x1cc)]=[_0x2b86e6(0x1a8),_0x2b86e6(0x1cf),_0x2b86e6(0x1ab),_0x2b86e6(0x1d5),_0x2b86e6(0x1bb),_0x2b86e6(0x1db),'prem6',_0x2b86e6(0x1c5),_0x2b86e6(0x1ad),_0x2b86e6(0x1c8)];export default handler;