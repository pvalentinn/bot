const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

let serveur = new Map();

let min = 1;

bot.PREFIX = process.env.PREFIX + ' ';
bot.commands = new Discord.Collection();

bot.commands.set("create", require("./commands/create.js"));
// bot.commands.set("roles", require("./commands/roles.js"));
bot.commands.set("purge", require("./commands/purge.js"));
bot.commands.set("village", require("./commands/village.js"));
// bot.commands.set("timer", require("./commands/timer.js"));


bot.on('ready', function () {
  console.log("Je suis connecté !");
  let keys = bot.guilds.keyArray();
  //console.log(keys);
  for (i = 0; i < keys.length; i++){
    serveur.set(keys[i], {
      users : [],
      arrayRoles : [],
      arrayChannel : []
    })
  }
  //console.log(serveur);
});

bot.on('guildCreate', guild => {
  console.log('Joined a guild');
  let key = guild.id
  serveur.set(key, {
    users : [],
    arrayRoles : [],
    arrayChannel : []
  });
  //console.log(serveur);
});


bot.on('message', message => {
  let guild = message.guild.id;
  let actual = serveur.get(guild);

  if (message.content === 'map'){
    // console.log(actual.users.length);
    // console.log(actual.arrayChannel.length);
    // console.log(actual.arrayRoles.length);
    // console.log(actual);
  }

  let isBot = message.author.bot == true;
  if (isBot) return;
  
  if (bot.commands.has('purge')) bot.commands.get('purge')(message);
  // if (bot.commands.has('timer')) bot.commands.get('timer')(message);
  if (message.content.indexOf(bot.PREFIX) !== 0) return; 
  const con = message.content.slice(bot.PREFIX.length);
 

  if (bot.commands.has('create')) bot.commands.get('create')(message, con, isBot, serveur);
  // if (bot.commands.has('roles')) bot.commands.get('roles')(message, con, arrayRoles);
  if (bot.commands.has('village')) bot.commands.get('village')(message, con, min, serveur);
  

});

bot.login(process.env.TOKEN_KEY);