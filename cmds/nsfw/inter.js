import db from "#db"
import fetch from 'node-fetch';

const captions = {      
  anal: (from, to) => from === to ? 'se la metió en el ano.' : 'se la metió en el ano a',
  cum: (from, to) => from === to ? 'se vino dentro de... Omitiremos eso.' : 'se vino dentro de',
  undress: (from, to) => from === to ? 'se está quitando la ropa' : 'le está quitando la ropa a',
  fuck: (from, to) => from === to ? 'se entrega al deseo' : 'se está cogiendo a',
  spank: (from, to) => from === to ? 'está dando una nalgada' : 'le está dando una nalgada a',
  lickpussy: (from, to) => from === to ? 'está lamiendo un coño' : 'le está lamiendo el coño a',
  fap: (from, to) => from === to ? 'se está masturbando' : 'se está masturbando pensando en',
  grope: (from, to) => from === to ? 'se lo está manoseando' : 'se lo está manoseando a',
  sixnine: (from, to) => from === to ? 'está haciendo un 69' : 'está haciendo un 69 con',
  suckboobs: (from, to) => from === to ? 'está chupando unas ricas tetas' : 'le está chupando las tetas a',
  grabboobs: (from, to) => from === to ? 'está agarrando unas tetas' : 'le está agarrando las tetas a',
  blowjob: (from, to) => from === to ? 'está dando una rica mamada' : 'le dio una mamada a',
  boobjob: (from, to) => from === to ? 'esta haciendo una rusa' : 'le está haciendo una rusa a',
  footjob: (from, to) => from === to ? 'está haciendo una paja con los pies' : 'le está haciendo una paja con los pies a',
  yuri: (from, to) => from === to ? 'está haciendo tijeras!' : 'hizo tijeras con',
  cummouth: (from, to) => from === to ? 'está llenando la boca de alguien con cariño' : 'está llenando la boca de',
  cumshot: (from, to) => from === to ? 'se la metió a alguien y ahora viene el regalo' : 'le dio un regalo sorpresa a',
  handjob: (from, to) => from === to ? 'le da una paja a alguien con cariño' : 'le está haciendo una paja a',
  lickass: (from, to) => from === to ? 'saborea un culo sin detenerse' : 'le está lamiendo el culo a',
  lickdick: (from, to) => from === to ? 'chupa con ganas un pene' : 'se la mete todo en la boca para'
};

const symbols = ['(⁠◠⁠‿⁠◕⁠)', '˃͈◡˂͈', '૮(˶ᵔᵕᵔ˶)ა', '(づ｡◕‿‿◕｡)づ', '(✿◡‿◡)', '(꒪⌓꒪)', '(✿✪‿✪｡)', '(*≧ω≦)', '(✧ω◕)', '˃ 𖥦 ˂', '(⌒‿⌒)', '(¬‿¬)', '(✧ω✧)',  '✿(◕ ‿◕)✿',  'ʕ•́ᴥ•̀ʔっ', '(ㅇㅅㅇ❀)',  '(∩︵∩)',  '(✪ω✪)',  '(✯◕‿◕✯)', '(•̀ᴗ•́)و ̑̑'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const commandAliases = {
  anal: ['anal','violar'],
  cum: ['cum', 'eyacular'],
  undress: ['undress','encuerar'],
  fuck: ['fuck','coger'],
  spank: ['spank','nalgada'],
  lickpussy: ['lickpussy', 'lameruncoño'],
  fap: ['fap','paja'],
  grope: ['grope'],
  sixnine: ['sixnine','69'],
  suckboobs: ['suckboobs', 'chupartetas'],
  grabboobs: ['grabboobs'],
  blowjob: ['blowjob','mamar','bj'],
  boobjob: ['boobjob', 'rusa'],
  yuri: ['yuri','tijeras'],
  footjob: ['footjob'],
  cummouth: ['cummouth'],
  cumshot: ['cumshot'],
  handjob: ['handjob'],
  lickass: ['lickass', 'lamercullo'],
  lickdick: ['lickdick', 'lamerpolla']
};

function resolveCommand(cmd) {
  for (const [base, aliases] of Object.entries(commandAliases)) {
    if (aliases.includes(cmd)) return base;
  }
  return cmd;
}

export default {
  command: [
    'anal','lameruncoño','chupartetas','rusa','violar','cum','eyacular','undress','encuerar',
    'fuck','coger','spank','nalgada','lickpussy','fap','paja','grope','sixnine','69',
    'lamerpolla','lamercullo','suckboobs','grabboobs','blowjob','mamar','bj','boobjob','yuri',
    'tijeras','footjob','cummouth','cumshot','handjob','lickass','lickdick'
  ],
  category: 'nsfw',
  run: async ({ msg, sock, args, command, text, usedPrefix: prefix }) => {
    const chat = await db.getChat(msg.chat);
    if (!chat.nsfw) return msg.reply(mess.nsfw);

    const baseCommand = resolveCommand(command);
    if (!captions[baseCommand]) return;

    let who;
    const texto = msg.mentionedJid;
    if (msg.isGroup) {
      who = texto.length > 0 ? texto[0] : msg.quoted ? msg.quoted.sender : msg.sender;
    } else {
      who = msg.quoted ? msg.quoted.sender : msg.sender;
    }

    const user = await db.getUser(who);
    const fromName = msg.pushName || 'Alguien';
    const toName = user.name || 'alguien';

    const captionText = captions[baseCommand](fromName, toName);
    const caption =
      who !== msg.sender
        ? `@${msg.sender.split('@')[0]} ${captionText} @${who.split('@')[0]} ${getRandomSymbol()}.`
        : `${fromName} ${captionText} ${getRandomSymbol()}.`;

    try {
      const response = await fetch(`${api.url}/nsfw/interaction?inter=${baseCommand}`);
      const json = await response.json();
      const { result } = json;

      await sock.sendMessage(
        msg.chat,
        {
          video: { url: result },
          gifPlayback: true,
          caption,
          mentions: [who, msg.sender]
        },
        { quoted: msg }
      );
    } catch (e) {
      await msg.reply(msgglobal);
    }
  }
};