const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model')
const saltRounds = 10;


/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      /* console.log('Newly created user is: ', userFromDB); */
      res.redirect(`/userProfile/${userFromDB.username}`);
    })
    .catch(error => next(error));
});

router.get('/userProfile/:username', (req, res) => {
  User.findOne({username: req.params.username})
  .then(founduser => {
    res.render('auth/user', {user: founduser})
  })

});



module.exports = router;