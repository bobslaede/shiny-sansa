"use strict";

module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/', (req, res, next) => {

    app.models.User.find((err, users) => {
      //console.log(users);
    })

    app.models.User.findOne({where: { email: 'jeppe.dyrby@gmail.com'}}, (err, user) => {
      console.log(user);
    })

    next();
  });

  app.use(router);
};
