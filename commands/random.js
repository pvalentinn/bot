const Discord = require('discord.js');
module.exports = (bot) => {
     bot.randomRole = (serveur, guild, actual, message) => {
        //console.log(role);
        let sansRoles = actual.users.filter(user => user.status === 0 );
        console.log(sansRoles);
    
        let tirage = Math.floor(Math.random() * sansRoles.length);
        //console.log(tirage);
        let user = {};
    
        if (sansRoles.length === 0) return console.log("No more without roles.");
        if (sansRoles.length ===  4){
            for (i = 0; i < 4; i++) {
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
        }
        if (sansRoles.length ===  5) {
            for (i = 0; i < 4; i++) {
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
            message.guild.members.find(member => member.id === sansRoles[0].id).addRole(actual.arrayRoles[3]);
            user = actual.users.find(user => user.id === sansRoles[0].id);
            user.status = 1;
            sansRoles.splice(tirage, 1);
            //console.log(sansRoles);
        console.log("Done.")
        }
        if (sansRoles.length >= 6 && sansRoles.length < 9) {
            for (i = 0; i < 4; i++) {
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
            message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[1]);
            user = actual.users.find(user => user.id === sansRoles[tirage].id);
            user.status = 1;
            tirage = Math.floor(Math.random() * sansRoles.length);
            for (i = 0; i < sansRoles.length; i++){
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
        }
        if (sansRoles.length >= 9 && sansRoles.length <= 10) {
            for (i = 0; i < 4; i++) {
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
            message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[1]);
            user = actual.users.find(user => user.id === sansRoles[tirage].id);
            user.status = 1;
            tirage = Math.floor(Math.random() * sansRoles.length);
    
            message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[1]);
            user = actual.users.find(user => user.id === sansRoles[tirage].id);
            user.status = 1;
            tirage = Math.floor(Math.random() * sansRoles.length);
    
            for (i = 0; i < sansRoles.length; i++){
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
        }
        
    }
};