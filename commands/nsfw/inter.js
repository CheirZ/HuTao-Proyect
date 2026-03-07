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
  footjob: (from, to) => from === to ? 'está haciendo una paja con los pies' : 'le está haciendo una paja con los pies a'
}

const symbols = ['(⁠◠⁠‿⁠◕⁠)', '˃͈◡˂͈', '૮(˶ᵔᵕᵔ˶)ა', '(づ｡◕‿‿◕｡)づ', '(✿◡‿◡)', '(꒪⌓꒪)', '(✿✪‿✪｡)', '(*≧ω≦)', '(✧ω◕)', '˃ 𖥦 ˂', '(⌒‿⌒)', '(¬‿¬)', '(✧ω✧)',  '✿(◕ ‿◕)✿',  'ʕ•́ᴥ•̀ʔっ', '(ㅇㅅㅇ❀)',  '(∩︵∩)',  '(✪ω✪)',  '(✯◕‿◕✯)', '(•̀ᴗ•́)و ̑̑']

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const commandAliases = {
  encuerar: 'undress',
  coger: 'fuck',
  nalgada: 'spank',
  paja: 'fap',
  69: 'sixnine',
  bj: 'blowjob'
}

export default {
   command: ['anal', 'cum', 'undress', 'encuerar', 'fuck', 'coger', 'spank', 'nalgada', 'lickpussy', 'fap', 'paja', 'grope', 'sixnine', '69', 'suckboobs', 'grabboobs', 'blowjob', 'bj', 'boobjob', 'footjob'],
  category: 'nsfw',
  run: async (client, m, args, command, text, prefix) => {

    if (!db.data.chats[m.chat].nsfw) return m.reply(mess.nsfw)

    const currentCommand = commandAliases[command] || command
    if (!captions[currentCommand]) return

    let who
    const texto = m.mentionedJid
    if (m.isGroup) {
      who = texto.length > 0 ? texto[0] : m.quoted ? m.quoted.sender : m.sender
    } else {
      who = m.quoted ? m.quoted.sender : m.sender
    }

    const fromName = global.db.data.users[m.sender]?.name || 'Alguien'
    const toName = global.db.data.users[who]?.name || 'alguien'

    const captionText = captions[currentCommand](fromName, toName)
    const caption =
      who !== m.sender
        ? `@${m.sender.split('@')[0]} ${captionText} @${who.split('@')[0]} ${getRandomSymbol()}.`
        : `${fromName} ${captionText} ${getRandomSymbol()}.`

    try {
      const response = await fetch(
        `${api.url}/nsfw/interaction?inter=${currentCommand}&key=${api.key}`,
      )
      const json = await response.json()
      const { result } = json

      await client.sendMessage(
        m.chat,
        {
          video: { url: result },
          gifPlayback: true,
          caption,
          mentions: [who, m.sender]
        },
        { quoted: m }
      )
    } catch (e) {
      await m.reply(msgglobal)
    }
  }
};
