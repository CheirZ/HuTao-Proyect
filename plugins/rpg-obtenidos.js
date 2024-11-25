/*
• @David-Chian
- https://github.com/David-Chian
*/

import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const obtenerDatos = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } else {
        return { usuarios: {}, personajesReservados: [] };
    }
};
const verifi = () => {
        try {
            const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
            if (packageJson.name !== 'HuTao-Proyect') return false;
            if (packageJson.repository.url !== 'git+https://github.com/CheirZ/HuTao-Proyect.git') return false;
            if (SECRET_KEY !== 'ir83884kkc82k393i48') return false;
            return true;       
        } catch (error) {
            console.error('Error al leer package.json:', error);
            return false;
        }
    };
const personajes = fs.existsSync('./src/JSON/characters.json') ? JSON.parse(fs.readFileSync('./src/JSON/characters.json', 'utf-8')) : [];

const contarTotalPersonajes = () => personajes.length;

const ITEMS_PER_PAGE = 10;

const mostrarInventario = async (conn, m, userData, totalCharacters, currentPage) => {
    const { characters, totalRwcoins } = userData.usuarios[m.sender] || { characters: [], totalRwcoins: 0 };
    const characterCount = characters.length;
    const totalPages = Math.ceil(characterCount / ITEMS_PER_PAGE);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const charactersToShow = characters.slice(start, end);
    let personajesObtenidos = new Set();
    Object.values(userData.usuarios).forEach(user => {
        user.characters.forEach(character => personajesObtenidos.add(character.name));
    });
let availableCharacters = personajes.filter(p => !personajesObtenidos.has(p.name));
    let availableCount = availableCharacters.length;
    
    const inventarioMensaje = `*╭ᚚᚚᚚⷩᚚͧᚚⷮᚚᷧᚚⷴᚚᚚᚚᷮᚚᷢᚚⷪᚚⷱᚚⷥᚚⷭᚚⷮᚚᚚ*
├ _*𝑇𝑈 𝐼𝑁𝑉𝐸𝑁𝑇𝐴𝑅𝐼𝑂*_
├▹ *𝑃𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒𝑠 𝑟𝑒𝑙𝑎𝑚𝑎𝑠𝑜𝑠:*
├╾  *${characterCount} 𝑊𝐹*
├▹ *𝑃𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒𝑠 𝐷𝑖𝑠𝑝𝑜𝑛𝑖𝑏𝑙𝑒𝑠:*
├╾ _${availableCount} de ${totalCharacters} en total_
├▹ _*𝑃𝑜𝑟𝑐𝑒𝑛𝑡𝑎𝑗𝑒:*_
├╾  ${(characterCount / totalCharacters * 100).tofixed(2)}%
├▹ _*𝑇𝑜𝑡𝑎𝑙 𝐷𝑒 𝑾𝑭𝐶𝑜𝑖𝑛𝑠*_
├╾ *${totalRwcoins}*
*╰╍╌╌╌╌╌╌╌╌╌╌╌╌╌╌╾*
𝑇𝑢𝑠 𝑃𝑒𝑟𝑠𝑜𝑛𝑎𝑗𝑒𝑠:
${charactersToShow.map((character, index) => `▢ ${start + index + 1}. ${character.name}`).join('\n')}
𝑃𝑎́𝑔𝑖𝑛𝑎 ${currentPage} 𝑑𝑒 ${totalPages}`;
    await conn.reply(m.chat, inventarioMensaje, m);
};

let handler = async (m, { conn, usedPrefix: prefijo, command }) => {
    const userId = m.sender;
    let userData = obtenerDatos();
    let totalCharacters = contarTotalPersonajes();  
    if (!verifi()) {
        await conn.reply(m.chat, '𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒔𝒐𝒍𝒐 𝒆𝒔𝒕𝒂 𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆 𝒑𝒂𝒓𝒂 𝑯𝒖𝑻𝒂𝒐-𝑷𝒓𝒐𝒚𝒆𝒄𝒕.\n👻 https://github.com/CheirZ/HuTao-Proyect', m, rcanal);
        return;
    }
    if (!userData.usuarios || !(userId in userData.usuarios) || userData.usuarios[userId].characters.length === 0) {
        conn.reply(m.chat, "*No tienes ningún objeto en tu inventario 😹🫵!*", m);
        return;
    }

    const characterCount = userData.usuarios[userId].characters.length;
    const totalPages = Math.ceil(characterCount / ITEMS_PER_PAGE);
    let currentPage = 1;

    if (command === 'nex') currentPage++;
    if (command === 'return') currentPage--;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    await mostrarInventario(conn, m, userData, totalCharacters, currentPage);
};

handler.help = ['obtenidos'];
handler.tags = ['rollwaifu'];
handler.command = ['obtenidos', 'nex', 'return', 'ob'];

export default handler;