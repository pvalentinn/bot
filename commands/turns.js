// module.exports = (bot, message, serveur) => {
//     let guild = message.guild.id;
//     let actual = serveur.get(guild);
    

//     if (actual.gameStart === 0) return;
//     if (actual.gameStart === 1) {
//         console.log(actual.start[0]);
//         let actualChannel = actual.arrayChannel.includes(message.channel);
//         if (actualChannel === false) return;
//         if (actualChannel === true) {
//             let vivants = actual.users.filter(user => user.status !== 4);
//             let loups = actual.arrayRoles[1].members.keyArray();
//             let villageois = [...actual.arrayRoles[0].members.keyArray() , ...actual.arrayRoles[2].members.keyArray() , ...actual.arrayRoles[3].members.keyArray()];

//             let actualize = () => {
//                 loups = actual.arrayRoles[1].members.keyArray();
//                 villageois = [...actual.arrayRoles[0].members.keyArray() , ...actual.arrayRoles[2].members.keyArray() , ...actual.arrayRoles[3].members.keyArray()];
//                 if (loups.length === 0 || villageois.length === 0) return;
//             }

//            // do {
//                 (async () => {
//                     if (message.content === "!lg leave") {
//                         await bot.leave(serveur, guild, actual, message);
//                         actualize();
//                     }
//                     console.log(1);
//                 })()
//                 // console.log(villageois);
//                 // console.log(loups);

//                 //break;
//             //} while(loups.length > 0 || villageois.length > 0);

//             if (loups.length === 0 ) {
//                 actual.start[0].send("Partie terminé ! Les Loups-Garous ont gagnés.");
//                 bot.reset(serveur, guild, actual, message);
//             } else if (villageois.length === 0 ) {
//                 actual.start[0].send("Partie terminé ! Les Villageois ont gagnés.");
//                 bot.reset(serveur, guild, actual, message);
//             }
//         }
//     }
    
// }