const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const app = new Koa()
const testRouter = new Router()
// 获取生成的私钥和密钥，读取文件得到的是二进制字节流
const PRIVATE_KEY = fs.readFileSync('./private.key')
const PUBLIC_KEY = fs.readFileSync('./public.key')
// 登录接口
testRouter.post('/test',(ctx,next)=>{
    const user = {id:110,name:'zhang'}
    const token = jwt.sign(user,PRIVATE_KEY,{
        expiresIn: 10, //设置过期时间，单位是秒
        // 指定加密算法
        algorithm:'RS256'
    })

    ctx.body = token
    console.log('生成token',token);
})
// 验证接口
testRouter.get('/demo',(ctx,next)=>{
    const token = ctx.headers.authorization.replace('Bearer ','')
    console.log('收到token',token);
    try {
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        console.log(result);
        ctx.body = result
        /**
         * token解析出的信息
         * {
                "id": 110,
                "name": "zhang",
                "iat": 1636869416,
                "exp": 1636869426
            }
         */
    } catch (error) {
        ctx.body = 'TOKEN是無效的'
        console.log(error.message);
    }
})
app.use(testRouter.routes())
app.listen(8000,()=>{
    console.log('服务器启动成功');
})
