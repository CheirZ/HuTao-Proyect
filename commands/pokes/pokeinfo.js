export default {
  command: ['pokemoninfo', 'infopoke', 'infopokemon', 'pokeinfo'],
  category: 'pokes',
  run: async (client, m, args, command, text, prefix) => {

    if (global.db.data.chats[m.chat].adminonly || !global.db.data.chats[m.chat].pokes)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    try {
      if (!text) return m.reply(`🫛 Uso: *${prefix + command} <nombre_pokemon>*\n\n> 🫛 Ejemplo: ${prefix + command} Pikachu`);

      const pokemonName = text.trim().toLowerCase();

      if (!global.db.data.pokemon || !global.db.data.pokemon[m.chat]) {
        return m.reply('🫛 No hay Pokémon registrados en este grupo.');
      }

      let foundPokemon = null;
      let foundPokemonId = null;

      for (const pokemonId in global.db.data.pokemon[m.chat]) {
        const pokemon = global.db.data.pokemon[m.chat][pokemonId];
        if (pokemon && pokemon.nombre && pokemon.nombre.toLowerCase().includes(pokemonName)) {
          foundPokemon = pokemon;
          foundPokemonId = pokemonId;
          break;
        }
      }

      if (!foundPokemon) {
        return m.reply(`🫛 No existe un Pokémon llamado *${text}* en este grupo.`);
      }

      if (!foundPokemon.atrapado || !foundPokemon.atrapador) {
        return m.reply(`🍒 *${foundPokemon.nombre}* aún no ha sido reclamado por ningún entrenador.`);
      }

      const pokemonData = foundPokemon;
      const now = Date.now();

      const trainerData = global.db.data.chats[m.chat].users[foundPokemon.atrapador];
      const trainerName = global.db.data.users?.[foundPokemon.atrapador]?.name 
        || foundPokemon.atrapador.split('@')[0] 
        || 'Desconocido';

      let currentOwnershipDate = foundPokemon.capturado || Date.now();

      if (trainerData?.pokemon) {
        const trainerPokemon = trainerData.pokemon.find(p => p.id === foundPokemonId);
        if (trainerPokemon) {
          currentOwnershipDate = trainerPokemon.atrapado;
        }
      }

      let cooldownStatus = '🥦 Listo para pelear';
      if (pokemonData.lastBattle && now < pokemonData.lastBattle) {
        const timeLeft = Math.ceil((pokemonData.lastBattle - now) / 1000);
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        cooldownStatus = `🍓 Descansando (${hours}h ${minutes}m)`;
      }

      const totalBattles = (pokemonData.wins || 0) + (pokemonData.losses || 0);
      const winRate = totalBattles > 0 ? ((pokemonData.wins || 0) / totalBattles * 100).toFixed(1) : 0;

      const captureDate = new Date(pokemonData.capturado || currentOwnershipDate);
      const captureStr = captureDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

      const daysWithTrainer = Math.floor((now - currentOwnershipDate) / (1000 * 60 * 60 * 24));

      let message = `ׅ  ׄ  🥤   ׅ り *Información de ${foundPokemon.nombre}*\n`;
      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n\n`;
      message += `ׅ  ׄ  🌵   ׅ り *Nombre:* ${foundPokemon.nombre}\n`;
      message += `ׅ  ׄ  🌵   ׅ り *Tipo:* ${foundPokemon.tipo}\n`;
      message += `ׅ  ׄ  🌵   ׅ り *Poder:* ${pokemonData.poder?.toLocaleString() || 0}\n`;
      message += `ׅ  ׄ  🌵   ׅ り *ID:* ${foundPokemonId}\n\n`;
      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n`;
      message += `ׅ  ׄ  🫧   ׅ り *Estadísticas de Batalla*\n\n`;
      message += `ׅ  ׄ  🧊ᩙ   ׅ り Victorias: ${pokemonData.wins || 0}\n`;
      message += `ׅ  ׄ  🧊ᩙ   ׅ り Derrotas: ${pokemonData.losses || 0}\n`;
      message += `ׅ  ׄ  🧊ᩙ   ׅ り Win Rate: ${winRate}%\n`;
      message += `ׅ  ׄ  🧊ᩙ   ׅ り Batallas totales: ${totalBattles}\n\n`;
      message += `𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n`;
      message += `*Entrenador Actual*\n\n`;
      message += `ׅ  ׄ  🥤   ׅ り Nombre: ${trainerName}\n`;
      message += `ׅ  ׄ  🥤   ׅ り Obtenido: ${captureStr}\n`;
      message += `ׅ  ׄ  🥤   ׅ り Días con este entrenador: ${daysWithTrainer}\n`;
      message += `ׅ  ׄ  🥤   ׅ り ${cooldownStatus}\n`;

      if (pokemonData.ownerHistory && pokemonData.ownerHistory.length > 0) {
        message += `\n𖹭᳔ㅤㅤㅤׄㅤㅤ🍵ㅤㅤׅㅤㅤゕㅤㅤׄㅤㅤㅤ𑄾𑄾\n`;
        message += `ׅ  ׄ  🌵   ׅ り *Historial de Dueños* (${pokemonData.ownerHistory.length})\n\n`;

        for (let i = 0; i < Math.min(pokemonData.ownerHistory.length, 5); i++) {
          const history = pokemonData.ownerHistory[i];
          const ownerData = global.db.data.users[history.owner];
          const ownerName = ownerData?.name || history.owner.split('@')[0];

          const fromDate = new Date(history.ownedFrom).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
          const toDate = new Date(history.ownedUntil).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

          let transferInfo = '';
          if (history.transferType === 'venta') {
            transferInfo = ` por ${history.price?.toLocaleString()} pokemonedas`;
          } else if (history.transferType === 'intercambio') {
            transferInfo = ` por ${history.tradedFor}`;
          }

          message += `   ${i + 1}. ${ownerName}\n`;
          message += `ׅ  ׄ  🫧   ׅ り ${fromDate} - ${toDate}\n`;
          message += `ׅ  ׄ  🫧   ׅ り ${history.transferType}${transferInfo}\n\n`;
        }

        if (pokemonData.ownerHistory.length > 5) {
          message += `   ... y ${pokemonData.ownerHistory.length - 5} dueño(s) más\n`;
        }
      }

      await m.reply(message);
    } catch (e) {
      return m.reply(msgglobal);
    }
  }
}