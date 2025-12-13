import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

global.comandos = new Map()

async function seeCommands(dir = path.join(dirname, '../../commands')) {
  const items = fs.readdirSync(dir)
  for (const fileOrFolder of items) {
    const fullPath = path.join(dir, fileOrFolder)
    if (fs.lstatSync(fullPath).isDirectory()) {
      await seeCommands(fullPath)
    } else if (fileOrFolder.endsWith('.js')) {
      try {
        const { default: comando } = await import(fullPath)

        if (comando && Array.isArray(comando.command) && typeof comando.run === 'function') {
          comando.command.forEach((cmd) => {
            global.comandos.set(cmd.toLowerCase(), {
              run: comando.run,
              category: comando.category || 'uncategorized',
              isOwner: comando.isOwner || false,
              isAdmin: comando.isAdmin || false,
              botAdmin: comando.botAdmin || false,
              isModeration: comando.isModeration || false,
              info: comando.info || {}
            })
          //  console.log(chalk.green(`🍄  Comando cargado: ${cmd}`))
          })
        } else {
        //  console.log(chalk.yellow(`🍄  Comando inválido en: ${fileOrFolder}`))
        }
      } catch (error) {
        console.error(chalk.red(`Error cargando comando ${fileOrFolder}:`), error)
      }
    }
  }
}

export default seeCommands