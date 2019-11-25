module.exports =  (message, con, users, isBot, parent) => {

    let verif = users.has(message.guild.id);

    let createUser = () => {
      return new Promise( (resolve, reject) => {
        resolve({
            id: message.author.id,
            name: message.author.username,
            status: 0,
            role: "",
            votes: 0
            });
        reject(console.error());
      })
    };
    

    if (con === 'create' && verif === false && !isBot) {
      
        message.channel.send('Vous avez créer une partie de Loup-Garou.');
        (async () => {
          users.set(message.guild.id, [await createUser()]);
          //users.push(await createUser());
          console.log(users.get(message.guild.id));
          // console.log(users.get(message.guild.id).length);
        })();
        
    } else if (con === 'create' && verif === true && !isBot){
      if (message.guild.channels.find(channel => channel.name === 'LG')) return message.channel.send('Une partie a déjà commencé.');
        message.channel.send('Une partie de Loup-Garou est déjà en préparation.');
        console.log(users.get(message.guild.id));
        
    } else if (con === 'join' && verif === true >= 1 && !isBot) {
      if (message.guild.channels.find(channel => channel.name === 'LG')) return message.channel.send('Une partie a déjà commencé.');
        for (i = 0; i < users.get(message.guild.id).length; i++) {
          if (!users.get(message.guild.id).find( user => user.id === message.author.id)){
            (async () => {
              //users.set(message.guild.id, [await createUser()]);
              users.get(message.guild.id).push(await createUser());
              //users.push(await createUser());
              //console.log(users.get(message.guild.id));
              message.channel.send(`Vous êtes ${users.get(message.guild.id).length} dans la partie.`);
              console.log(users.get(message.guild.id));
            })();
            // message.channel.send(`Vous êtes ${users.get(message.guild.id).length} dans la partie.`);
            console.log(users.get(message.guild.id));
            break;
          } else {
            message.channel.send('Vous êtes déjà dans la partie active.');
            break;
          }
        }
      } else if (con === 'join' && verif === false && !isBot) { 
         message.channel.send("Aucune partie n'a été crée, pour en créer une faites '!lg create'.");
      }
}