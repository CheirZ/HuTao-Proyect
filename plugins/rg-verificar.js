import {createHash} from 'crypto';
import PhoneNumber from 'awesome-phonenumber'
import _ from "lodash"
const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
const handler = async function(m, {conn, text, usedPrefix, command}) {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  let bio = 0, fechaBio
  // let who2 = m.isGroup ? _.get(m, "mentionedJid[0]", m.quoted?.sender || m.sender) : m.sender
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  if (!biografia || !biografia[0] || biografia[0].status === null) {
  bio = sinDefinir
  fechaBio = "Fecha no disponible"
  } else {
bio = biografia[0].status || sinDefinir
fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", }) : "Fecha no disponible"
  }
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://cdn.donmai.us/original/31/6d/__hu_tao_genshin_impact_drawn_by_pioko__316d40e84fd8b32cb4cac320728a3a10.jpg')
  
  // Verificar si ya está registrado
  if (user.registered === true) {
    return conn.reply(m.chat, `⚡ ACCESO DENEGADO\n\n▸ Usuario ya registrado en el sistema\n▸ Acceso completo activado\n\n╔══════════════════════════╗\n║  ✅ VERIFICACIÓN EXITOSA  ║\n╚══════════════════════════╝`, m);
  }
  
  // Verificar formato del texto
  if (!text || !Reg.test(text)) {
    return conn.reply(m.chat, `⚠️ FORMATO INCORRECTO\n\n▸ Uso correcto: ${usedPrefix + command} nombre.edad\n▸ Ejemplo: ${usedPrefix + command} HuTao.18\n\n╔══════════════════════════╗\n║   REGISTRO REQUERIDO     ║\n╚══════════════════════════╝`, m);
  }
  
  let [_, name, splitter, age] = text.match(Reg);
  
  // Validar nombre
  if (!name) {
    return conn.reply(m.chat, '❌ ERROR: Campo nombre vacío\n\n▸ Por favor ingresa tu nombre\n▸ Formato: nombre.edad', m);
  }
  
  // Validar edad
  if (!age) {
    return conn.reply(m.chat, '❌ ERROR: Campo edad vacío\n\n▸ Por favor ingresa tu edad\n▸ Formato: nombre.edad', m);
  }
  
  // Validar longitud del nombre
  if (name.length >= 30) {
    return conn.reply(m.chat, '⚠️ NOMBRE MUY LARGO\n\n▸ Máximo 30 caracteres\n▸ Intenta con un nombre más corto', m);
  }
  
  age = parseInt(age);
  
  // Validar rango de edad
  if (age > 100) {
    return conn.reply(m.chat, '⚠️ EDAD INVÁLIDA\n\n▸ Edad máxima: 100 años\n▸ Ingresa una edad real', m);
  }
  
  if (age < 5) {
    return conn.reply(m.chat, '⚠️ EDAD MÍNIMA REQUERIDA\n\n▸ Edad mínima: 5 años\n▸ Acceso restringido para menores', m);
  }
  // Registrar usuario
  user.name = name.trim();
  user.age = age;
  user.descripcion = bio;
  user.regTime = + new Date;
  user.registered = true;
  global.db.data.users[m.sender].money += 23;
  global.db.data.users[m.sender].exp += 45;
  global.db.data.users[m.sender].moras += 60;
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);

  const caption = `╔══════════════════════════╗
║    ✅ REGISTRO EXITOSO    ║
╚══════════════════════════╝

▸ ACCESO CONCEDIDO AL SISTEMA

┌─[ 👤 PERFIL CREADO ]─┐
│ NOMBRE: ${name}
│ EDAD: ${age} años
│ STATUS: Verificado ✅
│ 
│ RECOMPENSAS:
│ • +23 Monedas 💰
│ • +45 Experiencia ⭐
│ • +60 Moras 🔮
└─────────────────────┘

▸ SERIAL: ${sn}

╔══════════════════════════╗
║  🌐 BIENVENIDO AL CYBER  ║
║     SISTEMA HUTAO        ║
╚══════════════════════════╝

▸ Usa /menu para explorar comandos
▸ Disfruta del sistema neural!`;

  await conn.sendFile(m.chat, pp, 'hutao.jpg', caption, m);
  
};
handler.help = ['verificar', 'reg'];
handler.tags = ['rg'];
handler.command = /^(verificar|reg|registro)$/i;
export default handler;
