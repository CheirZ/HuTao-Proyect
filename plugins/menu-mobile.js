let handler = async (m, { conn, usedPrefix }) => {
  try {
    let name = await conn.getName(m.sender)
    let { level, exp } = global.db.data.users[m.sender]
    
    let iphoneCompatibleMenu = `
========================
⚡ HUTAO CYBER MOBILE ⚡
========================

USER: *${name}*

--- 🎵 AUDIO ---
${usedPrefix}play [song] - Music DL
${usedPrefix}spotify [url] - Spotify

--- 📹 VIDEO ---
${usedPrefix}ytv [name] - YouTube
${usedPrefix}tiktok [url] - TikTok
${usedPrefix}ig [url] - Instagram

--- 🎨 GRAPHICS ---
${usedPrefix}s - Make sticker  
${usedPrefix}sticker - Animated

--- 🧠 NEURAL AI ---
${usedPrefix}ia [question] - ChatGPT
${usedPrefix}gemini [text] - Google AI

--- 🔍 SCANNER ---
${usedPrefix}google [search]
${usedPrefix}imagen [search]
${usedPrefix}pinterest [search]

--- 🎮 ARCADE ---
${usedPrefix}meme - Random memes
${usedPrefix}chiste - Jokes
${usedPrefix}juegos - Game list

--- 👥 NETWORK ---
${usedPrefix}config - Bot config
${usedPrefix}admin - Admin tools

========================
👤 PROFILE: LVL ${level} | ${exp} XP
========================

--- ⚡ SYSTEM ---
${usedPrefix}menu - Full interface
${usedPrefix}info - Bot status
${usedPrefix}ping - Connection

✅ MOBILE OPTIMIZED:
📱 iPhone | 🤖 Android | 💻 Web

========================
© HUTAO CYBER SYSTEM
========================
    `

    await m.react('📱')
    
    // Enviar con imagen del perfil del usuario
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')
    
    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: iphoneCompatibleMenu.trim(),
      contextInfo: {
        externalAdReply: {
          title: "📱 HuTao Mobile - iPhone Compatible",
          body: "⚡ Cyber System - iPhone Optimized",
          thumbnailUrl: pp,
          sourceUrl: global.channelURL || "https://github.com/CheirZ",
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
    
  } catch (e) {
    // Menú de emergencia iPhone compatible
    await conn.reply(m.chat, `
========================
⚠️ EMERGENCY MODE ⚠️
========================

🎵 ${usedPrefix}play [music]
📹 ${usedPrefix}ytv [video]
🎨 ${usedPrefix}s (sticker)
🧠 ${usedPrefix}ia [question]
🔍 ${usedPrefix}google [search]

Full menu: ${usedPrefix}menu

⚠️ Error: ${e.message}

========================
SYSTEM RECOVERY...
========================
    `, m)
  }
}

handler.help = ['menumovil', 'mm', 'mobilemenu']
handler.tags = ['main'] 
handler.command = ['menumovil', 'mm', 'mobile', 'movil', 'mobilemenu']

export default handler