import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

global.botnumber = ''

global.owner = [
    ["", "Propietario 👑", true],
    //num en lid v:
    ["239298850873418", "creadorLid", true],
    ["5492916450307"],    
    ["5218712620915"],
    ["5351524614"]
];

global.mods = []
global.suittag = []
global.prems = []

// APIs Keys - Agregar aquí las claves de API si las tienes
global.APIKeys = {
  // Ejemplo: 'https://api.ejemplo.com': 'tu-api-key-aqui'
}

global.packsticker = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.packname = '󠁖󠁖󠁖󠁖󠁖󠁖󠁻󠁻𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀'
global.author = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.wm = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.titulowm = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.titulowm2 = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.igfg = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.botname = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.dev = '★彡( Ӿł_₥ł₲ɄɆⱠØ₦77ӾӾ )彡★'
global.textbot = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.gt = '𝐇𝐮ⷡ𝐓ⷪ𝐚ⷮ𝐨-𝐌𝐃󠁂󠀧󠁂🈀'
global.namechannel = 'ɦʊȶǟօ-քʀօʏɛƈȶ'
global.vs = 'V2.3'

global.imagen1 = "https://files-furina.stellarwa.xyz/1759366152803.jpg"
global.imagen2 = "https://stellarwa.xyz/files/1752422509254.jpg"
global.imagen3 = "https://stellarwa.xyz/files/1752422535890.jpg"
global.imagen4 = "https://stellarwa.xyz/files/1752422562260.jpg"
global.imagen5 = fs.readFileSync('./src/+18.jpg')
global.imagen6 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.imagen7 = "https://stellarwa.xyz/files/1752422693806.jpg"
global.imagen8 = "https://stellarwa.xyz/files/1752422716622.jpg"
global.imagen9 = "https://stellarwa.xyz/files/1752422417390.jpg"
global.imagen10 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.miniurl = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo2 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo3 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.catalogo = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo4 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo5 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo7 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.logo8 = "https://stellarwa.xyz/files/1752422642121.jpg"
global.rule = fs.readFileSync('./src/rule.jpg')
global.welcome = "https://stellarwa.xyz/files/1752422465230.jpg"
global.adios = "https://stellarwa.xyz/files/1752426542029.jpg"

global.photoSity = [imagen8, imagen1, imagen4, imagen6]

global.languaje = 'Es'
global.nameqr = 'HuTao'
global.sessions = 'Session/Hutao'
global.jadi = 'Session/SubBot'

// Configuración de características
global.jadibotEnabled = false // Deshabilitar completamente jadibot/serbot

global.channel = {
channel1: "120363371018732371@newsletter",
channel2: "120363387958443019@newsletter",
channel3: "120363420238618096@newsletter",
channel4: "120363420992828502@newsletter",
channel5: "120363419837575209@newsletter"
}

global.gp4 = 'https://chat.whatsapp.com/LcifaLUrmww6CPT27IuSAa'
global.gp1 = 'https://chat.whatsapp.com/GFyLX1dDDxI0utho5GBmJI'
global.channelURL = 'https://whatsapp.com/channel/0029Vb7Ji66KbYMTYLU9km3p'
global.md = 'https://github.com/CheirZ'
global.correo = 'miguel.doce12000@outlook.com'
global.cn = 'https://whatsapp.com/channel/0029VacDy0R6hENqnTKnG820'

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;
