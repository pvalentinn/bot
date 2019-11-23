module.exports = (message, con, arrayRoles) => {

    let roles = [];

    if (con === 'roles') {

        function returnRole (role) {
          roles.push(role);
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
          await message.guild.createRole({name: '⠀', color: 'BLACK',})
          .then (role => returnRole(role))
          .catch(console.error);

          arrayRoles.set(message.guild.id, roles);
              console.log(arrayRoles);
              console.log(roles);
              //console.log(arrayRoles[0]);
         })();
    
      } else if (con === 'delete'){

      let deletedRoles = () => {
        for (let i = arrayRoles.get(message.guild.id).length; i--;){
          arrayRoles.get(message.guild.id)[i].deleted = true;
          arrayRoles.get(message.guild.id)[i].delete();
          console.log(arrayRoles.get(message.guild.id)[i]);
          arrayRoles.get(message.guild.id).splice(i, 1);
          //await arrayRoles.shift(); 
        };
        //
        //;
        
      };
      deletedRoles();
      console.log(arrayRoles);
      
    }
}