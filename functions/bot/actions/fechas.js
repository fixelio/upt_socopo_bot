const { Markup } = require('telegraf');

module.exports = ctx => {
  return ctx.reply('Dime, ¿En qué estas interesado? Para hacérmelo saber, ¡solo pulsa el botón de tu elección!', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.callback('Calendario', 'cb_calendario_académico'),
      Markup.button.callback('Inscripción', 'cb_fecha_inscripcion'),
      Markup.button.callback('Eventos', 'cb_eventos')
    ])
  });
}