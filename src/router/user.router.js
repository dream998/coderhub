const Router = require('koa-router')
const userRouter = new Router({prefix:'/users'})
const {create,avatarInfo} = require('../controller/user.controller')
const {verifyUser,handlerPassword} = require('../middleware/user.middleware')
//console.log(create);
userRouter.post('/',verifyUser,handlerPassword,create)

userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter
