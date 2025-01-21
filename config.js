import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botnumber = '' //Ejemplo: +573138954963
global.confirmCode = ''

//• ↳𝑺𝑶𝑳𝑶 𝑫𝑬𝑺𝑨𝑹𝑹𝑶𝑳𝑳𝑨𝑫𝑶𝑹𝑬𝑺 𝑨𝑷𝑹𝑶𝑩𝑨𝑫𝑶𝑺
global.owner = [
['5218711426787', 'CREADOR', true],
['5216566753569', '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀', true],
['5351524614'],
['5217561063371'],
['573012482597'],
['5218715746374']
];

//• ↳𝑺𝑶𝑳𝑶 𝑴𝑶𝑫𝑬𝑹𝑨𝑫𝑶𝑹𝑬𝑺!
global.mods = ['5351524614', '5218711426787', '', '', '']

global.suittag = ['5218711426787']
global.prems = []

//• ↳ ◜𝑴𝑨𝑹𝑪𝑨𝑺 𝑫𝑬 𝑨𝑮𝑼𝑨◞ • 💌
global.packsticker = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.packname = '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀'
global.author = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀'
global.wm = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀';
global.titulowm = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★';
global.titulowm2 = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀'
global.igfg = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀'
global.botname = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀'
global.dev = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.textbot = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀ : ★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.gt = '𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀';
global.namechannel = '❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀'
global.vs = 'V2'
global.vsJB = '5.0'


//• ↳ ◜𝑰𝑴𝑨́𝑮𝑬𝑵𝑬𝑺◞ • 🌇
global.imagen1 = fs.readFileSync('./Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/anime.jpg');
global.imagen3 = fs.readFileSync('./Menu3.jpg');
global.imagen4 = fs.readFileSync('./Menu.jpg');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./Menu3.jpg');
global.imagen7 = fs.readFileSync('./Menu5.jpg');
global.imagen8 = fs.readFileSync('./Menu4.jpg')
global.imagen9 = fs.readFileSync('./src/menu_en.png')
global.imagen10 = fs.readFileSync('./src/nuevobot.jpg')
global.miniurl = fs.readFileSync('./src/grupo.jpg');
global.logo2 = fs.readFileSync('./src/logo2.jpg')
global.logo3 = fs.readFileSync('./src/logo3.jpg')
global.catalogo = fs.readFileSync('./src/logo6.png')
global.logo4 = fs.readFileSync('./src/logo4.jpg')
global.logo5 = fs.readFileSync('./src/logo5.jpg')
global.logo7 = fs.readFileSync('./src/Logo7.png')
global.logo8 = fs.readFileSync('./src/Logo8.jpg')
global.rule = fs.readFileSync('./src/rule.jpg')
global.welcome = fs.readFileSync('./media/Welcome.jpg')
global.adios = fs.readFileSync('./media/Bye.jpg')

global.photoSity = [imagen8, imagen1, imagen4, imagen6]

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.languaje = 'Español'
global.nameqr = 'HuTao-Proyect'
global.sessions = 'seccion-activas'
global.jadi = 'jadibots'
global.hutaoJadibts = true

global.ch = {
ch1: '120363263466636910@newsletter',
ch2: '120363307382381547@newsletter',
ch3: '120363371018732371@newsletter',
ch4: '120363350554513092@newsletter',
}

//• ↳ ◜𝑭𝑨𝑲𝑬 𝑬𝑺𝑻𝑰𝑳𝑶◞ • 🪩
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.fakegif2 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'HuTao', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '♡٨ﮩ٨ﮩﮩ٨ﮩﮩ٨ﮩ ᗷIEᑎᐯEᑎIᗪO ﮩ٨ﮩﮩ٨ﮩﮩ٨ﮩ٨♡', jpegThumbnail: logo5 }}};

global.fakegif3 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'HuTao-MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𝐓𝐨𝐧𝐭𝐨 (￣へ ￣ ) ', jpegThumbnail: logo3 }}};

global.fakegif4 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'HuTao', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: 'ཫ꙳✱( รՇเςкєгร )✱꙳ཀ', jpegThumbnail: logo5 }}};

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.fgif2 = { key: {participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title":`͟͞ ★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★͟͞`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `❀🔥❀❦ǶꓴƬ𐤠Θ-ꝒⱤΘƳƸƇƬ❧ ❀🦋❀\n ★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★͟`, 'jpegThumbnail': logo4 }}}

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺◞ • 🌿
global.gp4 = 'https://chat.whatsapp.com/LcifaLUrmww6CPT27IuSAa' //Grupo Oficial De Hutao
global.gp1 = 'https://chat.whatsapp.com/GFyLX1dDDxI0utho5GBmJI' //Grupo 
global.gp2 = 'GE1wUxAsLleAxfCVvtsp1x' //Grupo
global.comunidad1 = 'https://chat.whatsapp.com/GPEtINYPyIB6a6S55ZJcAO' //Comunidad Megumin
global.channel = 'https://whatsapp.com/channel/0029VacDy0R6hENqnTKnG820' //Canal Oficial
global.yt = 'https://youtube.com/@davidchian4957' //Canal De Youtube
global.md = 'https://github.com/CheirZ' //Github Oficial
global.correo = 'miguel.doce12000@outlook.com'
global.cn ='https://whatsapp.com/channel/0029VacDy0R6hENqnTKnG820';

var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Linda Mañana'; break; case 1: hour = 'Linda Mañana'; break; case 2: hour = 'Linda Mañana'; break; case 3: hour = 'Linda Mañana'; break; case 4: hour = 'linda mañana'; break; case 5: hour = 'Linda Mañana'; break; case 6: hour = 'Linda Mañana'; break; case 7: hour = 'Linda Mañana'; break; case 8: hour = 'Linda Mañana'; break; case 9: hour = 'Linda Mañana'; break; case 10: hour = 'Lindo Dia'; break; case 11: hour = 'Lindo Dia'; break; case 12: hour = 'Lindo Dia'; break; case 13: hour = 'Lindo Dia'; break; case 14: hour = 'Linda Tarde'; break; case 15: hour = 'Linda Tarde'; break; case 16: hour = 'Linda Tarde'; break; case 17: hour = 'Linda Tarde'; break; case 18: hour = 'Linda Noche'; break; case 19: hour = 'Linda Noche'; break; case 20: hour = 'Linda Noche'; break; case 21: hour = 'Linda Noche'; break; case 22: hour = 'Linda Noche'; break; case 23: hour = 'Linda Noche'; break;}
global.saludo = '🍭' + hour;

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363307382381547@newsletter", serverMessageId: 100, newsletterName: namechannel, }, }, }
//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶◞ • 🕒
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `${dia} ${fecha}\nHuTao-Proyecy`;
global.nomorown = '5218711426787';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `${moment.tz('America/Mexico_City').format('DD/MM/YY')}`;
global.bottime = `${moment.tz('America/Mexico_City').format('HH:mm:ss')}`;
global.fgif = {key: {participant: '0@s.whatsapp.net'}, message: {'videoMessage': {'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./Menu.jpg')}}};
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];
//* ************************

//• ↳ ◜𝑨𝑷𝑰𝑺 𝑭𝑼𝑵𝑪𝑰𝑶𝑵◞ 👑
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['GataDiosV2']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.APIs = {
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  delirius: 'https://delirius-apiofc.vercel.app',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;
