const jwt = require('jsonwebtoken');
const User = require("../../models/user");
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken
};

function checkToken(req, res) {
  // Verify middleware is doing its job
  console.log('req.user', req.user);
  // req.exp comes from the checkToken middleware function we just mounted in server.js
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user));
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
//      Baby step...before adding the neccessary try catch
//     res.json({
//         user: {
//         name: req.body.name,
//         email: req.body.email
//         }
//   });
try {
    // Add the user to the database
    const user = await User.create(req.body);
     // token will be a string
     const token = createJWT(user);
     // Yes, we can use res.json to send back just a string
     // The client code needs to take this into consideration
     res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
    //   usually you want a token to expire
      { expiresIn: '24h' }
    );
  }