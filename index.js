const Discord = require('discord.js')
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.login('NjI2NDI2MTQ3NjU1Mzg1MTA5.XdL_8A.5Fc9a1_q-8fpd3WdowOgRhMyIV0');

let users = [];

bot.on('message', message => {
  let isBot = message.author.bot == true;
  if (message.content === '!lgcreate' && users.length === 0 && !isBot) {
    message.channel.send('Vous avez créer une partie de Loup-Garou.');
    users.push(
      {
      id: message.author.id,
      name: message.author.username,
      status: 0,
      role: ""
      }
    )
    console.log(users);
    //console.log(users.length);
  } else if (message.content === '!lgcreate' && users.length > 0 && !isBot){
    message.channel.send('Une partie de Loup-Garou est déjà en préparation.');
  } else if (message.content === '!lgjoin' && users.length >= 1 && !isBot) {
    for (i = 0; i < users.length; i++) {
      if (!users.find(user => user.id === message.author.id)){
        users.push(
          {
          id: message.author.id,
          name: message.author.username,
          status: 0,
          role: ""
          }
        )
        message.channel.send(`Vous êtes ${users.length} dans la partie.`);
        console.log(users);
        break;
      } else {
        message.channel.send('Vous êtes déjà dans la partie active.');
        break;
      }
    }
  } else if (isBot) {
    console.log(message.author.bot);
  } else if (!isBot) {
    message.channel.send('oui bah nan');
  }
});
