import fetch from 'node-fetch';
import { getDevice } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

const COMMANDS_URL = 'https://zyxljs.stellarwa.xyz/test';

export default {
  command: ['ayuda'],
  category: 'info',
  run: async (client, m, args) => {
    try {
      const res = await fetch(COMMANDS_URL);
      const commandsText = await res.text();
      const commandsMatch = commandsText.match(/const commands = (\[[^]*?\]);/);
      if (!commandsMatch) throw new Error('No se pudo encontrar la variable `commands` en el archivo.');

      const commands = eval(commandsMatch[1]);

      if (!args[0]) {
        return m.reply('🍒 Por favor proporciona el nombre del comando que deseas consultar.');
      }

      const commandName = args[0].toLowerCase().replace(/^\//, "");

const command = commands.find(
  cmd =>
    cmd.name.toLowerCase() === commandName ||
    cmd.alias.map(a => a.toLowerCase().replace(/^\//, "")).includes(commandName)
);

      if (!command) {
        return m.reply(`🌱 El comando *${commandName}* no fue encontrado.`);
      }

      const commandInfo = `𖹭  ׄ  ְ 🍒 Información del comando *${commandName}*

➭ *Nombre ::* ${command.alias[0]}
> ׅ  ׄ  🌵   ׅ り *Descripción ::* ${command.desc}
> ׅ  ׄ  🌵   ׅ り *Categoría ::* ${command.category || 'otros'}
> ׅ  ׄ  🌵   ׅ り *Alías ::* ${command.alias.join(', ')}
> ׅ  ׄ  🌵   ׅ り *Uso ::* ${command.uso ? command.uso : 'No disponible'}`;
          await client.sendContextInfoIndex(m.chat, commandInfo, {}, m, true, null)
    } catch (e) {
      await m.reply(msgglobal);
    }
  }
};
