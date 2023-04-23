const searchYT = require('yt-search');

async function findVideoInfo(query) {
  const result = await searchYT(`${query} audio`);
  return (result.videos.length > 1) ? results.videos[0] : null;
}

module.exports = async ctx => {
  try {
    const name = ctx.message.text
      .split(' ')
      ?.slice(1)
      ?.join(' ');

    if (!name) {
      return ctx.reply('Debes escribir el nombre de la canción en el comando. Por ejemplo: /musica nombre_de_la_canción');
    }

    const video = await findVideoInfo(name);
    if (!video) {
      return ctx.reply(`No hay resultados para "${name}"`);
    }

    return ctx.reply(`${video.title}: ${video.url}`);
  }
  catch(error) {
    return ctx.reply('Ocurrió un error interno');
  }
}