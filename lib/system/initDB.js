let isNumber = (x) => typeof x === 'number' && !isNaN(x)

function initDB(m, client) {
  const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'

  global.db.data.pokemonBattles ??= {}
  global.db.data.pokemonShop ??= {}
  global.db.data.pokemonTrades ??= {}
  global.db.data.pokemon[m.chat] ??= {}

  const settings = global.db.data.settings[jid] ||= {}
  settings.self ??= false
  settings.prefijo ??= ['/']
  settings.commandsejecut ??= isNumber(settings.commandsejecut) ? settings.commandsejecut : 0
  settings.id ??= '120363420992828502@newsletter'
  settings.nameid ??= '𐚁๋࣭⭑ֶָ֢ ѕтєℓℓαя ωα ⚡︎ ¢нαηηєℓ  ₍ᐢ..ᐢ₎♡'
  settings.type ??= 'Sub'
  settings.link ??= 'https://api.stellarwa.xyz'
  settings.banner ??= 'https://cdn.stellarwa.xyz/files/f9nX.jpeg'
  settings.icon ??= 'https://cdn.stellarwa.xyz/files/jjiM.jpeg'
  settings.currency ??= 'Coins'
  settings.namebot ??= '𑣲♡ ᥲᥣᥡᥲ ᥕᥲrᥱ ᥲі  ₍ᐢ..ᐢ₎♡'
  settings.namebot2 ??= 'Alya'
  settings.owner ??= 'Oculto por privacidad'
  settings.canal ??= 'https://whatsapp.com/channel/0029VbApwZ9ISTkEBb6ttS3F'

  const user = global.db.data.users[m.sender] ||= {}
  user.name ??= ''
  user.exp = isNumber(user.exp) ? user.exp : 0
  user.level = isNumber(user.level) ? user.level : 0
  user.usedcommands = isNumber(user.usedcommands) ? user.usedcommands : 0
  user.pasatiempo ??= ''
  user.description ??= ''
  user.marry ??= ''
  user.genre ??= ''
  user.birth ??= ''
  user.metadatos ??= null
  user.metadatos2 ??= null

  const chat = global.db.data.chats[m.chat] ||= {}
  chat.users ||= {}
  chat.bannedGrupo ??= false
  chat.welcome ??= true
  chat.nsfw ??= false
  chat.alerts ??= true
  chat.gacha ??= true
  chat.pokes ??= true
  chat.rpg ??= true
  chat.adminonly ??= false
  chat.primaryBot ??= null
  chat.antilinks ??= true
  chat.personajesReservados ||= []
  chat.intercambios ||= []
  chat.lastPokemonId ??= null
  chat.lastPokemonMsgId ??= null

  chat.users[m.sender] ||= {}
  user.stats = user.stats || {}
  user.usedTime = user.usedTime || null
chat.users[m.sender].coins = isNumber(chat.users[m.sender].coins) ? chat.users[m.sender].coins : 0
chat.users[m.sender].lastPokemonBuy = isNumber(chat.users[m.sender].lastPokemonBuy) ? chat.users[m.sender].lastPokemonBuy : 0;
chat.users[m.sender].lastPokemonRoll = isNumber(chat.users[m.sender].lastPokemonRoll) ? chat.users[m.sender].lastPokemonRoll : 0;
chat.users[m.sender].lastPokemonHeal = isNumber(chat.users[m.sender].lastPokemonHeal) ? chat.users[m.sender].lastPokemonHeal : 0;
chat.users[m.sender].lastPokemonPvp = isNumber(chat.users[m.sender].lastPokemonPvp) ? chat.users[m.sender].lastPokemonPvp : 0;
chat.users[m.sender].lastPokemonAceptar = isNumber(chat.users[m.sender].lastPokemonAceptar) ? chat.users[m.sender].lastPokemonAceptar : 0;
chat.users[m.sender].dailyStreak = isNumber(chat.users[m.sender].dailyStreak) ? chat.users[m.sender].dailyStreak : 0
chat.users[m.sender].bank = isNumber(chat.users[m.sender].bank) ? chat.users[m.sender].bank : 0
chat.users[m.sender].characters = Array.isArray(chat.users[m.sender].characters) ? chat.users[m.sender].characters : []
chat.users[m.sender].crimeCooldown = isNumber(chat.users[m.sender].crimeCooldown) ? chat.users[m.sender].crimeCooldown : 0
chat.users[m.sender].mineCooldown = isNumber(chat.users[m.sender].mineCooldown) ? chat.users[m.sender].mineCooldown : 0
chat.users[m.sender].ritualCooldown = isNumber(chat.users[m.sender].ritualCooldown) ? chat.users[m.sender].ritualCooldown : 0
chat.users[m.sender].workCooldown = isNumber(chat.users[m.sender].workCooldown) ? chat.users[m.sender].workCooldown : 0
chat.users[m.sender].rtCooldown = isNumber(chat.users[m.sender].rtCooldown) ? chat.users[m.sender].rtCooldown : 0
chat.users[m.sender].slutCooldown = isNumber(chat.users[m.sender].slutCooldown) ? chat.users[m.sender].slutCooldown : 0
chat.users[m.sender].roboCooldown = isNumber(chat.users[m.sender].roboCooldown) ? chat.users[m.sender].roboCooldown : 0
chat.users[m.sender].pptCooldown = isNumber(chat.users[m.sender].pptCooldown) ? chat.users[m.sender].pptCooldown : 0
chat.users[m.sender].lastDaily = isNumber(chat.users[m.sender].lastDaily) ? chat.users[m.sender].lastDaily : 0
chat.users[m.sender].lastWeekly = isNumber(chat.users[m.sender].lastWeekly) ? chat.users[m.sender].lastWeekly : 0
chat.users[m.sender].lastMonthly = isNumber(chat.users[m.sender].lastMonthly) ? chat.users[m.sender].lastMonthly : 0
chat.users[m.sender].voteCooldown = isNumber(chat.users[m.sender].voteCooldown) ? chat.users[m.sender].voteCooldown : 0
chat.users[m.sender].rwCooldown = isNumber(chat.users[m.sender].rwCooldown) ? chat.users[m.sender].rwCooldown : 0
chat.users[m.sender].buyCooldown = isNumber(chat.users[m.sender].buyCooldown) ? chat.users[m.sender].buyCooldown : 0
}

export default initDB;