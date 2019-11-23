module.exports = (message) => {
    const Discord = require('discord.js');

    if (message.content.startsWith('!timer')){
        let args = (message.content.slice(6).slice()).slice(1);

        if ( isNaN(args) === true || Number(args) === NaN ) message.channel.send("La commande nécessite '!timer' suivi d'un nombre.");
        if ( args >= 100 || args <= 0) message.channel.send("La commande n'accepete que les nombres au dessus 0 et en dessous 101.");
        else {

            async function timer (s) {
            
                let time = await message.channel.send(`La nuit tombe dans : ${s} secondes.`);
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
            }
            timer(args);
        }

    }
}