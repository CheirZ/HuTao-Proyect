export default {
  command: ['atrapar', 'catch'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    if (!m.quoted) return m.reply('🥦 Responde al mensaje del Pokémon que quieres atrapar.');

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
      const botSettings = global.db.data.settings[botId] || {}
      const money = botSettings.currency || ''

    const now = Date.now();
    const cooldown = 15 * 60 * 1000;

   const userDatass = global.db.data.chats[m.chat].users[m.sender]
    if (userDatass.lastPokemonBuy && now < userDatass.lastPokemonBuy) {
      const timeLeft = Math.ceil((userDatass.lastPokemonBuy - now) / 1000);
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      let timeText = '';
      if (minutes > 0) timeText += `${minutes} minuto${minutes !== 1 ? 's' : ''} `;
      if (seconds > 0 || timeText === '') timeText += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
      return m.reply(`🍒 Debes esperar *${timeText.trim()}* para usar *${prefix + command}* de nuevo.`);
    }

    const groupData = global.db.data.chats[m.chat];
    if (!groupData.lastPokemonId || !groupData.lastPokemonMsgId) {
      return m.reply('🍒 No hay ningún Pokémon disponible para atrapar.');
    }

    try {
      if (m.quoted.id !== groupData.lastPokemonMsgId) {
        return m.reply(`🍒 Ese no es el Pokémon más reciente. Usa *${prefix}pokemon* para ver uno nuevo.`);
      }

      const pokemonId = groupData.lastPokemonId;
      const pokemonData = global.db.data.pokemon[m.chat][pokemonId];

      if (pokemonData.atrapado) {
        const ownerData = global.db.data.users[pokemonData.atrapador];
        const ownerName = ownerData?.name?.trim() ||
          await client.getName(pokemonData.atrapador).catch(() => pokemonData.atrapador.split('@')[0]) ||
          'Desconocido';
        return m.reply(`🍒 Este Pokémon ya fue atrapado por *${ownerName}*.`);
      }

      const userData = global.db.data.chats[m.chat].users[m.sender];
      userData.coins = userData.coins || 0;

      if (userData.coins < pokemonData.precio) {
        return m.reply(`🍒 No tienes suficientes ${money}. Necesitas *${pokemonData.precio.toLocaleString()}* pero solo tienes *${userData.coins.toLocaleString()}*.`);
      }

      userData.coins -= pokemonData.precio;

      pokemonData.atrapado = true;
      pokemonData.atrapador = m.sender;

      if (!userData.pokemon) userData.pokemon = [];

      userData.pokemon.push({
        id: pokemonId,
        nombre: pokemonData.nombre,
        tipo: pokemonData.tipo,
        poder: pokemonData.poder,
        atrapado: Date.now()
      });

      await m.reply(
        `ׅ  ׄ  🥤   ׅ り ¡Felicidades! Has atrapado a *${pokemonData.nombre}*\n\n` +
        `ׅ  ׄ  🌵   ׅ り *Tipo* » ${pokemonData.tipo}\n` +
        `ׅ  ׄ  🌵   ׅ り *Poder* » ${pokemonData.poder.toLocaleString()}\n` +
        `ׅ  ׄ  🌵   ׅ り *Precio* » ${pokemonData.precio.toLocaleString()} ${money}\n\n` +
        `> 🍓 Coins restantes » ${userData.coins.toLocaleString()}`
      );

      userDatass.lastPokemonBuy = now + cooldown;

      delete groupData.lastPokemonId;
      delete groupData.lastPokemonMsgId;

    } catch (e) {
      m.reply(msgglobal);
    }
  }
};