module.exports = (message, con, min, serveur) => {

    let guild = message.guild.id;
    let hMany = serveur.get(guild).users.length;
    let start = serveur.get(guild).arrayChannel.length;
    let actual = serveur.get(guild);
  
    
  
    if (con === 'start') {
        if (start > 0) return message.channel.send('Une partie à deja commencé.');
        
        if(hMany < min) message.channel.send(`Il faut être minimum ${min} pour lancer une partie.`);
        if(hMany >= min) {
  
          let createChannel = (name, type, papa) => {
            return message.guild.createChannel(name, {type: type, parent: papa});
          };
  
          
          let createRole = (name, color) => {
            return message.guild.createRole({name: name, color: color});
          };
  
           (async () => {
            await actual.arrayChannel.push(await createChannel('LG', 'category'));
            console.log(await actual.arrayChannel);
  
            await actual.arrayChannel.push(await createChannel('Village', 'text', actual.arrayChannel[0].id));
            actual.arrayChannel[1].send("Bienvenue dans le Village, retrouvez vos rôles respectifs dans les salons textuels qui viennent d'ètre crée.");
            actual.arrayChannel[1].send("Vous avez maintenant 30 secondes avant que la nuit ne tombe.");
  
            await actual.arrayRoles.push(await createRole('⠀', 'RED'));
            await actual.arrayRoles.push(await createRole('⠀', 'GREEN'));
            await actual.arrayRoles.push(await createRole('⠀', 'BLUE'));
  
            await actual.arrayChannel.push(await createChannel('Loups', 'text', actual.arrayChannel[0].id));
  
            await actual.arrayChannel.push(await createChannel('Sorcière', 'text', actual.arrayChannel[0].id));
  
            await actual.arrayChannel.push(await createChannel('Voyante', 'text', actual.arrayChannel[0].id));
  
  
            let s = 30;
            let time = await actual.arrayChannel[1].send(`La nuit tombe dans : ${s} secondes.`);
            //console.log(time);
            
            let timeout = () => {
                return new Promise( (resolve, reject) => {
                    let i = 0;
                    
                    let interval = setInterval( () => {
                        if (actual.arrayChannel.length === 0) return clearInterval(interval);
                        if (i <= s){
                            time.edit(`La nuit tombe dans : ${s - i} secondes.`);
                            i++;
                        } else if (i === s){
                            clearInterval(interval);
                            return console.log('timer finished')
                        }
                    }, 1000);
  
                    resolve('Timer finished');
                    reject('Timer didnt finished');
                })
            }
            await timeout();
  
           })();
          
        }
      } else if (con === 'log') {
        console.clear();
        console.log(actual);
        console.log(actual.arrayRoles);
        console.log(actual.arrayChannel);
      } else if (con === 'reset') {
        if(start === 0 || hMany === 0) return message.channel.send( 'Pas de parties en cours.');
        else {  
            
            let deletedUniversal = (element) => {
                return new Promise( (resolve, reject) => {
    
                    for (let i = element.length; i--;){
                        element[i].deleted = true;
                        setTimeout( () => {
                            element[i].delete();
                            element.pop();
                        }, 1500)
                    };
                    resolve('finished');
                    reject(console.error());
                })
            };
    
            (async () => {

                await deletedUniversal(await serveur.get(message.guild.id).arrayRoles);
                console.log(await serveur.get(message.guild.id).arrayRoles);

                await deletedUniversal(await serveur.get(message.guild.id).arrayChannel);
                console.log(await serveur.get(message.guild.id).arrayChannel);

                actual.users.splice(0, actual.users.length);
                console.log(actual.users);
            })();
        }
  } else if (con === 'bug'){
      console.log(message.guild.channels);
  }
}