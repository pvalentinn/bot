module.exports = (bot, message, con, serveur) => {

    let guild = message.guild.id;
    let hMany = serveur.get(guild).users.length;
    let start = serveur.get(guild).arrayChannel.length;
    let actual = serveur.get(guild);
    let min = 1;
    let max = 10;
    let keys = message.guild.roles.keyArray();
    //console.log(keys);
  
    if (con === 'start') {
        if (start > 0) return message.channel.send('Une partie à deja commencé.');
        if(hMany < min || hMany > 10) return message.channel.send(`Il faut être ${min} pour lancer une partie (et ${max} maximum).`);
        if(hMany >= min || hMany <= 10)  {
            if (!actual.users.find( user => user.id === message.author.id)) return message.channel.send("Tu ne fais pas partie des joueurs. Pour en faire partie '!lg join'.");

          let createChannel = (name, type, papa) => {
            return message.guild.createChannel(name, {type: type, parent: papa});
          };
  
          
          let createRole = (name, color) => {
            return message.guild.createRole({name: name, color: color});
          };
  
           (async () => {
            await actual.arrayChannel.push(await createChannel('LG', 'category'));
            //console.log(await actual.arrayChannel);
  
            await actual.arrayChannel.push(await createChannel('Village', 'text', actual.arrayChannel[0].id));
            actual.arrayChannel[1].send("Bienvenue dans le Village, retrouvez vos rôles respectifs dans les salons textuels qui viennent d'ètre crée.");
            actual.arrayChannel[1].send("Vous avez maintenant 30 secondes avant que la nuit ne tombe.");
            await actual.arrayChannel.push(await createChannel('Village', 'voice', actual.arrayChannel[0].id));
            
  
            await actual.arrayRoles.push(await createRole('⠀', 'RED')); // Voyante   0
            await actual.arrayRoles.push(await createRole('⠀', 'GREEN')); //Loups    1
            await actual.arrayRoles.push(await createRole('⠀', 'BLUE'));  //Sorcière  2
            await actual.arrayRoles.push(await createRole('⠀', 'YELLOW'));    // Villageois  3

  
            await actual.arrayChannel.push(await createChannel('Loups', 'text', actual.arrayChannel[0].id)); // 3
            actual.arrayChannel[3].send("Vous êtes Loups-Garous, chaque nuit vous pourrez choisir de tuer une personne en vous concertant !\nTuez tout le monde pour gagner.")
            actual.arrayChannel[3].send("Pour voter une personne a tuer faites 'kill' puis le nom de la personne. Il n'y a qu'un vote par personne, mettez vous d'accord sinon vous ne tuez personne !");
            await actual.arrayChannel.push(await createChannel('Sorcière', 'text', actual.arrayChannel[0].id)); // 4
            actual.arrayChannel[4].send("Vous êtes la Sorcière, chaque nuit vous aurez deux choix :\n1) Réanimez la personne morte cette nuit.\n2) Tuer une personne de votre choix.\nAttention ! Ces choix sont uniques a chaque partie.\nTuez les Loups-Garous pour gagner.");
            actual.arrayChannel[4].send("Pour réanimez faites 'revive' suivi du nom de la personne, pour tuez pareille mais avec 'kill'. (Une commande par nuit et par partie.)");
            await actual.arrayChannel.push(await createChannel('Voyante', 'text', actual.arrayChannel[0].id)); // 5
            actual.arrayChannel[5].send("Vous êtes la Voyante, chaque nuit vous pourrez désignez un joueur afin de découvrir son rôle.\nVotre rôle est primordiale dans là chasse aux loups-garous, n'éveillez pas les soupcons !\nTuez les Loups-Garous pour gagner.");
            actual.arrayChannel[5].send("Pour voir le rôle de quelqu'un faites 'see' suivi du nom de la personne. (Une commande par nuit.)");

            await bot.randomRole(serveur, guild, actual, message);

            for (j = 0; j < actual.arrayChannel.length; j++){
                for(i = 0; i < keys.length; i++){
                    await actual.arrayChannel[j].overwritePermissions((keys[i]), {'VIEW_CHANNEL': false, 'CONNECT': false, 'ADMINISTRATOR ': false, 'SPEAK': false });
                 }
            }
            console.log('done');

            await bot.seeChannel(serveur, guild, actual, message);
            
  
            let s = 30;
            let time = await actual.arrayChannel[1].send(`La nuit tombe dans : ${s} secondes.`);
            //console.log(time);
            
            let timeout = () => {
                return new Promise( (resolve, reject) => {
                    let i = 0;
                    
                    let interval = setInterval( () => {
                        if (actual.arrayChannel.length === 0 || actual.arrayChannel[0] === undefined) return clearInterval(interval);
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
        //console.log(actual.users);
         console.log(actual.arrayRoles);
        // console.log(actual.arrayChannel);
      } else if (con === 'reset') {
        if(start === 0 || hMany === 0) return message.channel.send( 'Pas de parties en cours.');
        if (!actual.users.find( user => user.id === message.author.id)) return message.channel.send("Tu ne fais pas partie des joueurs.");
        else {  
            
            // let deletedUniversal = (element) => {
            //     return new Promise( (resolve, reject) => {
    
            //         for (let i = element.length; i--;){
            //             element[i].deleted = true;
            //             setTimeout( () => {
            //                 element[i].delete();
            //                 element.splice(i, 1);
            //             }, 2000)
            //         };
            //         resolve('finished');
            //         reject(console.error());
            //     })
            // };


            // set timeout pour reset le i a 0 et delete comme ça un par un 
            
            let deletedUniversal = (element) => {
                    for (let i = 0; i < element.length; i++){                     
                            element[i].deleted = true;
                            element[i].delete();
                            element.splice(i, 1);
                    };
            }
    
            (async () => {

                await deletedUniversal(await serveur.get(message.guild.id).arrayRoles);
                //console.log(await serveur.get(message.guild.id).arrayRoles);

                await deletedUniversal(await serveur.get(message.guild.id).arrayChannel);
                //console.log(await serveur.get(message.guild.id).arrayChannel);

                actual.users.splice(0, actual.users.length);
                //console.log(actual.users);
            })();
        }
  } else if (con === 'bug'){
     actual.arrayChannel[1].overwritePermissions((actual.arrayRoles[0].id), {'SEND_MESSAGES': true });
    console.log( actual.arrayChannel[1].permissionsFor(actual.users[0].id));

  }
}