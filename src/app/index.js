const Koa = require('koa')
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const useRoutes = require('../router/index')
const errorHandler = require('./error-handler')
const bodyParser = require('koa-bodyparser')

const app = new Koa()


app.use(bodyParser())

useRoutes(app)

app.on('error',errorHandler)

module.exports = app