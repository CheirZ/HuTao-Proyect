import fs from 'fs';

const obtenerDatos = () => fs.existsSync('database.json') ? JSON.parse(fs.readFileSync('database.json', 'utf-8')) : { usuarios: {} };

const guardarDatos = (data) => fs.writeFileSync('database.json', JSON.stringify(data, null, 2));

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [eleccion, cantidad] = text.split(' ');
    if (!eleccion || !cantidad) return m.reply(`✐ Por favor, elige cara o cruz y una cantidad de chocolates para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`✐ Elección no válida. Por favor, elige cara o cruz.\nEjemplo: *${usedPrefix + command} cara*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`✐ Cantidad no válida. Por favor, elige una cantidad de chocolates para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    let data = obtenerDatos();
    let userId = m.sender;
    if (!data.usuarios[userId]) data.usuarios[userId] = { chocolates: 100 };

    let user = data.usuarios[userId];
    if (user.moras < cantidad) {
        return m.reply(`✐ No tienes suficientes moras para apostar. Tienes ${user.moras} moras.`);
    }

    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';

    let mensaje = `✐ Has elegido *${eleccion}* y apostado *${cantidad} moras*.\n`;
    if (resultado === eleccion) {
        user.moras += cantidad;
        mensaje += `¡Felicidades! Ha salido *${resultado}* y ganas *${cantidad} moras*.\nTienes ahora *${user.moras} moras*.`;
    } else {
        user.moras -= cantidad;
        mensaje += `Lo siento. Ha salido *${resultado}* y pierdes *${cantidad} moras*.\nTienes ahora *${user.moras} moras*.`;
    }

    data.usuarios[userId] = user;
    guardarDatos(data);

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf'];
handler.tags = ['fun'];
handler.command = ['cf', 'caracruz'];

export default handler;