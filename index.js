const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

let users = new Map();
let arrayRoles = [];
let min = 0;
let channelVillage = [];
let parent = [];
let guildID = [];



bot.PREFIX = process.env.PREFIX + ' ';
bot.commands = new Discord.Collection();

bot.commands.set("create", require("./commands/create.js"));
//bot.commands.set("roles", require("./commands/roles.js"));
bot.commands.set("purge", require("./commands/purge.js"));
bot.commands.set("village", require("./commands/village.js"));
bot.commands.set("timer", require("./commands/timer.js"));


bot.on('ready', function () {
  console.log("Je suis connecté !")
});


bot.on('message', message => {

  if (message.content === 'oui'){
    console.log(users);
    // console.log(users.has(message.guild.id));
    // console.log(users.get(message.guild.id));
    console.log(users.get(message.guild.id)[0]);
  }

  let isBot = message.author.bot == true;
  if (isBot) return;
  
  if (bot.commands.has('purge')) bot.commands.get('purge')(message);
  if (bot.commands.has('timer')) bot.commands.get('timer')(message);
  if (message.content.indexOf(bot.PREFIX) !== 0) return; 
  const con = message.content.slice(bot.PREFIX.length);
 

  if (bot.commands.has('create')) bot.commands.get('create')(message, con, users, isBot);
  //if (bot.commands.has('roles')) bot.commands.get('roles')(message, con, arrayRoles);
  if (bot.commands.has('village')) bot.commands.get('village')(message, con, min, users, channelVillage, parent, arrayRoles);
  //console.log(parent);
  

});

bot.login(process.env.TOKEN_KEY);