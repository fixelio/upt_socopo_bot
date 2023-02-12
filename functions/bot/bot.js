const { Telegraf } = require('telegraf')
const dotenv = require('dotenv')

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  try {
    ctx.reply('Hola. En este momento estoy recibiendo actualizaciones...\nIntenta escribirme más tarde.');
  }
  catch(error) {
    console.error('Error in start:', error)
    return ctx.reply('Ocurrió un error interno.')
  }
})

exports.handler = async(event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  }
  catch (e) {
    console.error("Error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}