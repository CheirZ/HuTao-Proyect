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
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem2/i.test(command)) {
var tiempoPremium = 15 * text 
var tiempoDecretado = 15 * 1 
const gata = 35
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem3/i.test(command)) {
var tiempoPremium = 30 * text 
var tiempoDecretado = 30 * 1 
const gata = 25
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem4/i.test(command)) {
var tiempoPremium = 1 * text 
var tiempoDecretado = 1 * 1 
const gata = 50
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem5/i.test(command)) {
var tiempoPremium = 3 * text 
var tiempoDecretado = 3 * 1 
const gata = 40
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem6/i.test(command)) {
var tiempoPremium = 7 * text 
var tiempoDecretado = 7 * 1 
const gata = 70
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem7/i.test(command)) {
var tiempoPremium = 24 * text 
var tiempoDecretado = 24 * 1   
const gata = 65
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/prem8/i.test(command)) {
var tiempoPremium = 3 * text  
var tiempoDecretado = 3 * 1 
const gata = 80
let user = global.db.data.users[m.sender]

if (!text) return conn.reply(m.chat, `🍄 *Ingrese el tiempo de premium*\n\n🎟️ 1 = ${tiempoDecretado} Minutos\n${gata} Moras 🪙\n\n👏 Ejemplo: ${usedPrefix + command} 1`, m, rcanal)
if (isNaN(text)) return conn.reply(m.chat, `🌹 Solo se aceptan numeros.`, m, fake)
if (user.chocolates < gata) return conn.reply(m.chat, `🍄 No tienes suficiente chocolates para adquirir el premium.`, m, rcanal)
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

await conn.reply(m.chat, `╭┈︨︩︣︢─┉̱╍̄╼⪻⪼╾̄╍̱┅─︩︪︢︣┈╮\n┃ ⌍⛧⌎  ╌ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 ╌\n┃⋗ ${user.name}\n┃ ⌍⛧⌎  ╌ 𝗣𝗮𝗴𝗼 ╌\n┃⋗ ${gata * text} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲𝗻𝗶𝗮𝘀 ╌\n┃⋗ ${user.moras + gata} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗲 𝗾𝘂𝗲𝗱𝗮𝗻╌\n┃⋗ ${user.moras} Moras\n┃ ⌍⛧⌎  ╌ 𝗧𝗶𝗲𝗺𝗽𝗼 ╌\n┃⋗ ${tiempoPremium} min\n╰┈︨︩︣︢─┉̱╍̄╼⪻〄⪼╾̄╍̱┅─︩︪︢︣┈╯\n\n> ⌜★⌟  Nota:\n_Ahora tiene Premium por lo tanto no va tener límites._`, fkontak, { mentions: [aa,] })}

if (/premium/i.test(command)) {
await conn.reply(m.chat, `🌟 𝗖𝗢𝗠𝗣𝗥𝗔 𝗨𝗡 𝗧𝗜𝗣𝗢 𝗗𝗘 𝗣𝗔𝗦𝗘 𝗣𝗔𝗥𝗔 𝗦𝗘𝗥 𝗨𝗡 𝗨𝗦𝗨𝗔𝗥𝗜𝗢(𝗔) 𝗣𝗥𝗘𝗠𝗜𝗨𝗠!!\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗖𝗟𝗔𝗦𝗘 ⓵\n✪${usedPrefix}prem1 1\n✪ 𝗣𝗮𝘀𝗲 𝗕𝗮𝘀𝗶𝗰𝗼\n✪ 15 Chocolates 🍫 ➟ 5 min 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n🌀 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗣𝗔𝗦𝗦 ⓶\n✪${usedPrefix}prem2 1\n✪ 𝗣𝗮𝘀𝗲 𝗧𝗼𝗿𝗿𝗲 𝗱𝗲 𝗘𝗻𝗰𝗮𝗻𝘁𝗼\n✪ 35 Chocolates 🍫 ➟ 15 min 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n💚 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗣𝗔𝗦𝗦 ⓷\n✪${usedPrefix}prem3 1\n✪ 𝗣𝗮𝘀𝗲 𝗩𝗲𝗿𝗱𝘂𝘇𝗰𝗼\n✪ 25 Chocolates 🍫 ➟ 30 min 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n🗑 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗣𝗔𝗦𝗦 ⓸\n✪${usedPrefix}prem4 1\n✪ 𝗣𝗮𝘀𝗲 𝗥𝗲𝘀𝗶𝗱𝘂𝗼𝘀 𝗘𝗖𝗢\n✪ 50 Chocolates 🍫 ➟ 1 h 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n♦️ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗣𝗔𝗦𝗦 ⓹\n${usedPrefix}prem5 1\n✪ 𝗣𝗮𝘀𝗲 𝗖𝗮𝘇𝗮 𝗕𝗿𝗶𝗹𝗹𝗮𝗻𝘁𝗲\n✪ 40 Chocolates 🍫 ➟ 3 h 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n🪙 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗣𝗔𝗦𝗦 ⓺\n${usedPrefix}prem6 1\n✪ 𝗣𝗮𝘀𝗲 𝗔𝗺𝗼 𝗱𝗲𝗹 𝗖𝗿𝗶𝗽𝘁𝗼\n✪ 70 Chocolates 🍫 ➟ 7 h 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n💎+ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗖𝗟𝗔𝗦𝗘 𝗣𝗔𝗦𝗦 ⓻\n${usedPrefix}prem7 1\n 𝗣𝗮𝘀𝗲 𝗚𝗲𝗺𝗮 𝗣𝗹𝘂𝘀\n✪ 65 Chocolates 🍫 ➟ 24 h 𝗣𝗿𝗲𝗺𝗶𝘂𝗺\n\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n👑 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 - 𝗖𝗟𝗔𝗦𝗘 𝗣𝗔𝗦𝗦 ⓼\n${usedPrefix}prem8 1\n✪ 𝗣𝗮𝘀𝗲 𝗧𝗶𝗲𝗺𝗽𝗼 𝗱𝗲 𝗢𝗿𝗼\n✪ 80 Chocolates 🍫 ➟ 3 d 𝗣𝗿𝗲𝗺𝗶𝘂𝗺`, m, fake)        

}}
handler.help = ['serprem']
handler.tags = ['rpg']
handler.command = ['comprar', 'prem1', 'prem2', 'prem3', 'prem4', 'prem5', 'prem6', 'prem7', 'prem8', 'premium']

export default handler