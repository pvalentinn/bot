const Discord = require('discord.js')
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.login('NjI2NDI2MTQ3NjU1Mzg1MTA5.XYt6_A.I6Zgn6ed-jx_QdTqDY8O8E8ALTk')

let users = [];

bot.on('message', message => {
    
    if (message.content === '!lgcreate' && users.length === 0 && message.author.bot == false) {
        message.channel.send('Vous avez créer une partie de Loup-Garou');
        // let username =  message.author.username;
        // console.log(username);
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
      } else if (message.content === '!lgjoin' && users.length >= 1 && message.author.bot == false) {
        for (i = 0; i < users.length; i++) {

          if (message.content === '!lgjoin' && users[i].id === message.author.id && message.author.bot == false) { 
            message.channel.send('Vous êtes déjà dans la partie active.');

          } else if (users[i].id !== message.author.id && message.author.bot == false) {
            setTimeout( () => {
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
              //console.log(users.length);
            }, 100);
            break;
          }
          break;
        };

     } else if (message.author.bot == true) {
      // for (i = 0; i < users.length; i++) {
      //   if (users[i].id === message.author.id) { //message.author.client(bot) est chiant la
      //     message.channel.send('Vous êtes déjà dans la partie active.');
      //   } else {
      //     console.log("Paul tu t'es bien fail sorry.");
      //   }
      
        console.log(message.author.bot);
        //console.log(message.author.id);
      } else if (message.author.bot == false) {
        message.channel.send('oui bah nan');
      }

    }
    // console.log(users.length);
    // console.log(users[0].id);
  );
