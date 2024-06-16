const authRouter = require('express').Router();
const { register, login } = require('../controllers/auth.controller')

// user Auth
authRouter.route('/register').post(register)
authRouter.route('/login').post(login)



module.exports = { authRouter };