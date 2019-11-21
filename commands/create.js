module.exports =  (message, con, users, isBot, min, channelVillage) => {
    if (con === 'create' && users.length === 0 && !isBot) {
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
      } else if (con === 'create' && users.length > 0 && !isBot){
        message.channel.send('Une partie de Loup-Garou est déjà en préparation.');
        console.log(users);
    } else if (con === 'join' && users.length >= 1 && !isBot) {
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
      } else if (con === 'start') {
        const parent = message.channel.parentID;
        if(users.length < min) message.channel.send(`Il faut être minimum ${min} pour lancer une partie.`);
        if(users.length >= min) {
           message.guild.createChannel('Village', {type: 'text', position: 0, parent: parent})
           .then(channel => { channelVillage.push(channel) });
        }
      }
}