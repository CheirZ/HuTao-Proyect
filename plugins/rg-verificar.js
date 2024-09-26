import {createHash} from 'crypto';
const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
const handler = async function(m, {conn, text, usedPrefix, command}) {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => global.imagen1);
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
  user.regTime = + new Date;
  user.registered = true;
  const sn = createHash('md5').update(m.sender).digest('hex');
  const caption = `📃Registro completado información de registro 

Nombre ${name}

Edad de ${age}

🌟Ya estás registrado en nuestra comunidad, muchas gracias por registrarte ahora disfruta del bot 🤖

código de registro
${sn}
`;
  await conn.sendFile(m.chat, pp, 'hades.jpg', caption);
  
  global.db.data.users[m.sender].money += 10000;
  global.db.data.users[m.sender].exp += 10000;
};
handler.help = ['verificar'];
handler.tags = ['xp'];
handler.command = /^(Reg|reg)$/i;
export default handler;