module.exports = (message, con) => {

  let test = new Map();
 

    if (con === 'roles') {
      test.set(message.guild.id, {
        users : [],
        arrayRoles: []
      })
      let actual = test.get(message.guild.id);
    

      let createRole = (name, color) => {
        return message.guild.createRole({name: name, color: color});
      };
       
      (async () => {
             
        await actual.arrayRoles.push(await createRole('⠀', 'RED'));
        await actual.arrayRoles.push(await createRole('⠀', 'GREEN'));
        await actual.arrayRoles.push(await createRole('⠀', 'BLUE'));
        await actual.arrayRoles.push(await createRole('⠀', 'PINK'));

        console.log(actual);
       })();
    
      } else if (con === 'delete'){

        let deletedUniversal = (element) => {
          return new Promise( (resolve, reject) => {

              for (let i = element.length; i--;){
                  element[i].deleted = true;
                  setTimeout( () => {
                      element[i].delete();
                      element.pop();
                  }, 500)
              };
              resolve('finished');
              reject(console.error());
          })
      };

      (async () => {

          await deletedUniversal(await test.get(message.guild.id).arrayRoles);
          //console.log(await serveur.get(message.guild.id).arrayRoles);
      })();
      
    }
}