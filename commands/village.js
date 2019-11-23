module.exports = (message, con, min, users, channelVillage, parent, arrayRoles) => {
    if (con === 'start') {
        let verif = users.has(message.guild.id);
        if(parent.length !== 0) { message.channel.send( 'Une partie a déjà commencé.'); return }
        if(users.length < min) message.channel.send(`Il faut être minimum ${min} pour lancer une partie.`);
        if(users.length >= min) {

          let createChannel = (name, type, papa) => {
            return message.guild.createChannel(name, {type: type, parent: papa});
          };

          function returnRole (role) {
            arrayRoles.push(role);
            //console.log(`Created new role with name ${role.name} and color ${role.color}`);
          };

           (async () => {
            parent.push(await createChannel('LG', 'category'));
            channelVillage.push(await createChannel('Village', 'text', parent[0].id));
            channelVillage[0].send("Bienvenue dans le Village, retrouvez vos rôles respectifs dans les salons textuels qui viennent d'ètre crée.");
            channelVillage[0].send("Vous avez maintenant 30 secondes avant que la nuit ne tombe.");


            await  message.guild.createRole({name: '⠀', color: 'RED',})
            .then(role => returnRole(role))
            .catch(console.error);
            await message.guild.createRole({name: '⠀', color: 'GREEN',})
            .then(role => returnRole(role))
            .catch(console.error);
            await message.guild.createRole({name: '⠀', color: 'BLUE',})
            .then (role => returnRole(role))
            .catch(console.error);
      
            //console.log(arrayRoles);
            //console.log(arrayRoles[0]);

            channelVillage.push(await createChannel('Loups', 'text', parent[0].id));

            channelVillage.push(await createChannel('Sorcière', 'text', parent[0].id));

            channelVillage.push(await createChannel('Voyante', 'text', parent[0].id));


            let s = 30;
            let time = await channelVillage[0].send(`La nuit tombe dans : ${s} secondes.`);
            console.log(time);
            
            let i = 0;
            setInterval( () => {
                if (i <= s){
                    //console.log(s - i);
                    //console.log(time);
                    time.edit(`La nuit tombe dans : ${s - i} secondes.`);
                    i++;
                }
            }, 1000); 



           })();
          
        }
      } else if (con === 'log') {
        console.log(arrayRoles);
        console.log(users);
        console.log(channelVillage);
        console.log(parent);
      } else if (con === 'reset') {
        if(parent.length === 0) { message.channel.send( 'Pas de parties en cours.'); return }
        else {
            let deletedParent = () => {
                return new Promise( (resolve, reject) => {
                    parent[0].deleted = true;
                    parent[0].delete();
                    parent.shift();
                    resolve('finished');
                    reject(console.error());
                })
            };
    
            
            let deletedUniversal = (element) => {
                return new Promise( (resolve, reject) => {
    
                    for (let i = element.length; i--;){
                        element[i].deleted = true;
                        setTimeout( () => {
                            element[i].delete();
                            //console.log(element[i]);
                            element.splice(i, 1);
                        }, 100);
                    };
                    resolve('finished');
                    reject(console.error());
                })
            };
    
            (async () => {
                await deletedUniversal(arrayRoles);
                console.log(arrayRoles);
                await deletedUniversal(channelVillage);
                console.log(channelVillage);
                await deletedParent();
                console.log(parent);
            })();
        }
  } else if (con === 'bug'){
      console.log(message.guild.channels);
  }
}