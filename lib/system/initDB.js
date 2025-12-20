let isNumber = (x) => typeof x === 'number' && !isNaN(x)

function initDB(client, m) {
  const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'

  const settings = global.db.data.settings[jid] ||= {}
  settings.self ??= false
  settings.prefijo ??= ['/', '.']
  settings.id ??= '120363371018732371@newsletter'
  settings.nameid ??= '✦͙͙͙*͙*❥⃝∗⁎.ʚ ʰᵘᵗᵃᵒ-ᵖʳᵒʸᵉᶜᵗ ɞ.⁎∗❥⃝**͙✦͙͙͙'
  settings.link ??= 'https://api.stellarwa.xyz'
  settings.banner ??= 'https://files-furina.stellarwa.xyz/1766201507760.jpg'
  settings.icon ??= 'https://files-furina.stellarwa.xyz/1766201596136.jpg'
  settings.currency ??= 'moras'
  settings.namebot ??= 'ɦʊȶǟօ-քʀօʏɛƈȶ'
  settings.namebot2 ??= 'HuTao'
  settings.owner ??= 'Xi_miguelon77xx'

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
  chat.rpg ??= true
  chat.adminonly ??= false
  chat.primaryBot ??= null
  chat.antilinks ??= true
  chat.personajesReservados ||= []

  chat.users[m.sender] ||= {}
  chat.users[m.sender].coins = isNumber(chat.users[m.sender].coins) ? chat.users[m.sender].coins : 0
  chat.users[m.sender].bank = isNumber(chat.users[m.sender].bank) ? chat.users[m.sender].bank : 0
  chat.users[m.sender].characters = Array.isArray(chat.users[m.sender].characters) ? chat.users[m.sender].characters : []
}

export default initDB;
