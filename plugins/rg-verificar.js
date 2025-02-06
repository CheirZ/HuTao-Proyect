import {createHash} from 'crypto';
import PhoneNumber from 'awesome-phonenumber'
// import _ from "lodash"
const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
const handler = async function(m, {conn, text, usedPrefix, command}) {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  let delirius = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let paisdata = delirius.data.result
  let mundo = paisdata ? `${paisdata.name} ${paisdata.emoji}` : 'Desconocido'
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
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
  if (user.registered === true) throw `🌴 Hola amigo, ya estás registrado en nuestra base de datos.`;
  if (!Reg.test(text)) throw `regístrese bien hijo de su, ejemplo: !reg miguelon.23`;
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw '❌ No puedes dejar tu nombre vacío por favor completa el registro No puedes dejar tu nombre vacío Por favor completa el registro';
  if (!age) throw '❌ Por favor no dejes tu edad vacía, haz el registro completo';
  if (name.length >= 30) throw '️☘ ¿puedes acortar tu nombre por favor?';
  age = parseInt(age);
  if (age > 100) throw '☘️ por favor use una edad menor, no tan alta';
  if (age < 5) throw '[❌] Lo siento, pero no se permiten 5 años. Lo siento, pero no se permiten 5 años.';
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

Verifica tu registro aquí:
https://whatsapp.com/channel/0029Vawz6Y91SWsyLezeAb0f
`;
  await conn.sendFile(m.chat, pp, 'hutao.jpg', caption, m, null, rcanal);
  
};
handler.help = ['verificar'];
handler.tags = ['xp'];
handler.command = /^(Reg|reg)$/i;
export default handler;
