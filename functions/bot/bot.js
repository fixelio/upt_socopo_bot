const { Telegraf } = require('telegraf')
const startAction = require('./actions/start');
const grupoAction = require('./actions/grupo');
const desarrolladoresAction = require('./actions/desarrolladores');
const fechasAction = require('./actions/fechas');
const discordAction = require('./actions/discord');
const ayudaAction = require('./actions/ayuda');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands([
  { command: '/start', description: 'Inicia la conversación' },
  { command: '/discord', description: 'Enlace a la comunidad de discord' },
  { command: '/grupo', description: 'Enlace al grupo de Telegram' },
  { command: '/fechas', description: 'Información sobre fechas y eventos' },
  { command: '/desarrolladores', description: 'Información sobre los creadores del bot' },
  { command: '/ayuda', description: 'Muestra ayuda interactiva' }
]);

bot.start(ctx => {
  return startAction(ctx);
});

bot.command('grupo', ctx => {
  return grupoAction(ctx);
});

bot.command('desarrolladores', ctx => {
  return desarrolladoresAction(ctx);
});

bot.command('fechas', ctx => {
  return fechasAction(ctx);
});

bot.command('discord', ctx => {
  return discordAction(ctx);
});

bot.command('ayuda', ctx => {
  return ayudaAction(ctx);
});

//******************************
//
//  Actions
//
//********************************

bot.action('cb_calendario_académico', ctx => {
  return ctx.reply('Lo sentimos. Aún estamos trabajando en esta área...')
});

bot.action('cb_fecha_inscripcion', ctx => {
  return ctx.reply('Lo sentimos. Aún estamos trabajando en esta área...')
});

bot.action('cb_eventos', ctx => {
  const eventos = ['De momento no tengo ningún evento registrado.\n\nSi necesitas preguntar algo, puedes hacerlo en nuestro grupo: https://t.me/+fSlYGFZpr_EwM2Ux'];
  const mensaje = eventos.join('\n----\n');

  return ctx.reply(mensaje);
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