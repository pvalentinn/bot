module.exports = (message, serveur) => {
    let guild = message.guild.id;
    let actual = serveur.get(guild);
    

    if (actual.gameStart === 0) return;
    if (actual.gameStart === 1) {
        let actualChannel = actual.arrayChannel.includes(message.channel);
        if (actualChannel === false) return;
        
    }
    
}