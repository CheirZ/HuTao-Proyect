let handler = async (m, { conn, usedPrefix, command }) => {

    try {
        m.reply(`[ ✿ ] *HuTao* se estará reiniciando...\n> Espere mienstras el Socket se reinicia. (✿❛◡❛)`)
        setTimeout(() => {
            process.exit(0)
        }, 3000) 
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, `⚠︎ *Error:* ${error}`, m)
    }
}

handler.command = ['restart', 'reiniciar']
handler.rowner = true

export default handler