const bcrypt = require('bcrypt');
const User = require("../models/userModels");
const auth = require("../auth");
const { errorHandler } = auth;

module.exports.registerUser = (req, res) => {
    if (!req.body.email.includes("@")) {
        return res.status(400).send({ message: 'Email invalid' });
    } else if (req.body.password.length < 8) {
        return res.status(400).send({ error: 'Password must be at least 8 characters long' });
    } else {
        let newUser = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            isAdmin: false
        });
        
        if (req.body.firstName) newUser.firstName = req.body.firstName;
        if (req.body.lastName) newUser.lastName = req.body.lastName;
        
        return newUser.save()
            .then(() => res.status(201).send({ message: 'User registered successfully' }))
            .catch(error => errorHandler(error, req, res));
    }
};

module.exports.loginUser = (req, res) => {
    return User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'No email found' });
            }
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordCorrect) {
                return res.status(200).send({ access: auth.createAccessToken(user) });
            } else {
                return res.status(401).send({ error: 'Email and password do not match' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};


module.exports.getUserDetails = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({ error: 'Database error' });
    });
};