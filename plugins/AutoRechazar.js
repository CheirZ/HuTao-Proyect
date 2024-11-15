import db from '../lib/database.js'
let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin} ) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (isBotAdmin && chat.autoRechazar) {
if (m.sender.startsWith('6' || '6')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('57' || '57')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('90' || '90')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('212' || '212')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('92' || '92')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('93' || '93')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('94' || '94')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('7' || '7')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('49' || '49')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('2' || '2')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('91' || '91')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')}

if (m.sender.startsWith('48' || '48')) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'reject')} 
}}
export default handler