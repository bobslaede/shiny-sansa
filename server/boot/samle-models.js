"use strict";

module.exports = function (app) {


  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Organization = app.models.Organization;

  //return;


  User.create([
    {username: 'jeppe', email: 'jeppe.dyrby@gmail.com', password: 'foo'}
  ], (err, users) => {
    if (err) {
      throw err;
    }
    console.log('Created users', users);

    Organization.create([
      {name: 'Org2', users: users, ownerId: users[0].id}
    ], (err, organizations) => {
      if (err) {
        throw err;
      }
      console.log('Created organization', organizations);
    })

    //create the admin role
    Role.create({
      name: 'admin'
    }, (err, role) => {
      if (err) throw err;

      console.log('Created role:', role);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });


  });


}
