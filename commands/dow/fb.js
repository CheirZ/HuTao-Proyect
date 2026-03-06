export default {
  command: ['fb', 'facebook'],
  category: 'downloader',
  run: async (client, m, args) => {

    if (!args[0]) {
      return m.reply('ꕥ Ingrese un enlace de *Facebook*')
    }

    if (!args[0].match(/facebook\.com|fb\.watch|video\.fb\.com/)) {
      return m.reply('《✧》Por favor, envía un link de Facebook válido')
    }

    try {
      const videoUrl = ` ${api.url2}/dl/facebook2?url=${args[0]}&key=${api.key2} `

      const response = await fetch(videoUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const buffer = Buffer.from(await response.arrayBuffer())

      const caption = `ㅤ۟∩　ׅ　★　ׅ　🅕𝖡 🅓ownload　ׄᰙ　

𖣣ֶㅤ֯⌗ ☆  ׄ ⬭ *Enlace* › ${args[0]}`

      await client.sendMessage(
        m.chat,
        { video: buffer, caption, mimetype: 'video/mp4', fileName: 'fb.mp4' },
        { quoted: m }
      )
    } catch (e) {
      await m.reply('ꕥ Error: ' + e.message)
    }
  }
}
