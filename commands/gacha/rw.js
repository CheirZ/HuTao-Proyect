import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import fetch from 'node-fetch';

const obtenerImagenGelbooru = async (keyword, name) => {
  const extensionesImagen = /\.(jpg|jpeg|png)$/i;

  try {
    const urlDelirius = `https://api.delirius.store/search/gelbooru?query=${keyword}`;
    const res = await fetch(urlDelirius);
    if (!res.ok) throw new Error(`Delirius HTTP ${res.status}`);
    const data = await res.json();

    const imagenesValidas = data?.data?.filter(item => 
      typeof item?.image === 'string' && extensionesImagen.test(item.image)
    );

    if (imagenesValidas?.length) {
      return imagenesValidas[Math.floor(Math.random() * imagenesValidas.length)].image;
    }
  } catch (err) {
    console.error('Error en Gelbooru (Delirius):', err.message);
  }

  try {
    const urlPinterest = `${api.url}/search/pinterest?query=${name}-Anime&key=${api.key}`;
    const resPinterest = await fetch(urlPinterest);
    if (!resPinterest.ok) throw new Error(`Pinterest HTTP ${resPinterest.status}`);
    const dataPinterest = await resPinterest.json();

    if (dataPinterest?.status !== true) throw new Error("Respuesta no exitosa de Pinterest");
    const imagenesValidas = dataPinterest?.data?.filter(item => 
      typeof item?.hd === 'string' && extensionesImagen.test(item.hd)
    );

    if (imagenesValidas?.length) {
      return imagenesValidas[Math.floor(Math.random() * imagenesValidas.length)].hd;
    }
  } catch (err) {
    console.error('Error en Pinterest (StellarWa):', err.message);
  }

  try {
    const urlStellar = `${api.url}/search/googleimagen?query=${name}-Anime`;
    const resStellar = await fetch(urlStellar);
    if (!resStellar.ok) throw new Error(`StellarWa HTTP ${resStellar.status}`);
    const buffer = await resStellar.buffer();
    return buffer;
  } catch (err) {
    console.error('Error en Google Imágenes (StellarWa):', err.message);
    return null;
  }
};

const obtenerPersonajes = () => {
  try {
    const contenido = fs.readFileSync('./lib/characters.json', 'utf-8')
    return JSON.parse(contenido)
  } catch (error) {
    console.error('[Error] characters.json:', error)
    return []
  }
}

const reservarPersonaje = (chatId, userId, personaje, db) => {
 // db.chats[chatId].personajesReservados ||= []
  db.chats[chatId].personajesReservados.push({ userId, ...personaje })
}

const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const s = seconds.toString().padStart(2, '0')
  const m = minutes.toString().padStart(2, '0')
  return m === '00'
    ? `${s} segundo${s > 1 ? 's' : ''}`
    : `${m} minuto${m > 1 ? 's' : ''}, ${s} segundo${s > 1 ? 's' : ''}`
}

export default {
  command: ['rollwaifu', 'roll', 'rw', 'rf'],
  category: 'gacha',
  run: async (client, m, args) => {
    const db = global.db.data
    const chatId = m.chat
    const userId = m.sender
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const chat = db.chats[chatId] || {}
   // chat.users ||= {}
   // chat.personajesReservados ||= []
    const user = chat.users[userId] || {}
    const now = Date.now()

    if (chat.adminonly || !chat.gacha)
      return m.reply(`🌽 Estos comandos estan desactivados en este grupo.`)

    const cooldown = user.rwCooldown || 0
    const restante = cooldown - now
    if (restante > 0) {
      return m.reply(`🌽 Espera *${msToTime(restante)}* para volver a usar este comando.`)
    }

    const personajes = obtenerPersonajes()
    const personaje = personajes[Math.floor(Math.random() * personajes.length)]
    if (!personaje) return m.reply('🌱 No se encontró ningún personaje disponible.')

    const idUnico = uuidv4().slice(0, 8)
    const reservado = Array.isArray(chat.personajesReservados)
      ? chat.personajesReservados.find((p) => p.name === personaje.name)
      : null

    const poseedor = Object.entries(chat.users).find(
      ([_, u]) =>
        Array.isArray(u.characters) && u.characters.some((c) => c.name === personaje.name),
    )

    try {
      let estado = 'Libre'
      if (poseedor) {
        const [id] = poseedor
        estado = `Reclamado por ${db.users[id]?.name || 'Alguien'}`
      } else if (reservado) {
        estado = `Reservado por ${db.users[reservado.userId]?.name || 'Alguien'}`
      }

      user.rwCooldown = now + 15 * 60000

      const valorPersonaje =
        typeof personaje.value === 'number' ? personaje.value.toLocaleString() : '0'
      const mensaje = `➩ Nombre › *${personaje.name || 'Desconocido'}*

ੈ⚥‧₊˚ Género › *${personaje.gender || 'Desconocido'}*
ੈ⛁‧₊˚ Valor › *${valorPersonaje}*
ੈ❖‧₊˚ Estado › *${estado}*
ੈ❀︎‧₊˚ Fuente › *${personaje.source || 'Desconocido'}*

${dev}`

const imagen = await obtenerImagenGelbooru(personaje.keyword, personaje.name)

if (!imagen) {
  return m.reply(`🌽 No se pudo obtener una imagen para *${personaje.name}*.`)
}

const payload =
  typeof imagen === 'string'
    ? { image: { url: imagen }, caption: mensaje, mimetype: 'image/jpeg' }
    : { image: imagen, caption: mensaje, mimetype: 'image/jpeg' }

await client.sendMessage(chatId, payload, { quoted: m })

      if (!poseedor) {
        reservarPersonaje(
          chatId,
          userId,
          {
            ...personaje,
            id: idUnico,
            reservedBy: userId,
            reservedUntil: now + 20000,
            expiresAt: now + 60000,
          },
          db,
        )
      }
    } catch (e) {
      user.rwCooldown = 0
      return m.reply(msgglobal)
    }
  },
};
