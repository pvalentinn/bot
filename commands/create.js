module.exports =  (message, con, isBot, serveur) => {

    let max = 10;
    let guild = message.guild.id;
    let actual = serveur.get(guild);
    let hMany = actual.users.length;
    
    let createUser = () => {
      return new Promise( (resolve, reject) => {
        resolve({
            id: message.author.id,
            name: message.author.username,
            status: 0,
            //role: "",
            votes: 0
            });
        reject(console.error());
      })
    };

    if (con === 'create') {
      if(hMany === 0 && !isBot){
        message.channel.send('Vous avez créer une partie de Loup-Garou.');
        (async () => {
          actual.users.push(await createUser());
          actual.start.push(await message.channel);
          console.log(message);
          //console.log(actual.users);
        })();
      } else if (hMany >= 1 && !isBot) {
        if (actual.start.length !== 0){
          if (actual.start[0] !== message.channel){
            (async () => {
              let msg = await message.channel.send(`Mauvais channel va à #${actual.start[0].name}.`);
              setTimeout( () => {
                message.delete();
                msg.delete();
              }, 1000)
            })()
            return console.log(`Mauvais channel va à #${actual.start[0].name}.`);
          }
        } 
        if (actual.arrayChannel.length > 0) return message.channel.send('Une partie a déjà commencé.');
        message.channel.send('Une partie de Loup-Garou est déjà en préparation.');
        console.log(actual.users);
      }  
    } else if (con === 'join') {
      if (hMany >= 1 && !isBot) {
        if (actual.arrayChannel.length > 0) return message.channel.send('Une partie a déjà commencé.');
        if (hMany === max) return message.channel.send(`Le nombre de joueurs maximum à été atteind, soit ${10}.`);
        if (actual.start[0] !== message.channel){
          (async () => {
            let msg = await message.channel.send(`Mauvais channel va à #${actual.start[0].name}.`);
            setTimeout( () => {
              message.delete();
              msg.delete();
            }, 1000)
          })()
          return console.log(`Mauvais channel va à #${actual.start[0].name}.`);
        }
          for (i = 0; i < hMany; i++) {
            if (!actual.users.find( user => user.id === message.author.id)){
              (async () => {
  
                actual.users.push(await createUser());
                console.log(actual.users);
                //console.log(users.get(message.guild.id));
                await message.channel.send(`Vous êtes ${actual.users.length} dans la partie.`);
                //console.log(users.get(message.guild.id));
              })();
              break;
            } else {
              message.channel.send('Vous êtes déjà dans la partie active.');
              break;
            }
          }
      } else if (hMany === 0 && !isBot) {
        message.channel.send("Aucune partie n'a été crée, pour en créer une faites '!lg create'.");
      }

    } else if (con === 'leave'){
        if(!actual.users.find( user => user.id === message.author.id)){
          if (hMany === 0 && !isBot) return message.channel.send("Aucune partie n'a été crée, pour en créer une faites '!lg create'.");
          message.channel.send("Tu n'es pas dans la partie.");
        } else if (actual.users.find( user => user.id === message.author.id)){
          if (actual.start[0] !== message.channel){
            (async () => {
              let msg = await message.channel.send(`Mauvais channel va à #${actual.start[0].name}.`);
              setTimeout( () => {
                message.delete();
                msg.delete();
              }, 1000)
            })()
            return console.log(`Mauvais channel va à #${actual.start[0].name}.`);
          }
          let leaver = (actual.users.find( user => user.id === message.author.id));  
          if (leaver === actual.users[0]) actual.start.shift();
          //console.log(actual.users.indexOf(leaver));
          actual.users.splice(actual.users.indexOf(leaver), 1);
          message.channel.send(`${leaver.name} à quitté la partie.`);
        }
      };
}


// if (actual.start[0] !== message.channel){
//   (async () => {
//     let msg = await message.channel.send(`Mauvais channel va à #${actual.start[0].name}.`);
//     setTimeout( () => {
//       message.delete();
//       msg.delete();
//     }, 1000)
//   })()
//   return console.log(`Mauvais channel va à #${actual.start[0].name}.`);
// }