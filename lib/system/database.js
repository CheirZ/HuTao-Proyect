import path from 'path'
import _ from 'lodash'
import yargs from 'yargs/yargs'
import Database from 'better-sqlite3'

global.opts = Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

const dbPath = path.join(process.cwd(), 'lib', 'night.db')
const conn = new Database(dbPath, { fileMustExist: false, timeout: 10000 })

conn.pragma('journal_mode = WAL')
conn.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    key TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    contenido TEXT
  );
  CREATE TABLE IF NOT EXISTS settings (
    clave TEXT PRIMARY KEY,
    valor TEXT
  );
  CREATE TABLE IF NOT EXISTS tokens (
    clave TEXT PRIMARY KEY,
    valor TEXT
  );
  CREATE TABLE IF NOT EXISTS tokensmod (
    clave TEXT PRIMARY KEY,
    valor TEXT
  );
  CREATE TABLE IF NOT EXISTS pokemon (
    chatId TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS pokemonBattles (
    battleId TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS pokemonShop (
    chatId TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS pokemonTrades (
    tradeId TEXT PRIMARY KEY,
    data TEXT
  );
`)

global.db = {
  conn,
  data: {
    users: {},
    chats: {},
    settings: {},
    tokens: {},
    tokensmod: {},
    pokemon: {},
    pokemonBattles: {},
    pokemonShop: {},
    pokemonTrades: {}
  },
  chain: null,
  READ: false,
  _snapshot: {
    users: '{}',
    chats: '{}',
    settings: '{}',
    tokens: '{}',
    tokensmod: '{}',
    pokemon: '{}',
    pokemonBattles: '{}',
    pokemonShop: '{}',
    pokemonTrades: '{}'
  }
}

global.DATABASE = global.db

global.loadDatabase = function loadDatabase() {
  if (global.db.READ) return global.db.data
  global.db.READ = true

  const usuarios = conn.prepare(`SELECT key, data FROM usuarios`).all()
  for (const row of usuarios) {
    try { global.db.data.users[row.key] = JSON.parse(row.data) } catch {}
  }

  const chats = conn.prepare(`SELECT id, contenido FROM chats`).all()
  for (const row of chats) {
    try { global.db.data.chats[row.id] = JSON.parse(row.contenido) } catch {}
  }

  const settings = conn.prepare(`SELECT clave, valor FROM settings`).all()
  for (const row of settings) {
    try { global.db.data.settings[row.clave] = JSON.parse(row.valor) } catch {}
  }

  const tokens = conn.prepare(`SELECT clave, valor FROM tokens`).all()
  for (const row of tokens) {
    try { global.db.data.tokens[row.clave] = JSON.parse(row.valor) } catch {}
  }

  const tokensmod = conn.prepare(`SELECT clave, valor FROM tokensmod`).all()
  for (const row of tokensmod) {
    try { global.db.data.tokensmod[row.clave] = JSON.parse(row.valor) } catch {}
  }

  const pokemons = conn.prepare(`SELECT chatId, data FROM pokemon`).all()
  for (const row of pokemons) {
    try { global.db.data.pokemon[row.chatId] = JSON.parse(row.data) } catch {}
  }

  const battles = conn.prepare(`SELECT battleId, data FROM pokemonBattles`).all()
  for (const row of battles) {
    try { global.db.data.pokemonBattles[row.battleId] = JSON.parse(row.data) } catch {}
  }

  const shops = conn.prepare(`SELECT chatId, data FROM pokemonShop`).all()
  for (const row of shops) {
    try { global.db.data.pokemonShop[row.chatId] = JSON.parse(row.data) } catch {}
  }

  const trades = conn.prepare(`SELECT tradeId, data FROM pokemonTrades`).all()
  for (const row of trades) {
    try { global.db.data.pokemonTrades[row.tradeId] = JSON.parse(row.data) } catch {}
  }

  global.db.chain = _.chain(global.db.data)
  global.db.READ = false

  global.db._snapshot.users = JSON.stringify(global.db.data.users)
  global.db._snapshot.chats = JSON.stringify(global.db.data.chats)
  global.db._snapshot.settings = JSON.stringify(global.db.data.settings)
  global.db._snapshot.tokens = JSON.stringify(global.db.data.tokens)
  global.db._snapshot.tokensmod = JSON.stringify(global.db.data.tokensmod)
  global.db._snapshot.pokemon = JSON.stringify(global.db.data.pokemon)
  global.db._snapshot.pokemonBattles = JSON.stringify(global.db.data.pokemonBattles)
  global.db._snapshot.pokemonShop = JSON.stringify(global.db.data.pokemonShop)
  global.db._snapshot.pokemonTrades = JSON.stringify(global.db.data.pokemonTrades)

  return global.db.data
}

function hasPendingChanges() {
  const { users, chats, settings, tokens, tokensmod, pokemon, pokemonBattles, pokemonShop, pokemonTrades } = global.db.data
  const snap = global.db._snapshot

  return (
    snap.users !== JSON.stringify(users) ||
    snap.chats !== JSON.stringify(chats) ||
    snap.settings !== JSON.stringify(settings) ||
    snap.tokens !== JSON.stringify(tokens) ||
    snap.tokensmod !== JSON.stringify(tokensmod) ||
    snap.pokemon !== JSON.stringify(pokemon) ||
    snap.pokemonBattles !== JSON.stringify(pokemonBattles) ||
    snap.pokemonShop !== JSON.stringify(pokemonShop) ||
    snap.pokemonTrades !== JSON.stringify(pokemonTrades)
  )
}

global.saveDatabase = function saveDatabase() {
  if (!hasPendingChanges()) return

  const { users, chats, settings, tokens, tokensmod, pokemon, pokemonBattles, pokemonShop, pokemonTrades } = global.db.data

  const insertUser = conn.prepare(`REPLACE INTO usuarios (key, data) VALUES (?, ?)`)
  for (const [key, data] of Object.entries(users)) {
    insertUser.run(key, JSON.stringify(data))
  }

  const insertChat = conn.prepare(`REPLACE INTO chats (id, contenido) VALUES (?, ?)`)
  for (const [id, contenido] of Object.entries(chats)) {
    insertChat.run(id, JSON.stringify(contenido))
  }

  const insertSetting = conn.prepare(`REPLACE INTO settings (clave, valor) VALUES (?, ?)`)
  for (const [clave, valor] of Object.entries(settings)) {
    insertSetting.run(clave, JSON.stringify(valor))
  }

  const insertToken = conn.prepare(`REPLACE INTO tokens (clave, valor) VALUES (?, ?)`)
  for (const [clave, valor] of Object.entries(tokens)) {
    insertToken.run(clave, JSON.stringify(valor))
  }

  const insertTokenMod = conn.prepare(`REPLACE INTO tokensmod (clave, valor) VALUES (?, ?)`)
  for (const [clave, valor] of Object.entries(tokensmod)) {
    insertTokenMod.run(clave, JSON.stringify(valor))
  }

  const insertPokemon = conn.prepare(`REPLACE INTO pokemon (chatId, data) VALUES (?, ?)`)
  for (const [chatId, data] of Object.entries(pokemon)) {
    insertPokemon.run(chatId, JSON.stringify(data))
  }

  const insertBattle = conn.prepare(`REPLACE INTO pokemonBattles (battleId, data) VALUES (?, ?)`)
  for (const [battleId, data] of Object.entries(pokemonBattles)) {
    insertBattle.run(battleId, JSON.stringify(data))
  }

  const insertShop = conn.prepare(`REPLACE INTO pokemonShop (chatId, data) VALUES (?, ?)`)
  for (const [chatId, data] of Object.entries(pokemonShop)) {
    insertShop.run(chatId, JSON.stringify(data))
  }

  const insertTrade = conn.prepare(`REPLACE INTO pokemonTrades (tradeId, data) VALUES (?, ?)`)
  for (const [tradeId, data] of Object.entries(pokemonTrades)) {
    insertTrade.run(tradeId, JSON.stringify(data))
  }

  global.db._snapshot.users = JSON.stringify(users)
  global.db._snapshot.chats = JSON.stringify(chats)
  global.db._snapshot.settings = JSON.stringify(settings)
  global.db._snapshot.tokens = JSON.stringify(tokens)
  global.db._snapshot.tokensmod = JSON.stringify(tokensmod)
  global.db._snapshot.pokemon = JSON.stringify(pokemon)
  global.db._snapshot.pokemonBattles = JSON.stringify(pokemonBattles)
  global.db._snapshot.pokemonShop = JSON.stringify(pokemonShop)
  global.db._snapshot.pokemonTrades = JSON.stringify(pokemonTrades)
}

let lastSave = Date.now()

setInterval(() => {
  const now = Date.now()
  const elapsed = now - lastSave

  if (elapsed >= 1000 && hasPendingChanges()) {
    global.saveDatabase()
    lastSave = now
  }
}, 500)

export default global.db
