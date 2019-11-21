module.exports = (msg) => {

    if (msg.content.startsWith('!purge')){
        //console.clear();
        let purgeLess = msg.content.slice(6).split(' ');
        let word = purgeLess.slice(1);    
    
        if ( isNaN(word) === true || word.length > 1  || Number(word) === NaN ) msg.channel.send("La commande nécessite '!purge' suivi d'un nombre.");
        if ( word > 100 || word == 0) msg.channel.send("La commande n'accepete que les nombres au dessus 0 et en dessous 101.");
        else {
          async function purge() {
          
            const messages =  await msg.channel.fetchMessages({limit: word});
            msg.channel.bulkDelete(messages)
            .then(messages => console.log(`Deleted ${messages.size} messages`))
            .catch(console.error);
            msg.channel.send(`Deleted ${messages.size} messages`);
      
          }
          purge();
      
          console.log('Clearing messages');
        }
      }
}