const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

let users = [];
let arrayRoles = [];
let min = 0;
let channelVillage = [];
let parent = [];


bot.PREFIX = process.env.PREFIX + ' ';
bot.commands = new Discord.Collection();

bot.commands.set("create", require("./commands/create.js"));
bot.commands.set("roles", require("./commands/roles.js"));
bot.commands.set("purge", require("./commands/purge.js"));
bot.commands.set("village", require("./commands/village.js"));


bot.on('ready', function () {
  console.log("Je suis connecté !")
});


bot.on('message', message => {
  let isBot = message.author.bot == true;
  if (isBot) return;

  if (bot.commands.has('purge')) bot.commands.get('purge')(message);
  if (message.content.indexOf(bot.PREFIX) !== 0) return; 
  const con = message.content.slice(bot.PREFIX.length);
  

  if (bot.commands.has('create')) bot.commands.get('create')(message, con, users, isBot);
  if (bot.commands.has('roles')) bot.commands.get('roles')(message, con, arrayRoles);
  if (bot.commands.has('village')) bot.commands.get('village')(message, con, min, users, channelVillage, parent, arrayRoles);
  //console.log(parent);
  

});

bot.login(process.env.TOKEN_KEY);