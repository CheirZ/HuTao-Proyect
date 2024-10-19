import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) throw conn.reply(m.chat, `🚩 *Formato incorrecto*\n*Ejemplo:*\n\n${usedPrefix + command} IPhone`, m);
        
        let res = await amazonSearch(text);
        let resultsMessage = '`🚩 A M A Z O N 🚩`\n\n';
        const limit = 15;

        for (let i = 0; i < limit && i < res.results.length; i++) {
            let link = res.results[i].link.length > 30 ? res.results[i].link.substring(0, 30) + '...' : res.results[i].link;
            resultsMessage += `*• Nombre:* ${res.results[i].title}\n*• Precio:* ${res.results[i].price}\n*• Link:* ${link}\n`;
            resultsMessage += '\n' + '••••••••••••••••••••••••' + '\n';
        }

        conn.reply(m.chat, resultsMessage, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `🚩 *Error al buscar en Amazon*`, m);
    }
};

handler.help = ['amazon <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['amazon'];
handler.grpup = true

export default handler;

async function amazonSearch(query) {
    try {
        const url = `http://n3.boxmine.xyz:3344/amazonsearch?q=${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectar con la API de Amazon');
    }
}
