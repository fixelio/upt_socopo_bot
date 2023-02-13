module.exports = ctx => {
  const usuario = ctx.from.first_name;
  return ctx.reply(`Hola ${usuario}. Soy el bot de la UPT José Félix Ribas del núcleo de Socopó.

Estoy aquí para ayudarte a que te enteres de las noticias y anuncios publicados por la universidad.

A continuación te muestro los comandos que te puedo ofrecer:

/grupo - Únete a la sala de chat
/fechas - Fechas importantes
/desarrolladores - ¡Mis creadores!`);
}