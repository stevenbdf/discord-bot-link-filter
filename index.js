const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in...`);
});

function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

client.on('message', msg => {
  const CHANNEL_ID = process.env.CHANNEL_ID;

  if (msg.channel.id === CHANNEL_ID) {
    if (!isValidHttpUrl(msg.content) && !msg.author.bot) {
      msg.delete()
        .then(async () => {
          msg.channel.send('Mensaje borrado:\n**Solo se permiten links en este channel. No seas puto.**').then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 2000)
          })
        })
        .catch((err) => console.log(err))
    }
  }
});

client.login(process.env.DISCORD_TOKEN);