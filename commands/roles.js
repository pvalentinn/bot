module.exports = (message, con, arrayRoles) => {
    if (con === 'roles') {

        function returnRole (role) {
          arrayRoles.push(role);
          //console.log(`Created new role with name ${role.name} and color ${role.color}`);
        };
       
         (async () => {
          await  message.guild.createRole({name: '⠀', color: 'RED',})
              .then(role => returnRole(role))
              .catch(console.error);
              await message.guild.createRole({name: '⠀', color: 'GREEN',})
              .then(role => returnRole(role))
              .catch(console.error);
              await message.guild.createRole({name: '⠀', color: 'BLUE',})
              .then (role => returnRole(role))
              .catch(console.error);
        
              console.log(arrayRoles);
              //console.log(arrayRoles[0]);
         })();
    
      } else if (con === 'delete'){
    
        for (let i = 0; i < arrayRoles.length; i++){
          message.guild.roles.find(role => role.id === arrayRoles[i].id).delete().then( () => {
            for (let i = 0; i < arrayRoles.length; i++){
              if (arrayRoles.find( role => role.deleted=== true)) {
                arrayRoles.splice(i, 1);
                i--;
              }
            };
          });
          console.log(`deleted ${arrayRoles[i].id} successfully`);
      }
      setTimeout(() => {
        console.log(arrayRoles);  
      }, 1000);
    
    }
}