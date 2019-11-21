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

      let deletedRoles = () => {
        for (let i = arrayRoles.length; i--;){
          arrayRoles[i].deleted = true;
          
          arrayRoles[i].delete();
          console.log(arrayRoles[i]);
          arrayRoles.splice(i, 1);
          //await arrayRoles.shift(); 
        };
        //
        //;
        
      };
      deletedRoles();
      console.log(arrayRoles);
      
    }
}