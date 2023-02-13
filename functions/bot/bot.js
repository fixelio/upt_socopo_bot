const { Telegraf, Markup } = require('telegraf')
const dotenv = require('dotenv')

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

function main() {

  try {
    bot.telegram.setMyCommands([
      { command: '/start', description: 'Inicia la conversación' },
      { command: '/fechas', description: 'Información sobre fechas y eventos' },
      { command: '/grupo', description: 'Enlace al grupo de Telegram' },
      { command: '/desarrolladores', description: 'Información sobre los creadores del bot' }
    ]);

    bot.start(ctx => {
      const usuario = ctx.from.first_name;
      const respuesta = `Hola ${usuario}. Soy el bot de la UPT José Félix Ribas del núcleo de Socopó.

Estoy aquí para ayudarte a que te enteres de las noticias y anuncios publicados por la universidad.

A continuación te muestro los comandos que te puedo ofrecer:

/grupo - Únete a la sala de chat
/fechas - Fechas importantes
/desarrolladores - ¡Mis creadores!`
      ctx.reply(respuesta);
    });

    bot.command('fechas', ctx => {
      ctx.reply('Dime, ¿En qué estas interesado? Para hacérmelo saber, ¡solo pulsa el botón de tu elección!', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          Markup.button.callback('Calendario', 'cb_calendario_académico'),
          Markup.button.callback('Inscripción', 'cb_fecha_inscripcion'),
          Markup.button.callback('Eventos', 'cb_eventos')
        ])
      });
    });

    bot.command('grupo', ctx => {
      ctx.reply('Este es el enlace de invitación de nuestro grupo de Telegram:\n\nhttps://t.me/+fSlYGFZpr_EwM2Ux\n\n¡¡Siéntete libre de entrar y chatear!!');
    });

    bot.command('desarrolladores', ctx => {
      ctx.reply(`
¡Gracias por interesarte en mis desarrolladores!
¡¡Ellos son estudiantes del PNF en Sistemas e Informática de esta universidad!!

Te muestro sus nombres:

- Julio Molina
- Víctor Carvajal
- Kenia Madero
- Carlos Escobar

Bajo la supervisión del profesor:

Jean Carlos`);
    });

    bot.action('cb_calendario_académico', ctx => {
      ctx.reply('Lo sentimos. Aún estamos trabajando en esta área...')
    });

    bot.action('cb_fecha_inscripcion', ctx => {
      ctx.reply('Lo sentimos. Aún estamos trabajando en esta área...')
    });

    bot.action('cb_eventos', ctx => {
      const eventos = ['De momento no tengo ningún evento registrado.\n\nSi necesitas preguntar algo, puedes hacerlo en nuestro grupo: https://t.me/+fSlYGFZpr_EwM2Ux'];
      const mensaje = eventos.join('\n----\n');

      ctx.reply(mensaje);
    });

    bot.launch();

    console.log('Bot inicializado')
  }
  catch(error) {
    console.log('Error:', error)
  }
}

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

main();