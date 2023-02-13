const { Telegraf } = require('telegraf')
const startAction = require('./actions/start');
const grupoAction = require('./actions/grupo');
const desarrolladoresAction = require('./actions/desarrolladores');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  return startAction(ctx);
});

bot.command('grupo', ctx => {
  return grupoAction(ctx);
});

bot.command('desarrolladores', ctx => {
  return desarrolladoresAction(ctx);
});

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