const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
  User.find({})
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:' + err));
})

router.post('/', (req, res) => {
  const { name, password, gender, address, email, phone } = req.body;

  //simple vailidation
  if (!name || !email || !password || !gender || !phone || !address) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  //Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user)
        return res.status(400).json({ msg: "User already exist" });

      const newUser = new User({
        name,
        password,
        gender,
        address,
        email,
        phone
      });

      //Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 7200 },
                (err, token) => {
                  if (err)
                    throw err;

                  res.json({
                    token: token,
                    user: {
                      id: user.id,
                      name: user.name,
                      gender: user.gender,
                      address: user.address,
                      email: user.email,
                      phone: user.phone
                    }
                  });
                }
              )
            });
        });
      });
    });
});

module.exports = router;