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
  if (user.registered === true) conn.reply(m.chat, `🌴 Hola amigo, ya estás registrado en nuestra base de datos.`, m, rcanal);
  if (!Reg.test(text)) conn.reply(m.chat, `regístrese bien hijo de su, ejemplo: !reg miguelon.23`, m, rcanal);
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) conn.reply(m.chat, '❌ No puedes dejar tu nombre vacío por favor completa el registro No puedes dejar tu nombre vacío Por favor completa el registro', m, rcanal);
  if (!age) m.reply('❌ Por favor no dejes tu edad vacía, haz el registro completo', m, rcanal);
  if (name.length >= 30) conn.reply(m.chat, '️☘ ¿puedes acortar tu nombre por favor?', m, rcanal);
  age = parseInt(age);
  if (age > 100) conn.reply(m.chat, '☘️ por favor use una edad menor, no tan alta', m, rcanal);
  if (age < 5) conn.reply(m.chat, '[❌] Lo siento, pero no se permiten 5 años. Lo siento, pero no se permiten 5 años.', m, rcanal);
  user.name = name.trim();
  user.age = age;
  user.descripcion = bio;
  user.regTime = + new Date;
  user.registered = true;
  global.db.data.users[m.sender].money += 23;
  global.db.data.users[m.sender].exp += 45;
  global.db.data.users[m.sender].moras += 60;
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);

  const caption = `📃Registro completado información de registro 

Nombre ${name}

Edad de ${age}

🌟 Ya estás registrado en nuestra comunidad, muchas gracias por registrarte ahora disfruta del bot 🤖

Código de registro
${sn}
`;
  await conn.sendFile(m.chat, pp, 'hutao.jpg', caption, m, null, fake);
  
};
handler.help = ['verificar'];
handler.tags = ['xp'];
handler.command = /^(Reg|reg)$/i;
export default handler;
