const Discord = require('discord.js')
const bot = new Discord.Client();
require('dotenv').config();

let users = [];
let arrayRoles = [];

bot.PREFIX = process.env.PREFIX + ' ';
bot.commands = new Discord.Collection();

bot.commands.set("create", require("./commands/create.js"));
bot.commands.set("roles", require("./commands/roles.js"));
bot.commands.set("non", require("./commands/purge.js"));



bot.on('ready', function () {
  console.log("Je suis connecté !")
});


bot.on('message', message => {
  let isBot = message.author.bot == true;
  if (isBot) return;

  if (bot.commands.has('non')) bot.commands.get('non')(message);
  if (message.content.indexOf(bot.PREFIX) !== 0) return; 
  const con = message.content.slice(bot.PREFIX.length);

  if (bot.commands.has('create')) bot.commands.get('create')(message, con, users, isBot);
  if (bot.commands.has('roles')) bot.commands.get('roles')(message, con, arrayRoles);
  
});


bot.login(process.env.TOKEN_KEY);