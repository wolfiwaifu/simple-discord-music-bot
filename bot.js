const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

let dispatcher;

client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content.startsWith('!play')) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      const embed = new Discord.MessageEmbed()
        .setColor('#dc3932')
        .setDescription('Musisz być na kanale głosowym, żeby grać muzykę!');
      return message.channel.send(embed);
    }

    voiceChannel.join().then(connection => {
      const stream = ytdl(message.content.split(' ')[1], { filter: 'audioonly' });
      dispatcher = connection.play(stream);

      dispatcher.on('finish', () => voiceChannel.leave());
    });
  } else if (message.content === '!skip') {
    if (!dispatcher) {
      const embed = new Discord.MessageEmbed()
        .setColor('#dc3932')
        .setDescription('Nie ma nic do przeskoczenia!');
      return message.channel.send(embed);
    }
    dispatcher.end();
  } else if (message.content === '!pause') {
    if (!dispatcher) {
      const embed = new Discord.MessageEmbed()
        .setColor('#dc3932')
        .setDescription('Nie ma nic do zapauzowania!');
      return message.channel.send(embed);
    }
    dispatcher.pause();
  }
  else if (message.content === '!autor') {
    const embed = new Discord.MessageEmbed()
      .setColor('#169bed')
      .setDescription('Autorem bota jest **Łulfi#0001**');
    message.channel.send(embed);
  }
});

client.login('TWÓJ TOKEN BOTA');
