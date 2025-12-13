import fetch from 'node-fetch';
import { getDevice } from '@whiskeysockets/baileys';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment-timezone';

export default {
  command: ['allmenu', 'help', 'menu'],
  category: 'info',
  run: async (client, m, args) => {
    try {
      const now = new Date();
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      const tiempo = colombianTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/,/g, '');
      const tiempo2 = moment.tz('America/Bogota').format('hh:mm A');

      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || '';
      const botSettings = global.db.data.settings[botId] || {};
      const botname = botSettings.namebot || '';
      const botname2 = botSettings.namebot2 || '';
      const banner = botSettings.banner || '';
      const owner = botSettings.owner || '';
      const canalId = botSettings.id || '';
      const canalName = botSettings.nameid || '';
      const link = botSettings.link || bot.api;

      const prefix = botSettings.prefijo

      const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net';
      const botType = isOficialBot
        ? 'Principal/Owner'
            : 'Sub Bot';
      const users = Object.keys(global.db.data.users).length;
      const device = getDevice(m.key.id);
      const sender = global.db.data.users[m.sender].name;

const time = client.uptime ? formatearMs(Date.now() - client.uptime) : "Desconocido"

      let menu = `> . ﹡ ﹟ 🌹 ׄ ⬭ *¡ʜᴏʟᴀ!* @$sender

*ㅤꨶ〆⁾ ㅤׄㅤ⸼ㅤׄ *͜🌱* ㅤ֢ㅤ⸱ㅤᯭִ*
ׅㅤ𓏸𓈒ㅤׄ *ᴅᴇᴠᴇʟᴏᴘᴇʀ ::* $owner
ׅㅤ𓏸𓈒ㅤׄ *ᴛɪᴘᴏ ::* $botType
ׅㅤ𓏸𓈒ㅤׄ *sɪsᴛᴇᴍᴀ/ᴏᴘʀ ::* $device

ׅㅤ𓏸𓈒ㅤׄ *ᴛɪᴍᴇ ::* $tiempo, $tiempo2
ׅㅤ𓏸𓈒ㅤׄ *ᴜsᴇʀs ::* $users
ׅㅤ𓏸𓈒ㅤׄ *ᴜᴘᴛɪᴍᴇ ::* $uptime
ׅㅤ𓏸𓈒ㅤׄ *ᴜʀʟ ::* $link

乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ᴀɴɪᴍᴇ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ peek + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ comfort + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ thinkhard + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ curious + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ sniff + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ stare + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ trip + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ blowkiss + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ snuggle + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ angry + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bleh + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bored › aburrido + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ clap + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ coffee › cafe + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ cold + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ sing + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ tickle + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ scream + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ push + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ nope + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ jump + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ heat + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ gaming + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ draw + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ call + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ dramatic › drama + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ drunk + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ impregnate › preg + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ kisscheek › beso + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ laugh + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ love › amor + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ pout + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ punch + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ run › correr + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ sad › triste + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ scared + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ seduce + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ shy › timido + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ sleep + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ smoke › fumar + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ spit › escupir + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ step › pisar + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ think + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ walk + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ hug + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ kill + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ eat › nom › comer + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ kiss › muak + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ wink + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ pat + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ happy › feliz + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bully + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bite › morder + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ blush + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ wave + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bath + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ smug + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ smile + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ highfive + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ handhold + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ cringe + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ bonk + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ cry + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ lick + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ slap + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ dance + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ cuddle + _<mention>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ᴅᴏᴡɴʟᴏᴀᴅs ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ facebook › fb + _<url>_
֯　ׅ🍃ֶ֟፝֯ㅤ mediafire › mf + _<query|url>_
֯　ׅ🍃ֶ֟፝֯ㅤ instagram › ig + _<url>_
֯　ׅ🍃ֶ֟፝֯ㅤ tiktok › tt + _<url|query>_
֯　ׅ🍃ֶ֟፝֯ㅤ play › mp3 › playaudio › ytaudio › ytmp3 + _<url|query>_
֯　ׅ🍃ֶ֟፝֯ㅤ play2 › mp4 › playvideo › ytvideo › ytmp4 + _<url|query>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ᴇᴄᴏɴᴏᴍɪᴀ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ balance › bal + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ steal › rob › robar + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ crime 
֯　ׅ🍃ֶ֟፝֯ㅤ ritual 
֯　ׅ🍃ֶ֟፝֯ㅤ givecoins › pay › coinsgive + _<cantidad|all>_ + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ ppt + _<piedra|papel|tijera>_
֯　ׅ🍃ֶ֟፝֯ㅤ waittimes › cooldowns › economyinfo › einfo 
֯　ׅ🍃ֶ֟፝֯ㅤ economyboard › baltop › eboard + _<página>_
֯　ׅ🍃ֶ֟፝֯ㅤ slut 
֯　ׅ🍃ֶ֟፝֯ㅤ mine 
֯　ׅ🍃ֶ֟፝֯ㅤ rt › roulette › ruleta + _<cantidad>_ + _<red|black|green>_
֯　ׅ🍃ֶ֟፝֯ㅤ coinflip › flip › cf + _<bet>_
֯　ׅ🍃ֶ֟፝֯ㅤ daily 
֯　ׅ🍃ֶ֟፝֯ㅤ monthly › mensual 
֯　ׅ🍃ֶ֟፝֯ㅤ weekly › semanal 
֯　ׅ🍃ֶ֟፝֯ㅤ work › w 
֯　ׅ🍃ֶ֟፝֯ㅤ math › matematicas + _<dificultad>_
֯　ׅ🍃ֶ֟፝֯ㅤ deposit › dep › d + _<cantidad|all>_
֯　ׅ🍃ֶ֟፝֯ㅤ withdraw › with + _<cantidad|all>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ɢʀᴜᴘᴏ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ bot + _<on|off>_
֯　ׅ🍃ֶ֟፝֯ㅤ promote + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ demote + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ setprimary + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ warn + _<mention>_ + _<razón>_
֯　ׅ🍃ֶ֟፝֯ㅤ warns + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ delwarn + _<mention> <número|all>_
֯　ׅ🍃ֶ֟፝֯ㅤ setwarnlimit + _<número>_
֯　ׅ🍃ֶ֟፝֯ㅤ clear + _<delete|views>_
֯　ׅ🍃ֶ֟፝֯ㅤ setgpbaner 
֯　ׅ🍃ֶ֟፝֯ㅤ setgpname + _<text>_
֯　ׅ🍃ֶ֟፝֯ㅤ setgpdesc + _<text>_
֯　ׅ🍃ֶ֟፝֯ㅤ closet › open 
֯　ׅ🍃ֶ֟፝֯ㅤ welcome › bienvenidas › alerts › alertas › gacha › rpg › economy › economia › adminonly › onlyadmin › antilinks › antilink › antienlaces + _<on|off>_
֯　ׅ🍃ֶ֟፝֯ㅤ groupinfo › gp 
֯　ׅ🍃ֶ֟፝֯ㅤ tag › hidetag + _<text>_
֯　ׅ🍃ֶ֟፝֯ㅤ kick + _<mention>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ɪᴀ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ ia › chatgpt + _<query>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ɪɴғᴏ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ allmenu › menu › help + _<category>_
֯　ׅ🍃ֶ֟፝֯ㅤ infobot › infosocket  
֯　ׅ🍃ֶ֟፝֯ㅤ ping › p 
֯　ׅ🍃ֶ֟፝֯ㅤ status 
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ɴsғᴡ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ xnxx + _<query|url>_
֯　ׅ🍃ֶ֟፝֯ㅤ xvideos + _<query|url>_
֯　ׅ🍃ֶ֟፝֯ㅤ danbooru › dbooru + _<tag>_
֯　ׅ🍃ֶ֟፝֯ㅤ gelbooru › gbooru + _<tag>_
֯　ׅ🍃ֶ֟፝֯ㅤ blowjob › bj + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ boobjob + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ cum + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ fap › paja + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ anal + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ grabboobs + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ footjob + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ grope + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ undress › encuerar + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ sixnine › 69 + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ lickpussy + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ spank › nalgada + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ fuck › coger + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ suckboobs + _<mention>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ᴘʀᴏғɪʟᴇ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ level › levelup › lvl + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ marry + _<mention>_
֯　ׅ🍃ֶ֟፝֯ㅤ divorce 
֯　ׅ🍃ֶ֟፝֯ㅤ profile › perfil 
֯　ׅ🍃ֶ֟፝֯ㅤ setbirth + _<diamesaño|mesdia>_
֯　ׅ🍃ֶ֟፝֯ㅤ setpasatiempo › sethobby 
֯　ׅ🍃ֶ֟፝֯ㅤ delbirth 
֯　ׅ🍃ֶ֟፝֯ㅤ delpasatiempo › removehobby 
֯　ׅ🍃ֶ֟፝֯ㅤ setdescription › setdesc + _<text>_
֯　ׅ🍃ֶ֟፝֯ㅤ deldescription › deldesc 
֯　ׅ🍃ֶ֟፝֯ㅤ setgenre + _<hombre|mujer>_
֯　ׅ🍃ֶ֟፝֯ㅤ delgenre 
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ sᴇᴀʀᴄʜ ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ pinterest › pin + _<query>_
֯　ׅ🍃ֶ֟፝֯ㅤ imagen › img + _<query>_
֯　ׅ🍃ֶ֟፝֯ㅤ aptoide › apk › apkdl + _<query>_
֯　ׅ🍃ֶ֟፝֯ㅤ ytsearch › search + _<query>_
֯　ׅ🍃ֶ֟፝֯ㅤ ttsearch › tiktoksearch › tts + _<query>_
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ sᴏᴄᴋᴇᴛs ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ bots › sockets 
֯　ׅ🍃ֶ֟፝֯ㅤ logout 
֯　ׅ🍃ֶ֟፝֯ㅤ code 
֯　ׅ🍃ֶ֟፝֯ㅤ self + _<on|off>_
֯　ׅ🍃ֶ֟፝֯ㅤ setusername + _<value>_
֯　ׅ🍃ֶ֟፝֯ㅤ setbanner
֯　ׅ🍃ֶ֟፝֯ㅤ seticon
֯　ׅ🍃ֶ֟፝֯ㅤ setbotowner + _<value>_
֯　ׅ🍃ֶ֟፝֯ㅤ setchannel + _<enlace>_
֯　ׅ🍃ֶ֟፝֯ㅤ setbotname › setname + _<value>_
֯　ׅ🍃ֶ֟፝֯ㅤ setbotcurrency + _<value>_
֯　ׅ🍃ֶ֟፝֯ㅤ setstatus + _<value>_
֯　ׅ🍃ֶ֟፝֯ㅤ setpfp › setimage 
֯　ׅ🍃ֶ֟፝֯ㅤ leave 
*.・。.・゜✭・ . ・✫・゜・。.*

  ׄꤥ ╾ׅ╼ㅤׄㅤꤪꤨ ᴜᴛɪʟs ㅤꤪꤨ╾ׅ╼ㅤׄꤥㅤׅ
֯　ׅ🍃ֶ֟፝֯ㅤ sticker › s  
֯　ׅ🍃ֶ֟፝֯ㅤ getpic › pfp + _<mention>_ 
֯　ׅ🍃ֶ֟፝֯ㅤ translate + _<idioma>_ + _<text>_
֯　ׅ🍃ֶ֟፝֯ㅤ get + _<url>_
֯　ׅ🍃ֶ֟፝֯ㅤ setmeta + _<packname> | <author>_ 
*.・。.・゜✭・ . ・✫・゜・。.*`.trim();

      const replacements = {
        $owner: owner ? (!isNaN(owner.replace(/@s\.whatsapp\.net$/, '')) ? `@${owner.split('@')[0]}` : owner) : 'Oculto por privacidad',
        $botType: botType,
        $device: device,
        $tiempo: tiempo,
        $tiempo2: tiempo2,
        $users: users.toLocaleString() || '0',
        $link: link,
        $sender: sender,
        $botname2: botname2,
        $botname: botname2,
        $namebot: botname2,
        $prefix: prefix,
        $uptime: time
      };

      for (const [key, value] of Object.entries(replacements)) {
        menu = menu.replace(new RegExp(`\\${key}`, 'g'), value);
      }

      if (banner.endsWith('.mp4') || banner.endsWith('.gif') || banner.endsWith('.webm')) {
        await client.sendMessage(
          m.chat,
          {
            video: { url: banner },
            gifPlayback: true,
            caption: menu,
            contextInfo: {
              mentionedJid: [owner, m.sender],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: canalId,
                serverMessageId: '0',
                newsletterName: canalName
              }
            }
          },
          { quoted: m }
        );
      } else {
        await client.sendMessage(
          m.chat,
          {
            text: menu,
            contextInfo: {
              mentionedJid: [owner, m.sender],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: canalId,
                serverMessageId: '0',
                newsletterName: canalName
              },
              externalAdReply: {
                title: botname,
                body: dev,
                showAdAttribution: false,
                thumbnailUrl: banner,
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true
              }
            }
          },
          { quoted: m }
        );
      }
    } catch (e) {
      await m.reply(msgglobal);
    }
  }
};

function formatearMs(ms) {
  const segundos = Math.floor(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  return [dias && `${dias}d`, `${horas % 24}h`, `${minutos % 60}m`, `${segundos % 60}s`].filter(Boolean).join(" ");
}