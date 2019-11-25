module.exports = (message, con, min, users, channelVillage, parent, arrayRoles) => {
    let roles = [];
    let channels = [];
    let category = [];
    let guild = message.guild.id;
    let verif = parent.has(guild);
 
    

    if (con === 'start') {
        if (verif === true) {
            if(parent.get(guild).length !== 0){
                console.log('je sufzei')
                return message.channel.send('Une partie a déjà commencé.');
            }
        }
        
        if(users.size < min) message.channel.send(`Il faut être minimum ${min} pour lancer une partie.`);
        if(users.size >= min) {

          let createChannel = (name, type, papa) => {
            return message.guild.createChannel(name, {type: type, parent: papa});
          };

          
          function returnRole (role) {
            roles.push(role);
            //console.log(`Created new role with name ${role.name} and color ${role.color}`);
          };

           (async () => {
            category.push(await createChannel('LG', 'category'));
            await parent.set(guild, category);

            channels.push(await createChannel('Village', 'text', parent.get(guild)[0].id));
            channels[0].send("Bienvenue dans le Village, retrouvez vos rôles respectifs dans les salons textuels qui viennent d'ètre crée.");
            channels[0].send("Vous avez maintenant 30 secondes avant que la nuit ne tombe.");

            await  message.guild.createRole({name: '⠀', color: 'RED',})
            .then(role => returnRole(role))
            .catch(console.error);
            await message.guild.createRole({name: '⠀', color: 'GREEN',})
            .then(role => returnRole(role))
            .catch(console.error);
            await message.guild.createRole({name: '⠀', color: 'BLUE',})
            .then (role => returnRole(role))
            .catch(console.error);

            arrayRoles.set(guild, roles);
            console.log(arrayRoles);
            //console.log(roles);
      
            //console.log(arrayRoles);
            //console.log(arrayRoles[0]);

            channels.push(await createChannel('Loups', 'text', parent.get(guild)[0].id));

            channels.push(await createChannel('Sorcière', 'text', parent.get(guild)[0].id));

            channels.push(await createChannel('Voyante', 'text', parent.get(guild)[0].id));

            await channelVillage.set(guild, channels);


            let s = 30;
            let time = await channelVillage.get(guild)[0].send(`La nuit tombe dans : ${s} secondes.`);
            //console.log(time);
            
            let timeout = () => {
                return new Promise( (resolve, reject) => {
                    let i = 0;
                    
                    console.log(parent.has(guild));
                    let interval = setInterval( () => {
                    
                        if (channelVillage.get(message.guild.id).length > 0){
                            if (i <= s && parent.has(guild) === true){
                                //console.log(s - i);
                                //console.log(time);
                                time.edit(`La nuit tombe dans : ${s - i} secondes.`);
                                i++;
                                console.log(i);
                            } else if (i === s && parent.has(guild) === true){
                                clearInterval(interval);
                                return console.log('timer finished');
                            }
                        } else if (channelVillage.get(message.guild.id).length <= 0){
                            clearInterval(interval);
                            return console.log('over');
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
        console.log(arrayRoles);
        console.log(users);
        console.log(channelVillage);
        console.log(parent);
      } else if (con === 'reset') {
        if(verif === false || users.has(guild) === false) return message.channel.send( 'Pas de parties en cours.');
        else {
            // let deletedParent = () => {
            //     return new Promise( (resolve, reject) => {
            //         parent.get(guild).deleted = true;
            //         parent.get(guild).delete();
            //         parent.delete(guild);
            //         resolve('finished');
            //         reject(console.error());
            //     })
            // };
    
            
            let deletedUniversal = (element) => {
                return new Promise( (resolve, reject) => {
    
                    for (let i = element.get(guild).length; i--;){
                        element.get(guild)[i].deleted = true;
                        setTimeout( () => {
                            element.get(guild)[i].delete();
                            //console.log(element[i]);
                            element.get(guild).splice(i, 1);
                        }, 500);
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
                await deletedUniversal(parent);
                console.log(parent);
                users.delete(guild);
                console.log(users);
            })();
        }
  } else if (con === 'bug'){
      console.log(message.guild.channels);
  }
}