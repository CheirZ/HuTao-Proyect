import fetch from 'node-fetch';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fs from "fs";
import yts from 'yt-search';
import ytmp33 from '../lib/ytmp33.js';
import ytmp44 from '../lib/ytmp44.js';
import {generateWAMessageFromContent} from '@whiskeysockets/baileys';

let limit1 = 100;
let limit2 = 400;
let limit_a1 = 50;
let limit_a2 = 400;

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  const datas = global;

  if (!text) throw `_* DESCARGAS (￣へ ￣ )*_\n\n*[ ⚠︎] 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 𝚊𝚕𝚐𝚘 𝚘 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚕𝚒𝚗𝚔 𝚍𝚎 𝚢𝚘𝚞𝚝𝚞𝚋𝚎.*\n\n*[ ⌨︎] 𝙴𝚓𝚎𝚖𝚙𝚕𝚘:* _${usedPrefix + command} mi nube city`;

  const yt_play = await search(args.join(' '));
  let additionalText = '';
  if (command === 'play5') {
    additionalText = 'audio';
  } else if (command === 'play6') {
    additionalText = 'vídeo';
  }

  const texto1 = `_*DESCARGAS - HuTao*_\n╭───────┈♡┈──────\n│𐇵 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${yt_play[0].title}\n│𖦹 *🄿🅄🄱🄻🄸🄲🄰🄲🄸🄾🄽* ${yt_play[0].ago}\n│ ߷ *d̑̈ȗ̈ȓ̈ȃ̈c̑̈ȋ̈ȏ̈n̑̈*${secondString(yt_play[0].duration.seconds)}\n│❀ *v̆̈ĭ̈s̆̈t̆̈ă̈s̆̈*${MilesNumber(yt_play[0].views)}\n│𖣘 *𝒂𝒖𝒕𝒐𝒓* ${yt_play[0].author.name}\n│★ *Iᗪ* ${yt_play[0].videoId}\n│✵ *𝙩𝙞𝙥𝙤:* ${yt_play[0].type}\n│۞ *𝘦𝘯𝘭𝘢𝘤𝘦:* ${yt_play[0].url}\n│✫ *𝖺𝗎𝗍𝗈𝗋:* ${yt_play[0].author.url}\n╰───────┈♢┈──────\n> *[ ♪♪ ] _𝐒𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 ${additionalText}. 𝐞𝐬𝐩𝐞𝐫𝐞..._`.trim();

  const externalAdReply = {
    title: 'ఌ︎ꨄ︎d͟e͟s͟c͟a͟r͟g͟a͟s͟ఌ︎ꨄ︎',
    body: '*＊✿❀𝐇𝐮𝐓𝐚𝐨-𝐌𝐃❀✿＊*',
    sourceUrl: global.cn,
    thumbnail: global.logo7
  };

  conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply } }, { quoted: m });

  if (command === 'play5') {
    try {
      const { status, resultados, error } = await ytmp33(yt_play[0].url);
      if (!status) throw new Error(error);

      const ttl = resultados.titulo;
      const buff_aud = await getBuffer(resultados.descargar);
      const fileSizeInBytes = buff_aud.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const size = fileSizeInMB.toFixed(2);

      if (size >= limit_a2) {
        await conn.sendMessage(m.chat, { text: `[ ⚠︎ ] Descargue su audio en:* _${resultados.descargar}_` }, { quoted: m });
        return;
      }
      if (size >= limit_a1 && size <= limit_a2) {
        await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      }
    } catch (error) {
      console.log('Fallo el 1: ' + error)
      try {
        const audio = `${global.MyApiRestBaseUrl}/api/v1/ytmp3?url=${yt_play[0].url}&apikey=${global.MyApiRestApikey}`;
        const ttl = await yt_play[0].title;
        const buff_aud = await getBuffer(audio);
        const fileSizeInBytes = buff_aud.byteLength;
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
        const size = fileSizeInMB.toFixed(2);

        if (size >= limit_a2) {
          await conn.sendMessage(m.chat, { text: `[ ⚠︎ ] Descargue su audio en:* _${audio}_` }, { quoted: m });
          return;
        }
        if (size >= limit_a1 && size <= limit_a2) {
          await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
          return;
        } else {
          await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
          return;
        }
      } catch {
        throw '*[ ⚠︎ ] O̶c̶u̶r̶r̶i̶ó ̶u̶n ̶e̶r̶r̶o̶r. 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐭𝐞́𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦𝐚́𝐬 𝐭𝐚𝐫𝐝𝐞.*';
      }
    }
  }

  if (command === 'play6') {
    try {
      const { status, resultados, error } = await ytmp44(yt_play[0].url);
      if (!status) throw new Error(error);

      const ttl2 = resultados.titulo;
      const buff_vid = await getBuffer(resultados.descargar);
      const fileSizeInBytes2 = buff_vid.byteLength;
      const fileSizeInKB2 = fileSizeInBytes2 / 1024;
      const fileSizeInMB2 = fileSizeInKB2 / 1024;
      const size2 = fileSizeInMB2.toFixed(2);

      if (size2 >= limit2) {
        await conn.sendMessage(m.chat, { text: `*[ ⚠︎ ] Descargue su vídeo en:* _${resultados.descargar}_` }, { quoted: m });
        return;
      }
      if (size2 >= limit1 && size2 <= limit2) {
        await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      }
    } catch (error) {
      console.log('Fallo el 1: ' + error);
      try {
        const video = `${global.MyApiRestBaseUrl}/api/v1/ytmp4?url=${yt_play[0].url}&apikey=${global.MyApiRestApikey}`;
        const ttl2 = await yt_play[0].title;
        const buff_vid = await getBuffer(video);
        const fileSizeInBytes2 = buff_vid.byteLength;
        const fileSizeInKB2 = fileSizeInBytes2 / 1024;
        const fileSizeInMB2 = fileSizeInKB2 / 1024;
        const size2 = fileSizeInMB2.toFixed(2);

        if (size2 >= limit2) {
          await conn.sendMessage(m.chat, { text: `*[ ⚠︎ ] Descargue su vídeo en:* _${video}_` }, { quoted: m });
          return;
        }
        if (size2 >= limit1 && size2 <= limit2) {
          await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
          return;
        } else {
          await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
          return;
        }
      } catch {
        throw '*[ ⚠︎ ] ̶O̶̶c̶̶u̶̶r̶̶r̶̶i̶̶ó ̶̶u̶̶n ̶̶e̶̶r̶̶r̶̶o̶̶r. 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐭𝐞́𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦𝐚́𝐬 𝐭𝐚𝐫𝐝𝐞.*';
      }
    }
  }
};

handler.command = ['play5','play6'];
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? 'd ' : 'd ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? 'h ' : 'h ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? 'm ' : 'm ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

const getBuffer = async (url, options) => {
    options ? options : {};
    const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1,}, ...options, responseType: 'arraybuffer'});
    return res.data;
};