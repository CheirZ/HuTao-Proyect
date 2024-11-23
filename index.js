import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import boxen from 'boxen'
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'
console.log('\n✰ Iniciando HutaoProyect ✰')
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { name, description, collaborators, author, version } = require(join(__dirname, './package.json'))
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
const subtitleStyle = chalk.white.bold
const responseStyle = chalk.dim.bold

let activeCollaborators = ''
for (const key in collaborators) {
if (collaborators.hasOwnProperty(key)) {
activeCollaborators += collaborators[key] + ', '
}}
activeCollaborators = activeCollaborators.slice(0, -2);
cfonts.say('hutao\nproyect', {
align: 'center',           
gradient: ['red', 'blue'] 
})
cfonts.say(description, {
font: 'console',
align: 'center',
gradient: ['blue', 'magenta']
})
/* const message = `${subtitleStyle('Desarrollado por »')} ${responseStyle(author.name)}
${subtitleStyle('Código basado por »')} ${responseStyle('BrunoSobrino')}
${subtitleStyle('Colaboradores activos »')} ${responseStyle(activeCollaborators)}
${subtitleStyle('Versión »')} ${responseStyle(version)}`
console.log(boxen(message, { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'blue', float: 'center', }))*/
var isRunning = false
function start(file) {
if (isRunning) return
isRunning = true
let args = [join(__dirname, file), ...process.argv.slice(2)]
setupMaster({
exec: args[0],
args: args.slice(1),
})
let p = fork()
p.on('message', data => {
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
isRunning = false
console.error('🚩 Error:\n', code)
process.exit()
if (code === 0) return
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())
})
}
process.on('warning', (warning) => {
if (warning.name === 'MaxListenersExceededWarning') {
console.warn('🚩 Se excedió el límite de Listeners en:')
console.warn(warning.stack)
}
})
start('Xi_Crew.js')