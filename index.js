const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.login(process.env.TOKEN_KEY);

let users = [];
let arrayRoles = [];

bot.on('message', message => {
  let isBot = message.author.bot == true;
  let con = message.content;

  if (con === '!lgcreate' && users.length === 0 && !isBot) {
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
  } else if (con === '!lgcreate' && users.length > 0 && !isBot){
    message.channel.send('Une partie de Loup-Garou est déjà en préparation.');
  } else if (con === '!lgjoin' && users.length >= 1 && !isBot) {
    for (i = 0; i < users.length; i++) {
      if (!users.find( user => user.id === message.author.id)){
        users.push(
          {
          id: message.author.id,
          name: message.author.username,
          status: 0,
          role: "",
          votes: 0
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

  } else if (con === '!lgroles') {

    function returnRole (role) {
      arrayRoles.push(role);
      //console.log(`Created new role with name ${role.name} and color ${role.color}`);
    };
   
     (async () => {
      await  message.guild.createRole({name: '⠀', color: 'RED',})
		  .then(role => returnRole(role))
		  .catch(console.error);
		  await message.guild.createRole({name: '⠀', color: 'GREEN',})
		  .then(role => returnRole(role))
		  .catch(console.error);
		  await message.guild.createRole({name: '⠀', color: 'BLUE',})
		  .then (role => returnRole(role))
		  .catch(console.error);
	
		  console.log(arrayRoles);
		  //console.log(arrayRoles[0]);
     })();

  } else if (con === '!lgdelete'){

    for (let i = 0; i < arrayRoles.length; i++){
      message.guild.roles.find(role => role.id === arrayRoles[i].id).delete().then( () => {
        for (let i = 0; i < arrayRoles.length; i++){
          if (arrayRoles.find( role => role.deleted=== true)) {
            arrayRoles.splice(i, 1);
            i--;
          }
        };
      });
      console.log(`deleted ${arrayRoles[i].id} successfully`);
  }
  setTimeout(() => {
    console.log(arrayRoles);  
  }, 1000);

  
  } else if (message.content.startsWith('!purge')){
    console.clear();
    let way = message.content.slice(6).split(' ');
    let xay = way.slice(1);    

    if ( isNaN(xay) === true || xay.length > 1  || Number(xay) === NaN ) message.channel.send("La commande nécessite '!purge' suivi d'un nombre.");
    if ( xay > 100 || xay == 0) message.channel.send("La commande n'accepete que les nombres au dessus 0 et en dessous 101.");
    else {
      async function purge() {
      
        const messages =  await message.channel.fetchMessages({limit: xay});
        message.channel.bulkDelete(messages)
        .then(messages => console.log(`Deleted ${messages.size} messages`))
        .catch(console.error);
        message.channel.send(`Deleted ${messages.size} messages`);
  
      }
      purge();
  
      console.log('Clearing messages');
    }
     
  }
});