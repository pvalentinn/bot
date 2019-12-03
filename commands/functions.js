const Discord = require('discord.js');
module.exports = (bot) => {
     bot.randomRole = (serveur, guild, actual, message) => {
        //console.log(role);
        let sansRoles = actual.users.filter(user => user.status === 0 );
        //console.log(sansRoles);
    
        let tirage = Math.floor(Math.random() * sansRoles.length);
        //console.log(tirage);
        let user = {};
        
        
        if (sansRoles.length === 0) return console.log("No more without roles.");
        if (sansRoles.length <=  4){
            let x = sansRoles.length;
            for (i = 0; i < x; i++) {
                if (!message.guild.roles.has(actual.arrayRoles[i].id)) return console.log('laisse tombé');
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[i]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                console.log(sansRoles);
                sansRoles.splice(tirage, 1);
                console.log(sansRoles);
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
            let x = sansRoles.length;
            for (i = 0; i < x; i++){
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[3]);
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
    
            let x = sansRoles.length;
            for (i = 0; i < x; i++){
                message.guild.members.find(member => member.id === sansRoles[tirage].id).addRole(actual.arrayRoles[3]);
                user = actual.users.find(user => user.id === sansRoles[tirage].id);
                user.status = 1;
                sansRoles.splice(tirage, 1);
                //console.log(sansRoles);
                tirage = Math.floor(Math.random() * sansRoles.length);
            }
        }
        
    }
    bot.seeChannel = (serveur, guild, actual, message) => {
        for (i = 0; i < actual.arrayRoles.length; i++){
            if (!message.guild.roles.has(actual.arrayRoles[i].id)) return console.log('laisse tombé');
            actual.arrayChannel[1].overwritePermissions((actual.arrayRoles[i].id), {'VIEW_CHANNEL': true, 'ADMINISTRATOR ': false, 'READ_MESSAGE_HISTORY': true, 'SEND_MESSAGES': false });
            actual.arrayChannel[2].overwritePermissions((actual.arrayRoles[i].id), {'VIEW_CHANNEL': true, 'CONNECT': true, 'ADMINISTRATOR ': false, 'SPEAK': true, 'USE_VAD': true });
        }
        if (!message.guild.roles.has(actual.arrayRoles[0].id)) return console.log('laisse tombé');
        actual.arrayChannel[3].overwritePermissions((actual.arrayRoles[1].id), {'VIEW_CHANNEL': true, 'CONNECT': true, 'ADMINISTRATOR ': false, 'READ_MESSAGE_HISTORY': true, 'SEND_MESSAGES': false  });
        actual.arrayChannel[4].overwritePermissions((actual.arrayRoles[2].id), {'VIEW_CHANNEL': true, 'CONNECT': true, 'ADMINISTRATOR ': false, 'READ_MESSAGE_HISTORY': true, 'SEND_MESSAGES': false  });
        actual.arrayChannel[5].overwritePermissions((actual.arrayRoles[0].id), {'VIEW_CHANNEL': true, 'CONNECT': true, 'ADMINISTRATOR ': false, 'READ_MESSAGE_HISTORY': true, 'SEND_MESSAGES': false  });
        //console.log('done');
    }

    bot.leave = (serveur, guild, actual, message) => {
        if (message.content === '!lg leave'){
            if(!actual.users.find( user => user.id === message.author.id)){
              if (actual.users.length === 0) return message.channel.send("Aucune partie n'a été crée, pour en créer une faites '!lg create'.");
              message.channel.send("Tu n'es pas dans la partie.");
            } else if (actual.users.find( user => user.id === message.author.id)){
              if (actual.start[0] !== message.channel && actual.arrayChannel[1] !== message.channel && actual.arrayChannel[3] !== message.channel && actual.arrayChannel[4] !== message.channel && actual.arrayChannel[5] !== message.channel){
                (async () => {
                  let msg = await message.channel.send(`Mauvais channel va à #${actual.start[0].name}.`);
                  setTimeout( () => {
                    message.delete();
                    msg.delete();
                  }, 1000)
                })()
                return;
              }
              let leaver = (actual.users.find( user => user.id === message.author.id));  
              if (actual.users.length === 0) actual.start.shift();
              //console.log(actual.users.indexOf(leaver));
              if(actual.arrayRoles.length > 0){
                // console.log(actual.arrayRoles);
                let rolesLeaver = message.guild.members.find(member => member.id ===  message.author.id).roles;
                for(i = 0; i < actual.arrayRoles.length; i++){
                  if (!rolesLeaver.find(role => role.id === actual.arrayRoles[i].id)) {
                    console.log(actual.arrayRoles[i]);
                  }
                  else if (rolesLeaver.find(role => role.id === actual.arrayRoles[i].id)) {
                    let role = rolesLeaver.find(role => role.id === actual.arrayRoles[i].id);
                    console.log(role);
                    // actual.users.splice(actual.users.indexOf(leaver), 1);
                    // console.log(actual.users);
                    // message.channel.send(`${leaver.name} à quitté la partie.`);
                    message.guild.members.find(member => member.id ===  message.author.id).removeRole(role.id);
                  }
                }
              }
              actual.users.splice(actual.users.indexOf(leaver), 1);
              console.log(actual.users);
              return message.channel.send(`${leaver.name} à quitté la partie.`);
            }
          };
    }



    bot.reset = (serveur, guild, actual, message) => {
        // if (message.content === 'reset') {
            if(serveur.get(guild).arrayChannel.length === 0 || serveur.get(guild).users.length === 0) return message.channel.send( 'Pas de parties en cours.');
            if (!actual.users.find( user => user.id === message.author.id)) return message.channel.send("Tu ne fais pas partie des joueurs.");
            else {  
                
                function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
      
                async function deletedUniversal (element) {
                  let x = element.length;
                  for(let i = x - 1; i >= 0; i--) {
                    // console.log(element);
                    // console.log(i);
                    element[i].deleted = true;
                    element[i].delete();
                    await timer(500);
                  }
                  element.splice(0, x);
                }
                (async () => {
      
                    await deletedUniversal(serveur.get(message.guild.id).arrayRoles);
                    //console.log(await serveur.get(message.guild.id).arrayRoles);
                    await deletedUniversal(serveur.get(message.guild.id).arrayChannel);
                    //console.log(await serveur.get(message.guild.id).arrayChannel);
                    actual.users.splice(0, actual.users.length);
                    //console.log(actual.users);
                    actual.gameStart = 0;
                    actual.start.shift();
      
                })();
            }
          }
    //}
};