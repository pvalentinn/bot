const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

let users = [];
let arrayRoles = [];
let min = 0;
let channelVillage = [];

bot.PREFIX = process.env.PREFIX + ' ';
bot.commands = new Discord.Collection();

bot.commands.set("create", require("./commands/create.js"));
bot.commands.set("roles", require("./commands/roles.js"));
bot.commands.set("purge", require("./commands/purge.js"));



bot.on('ready', function () {
  console.log("Je suis connecté !")
});


bot.on('message', message => {
  let isBot = message.author.bot == true;
  if (isBot) return;

  if (bot.commands.has('purge')) bot.commands.get('purge')(message);
  if (message.content.indexOf(bot.PREFIX) !== 0) return; 
  const con = message.content.slice(bot.PREFIX.length);
  

  if (bot.commands.has('create')) bot.commands.get('create')(message, con, users, isBot, min, channelVillage);
  if (bot.commands.has('roles')) bot.commands.get('roles')(message, con, arrayRoles);
  
});

bot.on('channelCreate', channel => {
 setTimeout(() => {
  // console.log(channel);
  // console.log(channelVillage[0]);
  // console.log(channelVillage[0].id);

  if (channel.id !== channelVillage[0].id) return;

  if (channel.id === channelVillage[0].id && users.length >= min) {
   
    channel.send("Bientôt dans le Village, retrouvez vos rôles respectifs dans les salons textuels qui viennent d'ètre crée.");
    channel.send("Vous avez maintenant 30 secondes avant que la nuit ne tombe.");
  }
  channel.guild.createChannel('Loups', {type: 'text', parent: channelVillage[0].parentID}).then(channel => {
    channelVillage.push(channel);
  });
  channel.guild.createChannel('Sorcière', {type: 'text', parent: channelVillage[0].parentID}).then(channel => {
    channelVillage.push(channel)
  });
  channel.guild.createChannel('Voyante', {type: 'text', parent: channelVillage[0].parentID}).then(channel => {
    channelVillage.push(channel)
  });
  setTimeout(() => {
    console.log(channelVillage);
  }, 600);
  
 }, 300);

});


bot.login(process.env.TOKEN_KEY);