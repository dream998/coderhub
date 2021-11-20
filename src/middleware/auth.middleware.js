const jwt = require('jsonwebtoken')
const {PUBLIC_KEY} = require('../app/config')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handler')
const authService = require('../service/auth.service')
const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // 判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_ORPASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result = await userService.getUserByName(name)
    //console.log(result);
    const user = result[0]
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否和数据库中的密码一致
    
    if(md5password(password) !== user.password){
        const error = new Error(errorTypes.PASSWORD_IS_NOT_CURRENT)
        return ctx.app.emit('error',error,ctx)
    }
    ctx.user = user
    await next()
}
const verifyAuth = async (ctx,next)=>{
    console.log('验证授权的middleware');
    // 获取token
    const authorization = ctx.headers.authorization
    if(!authorization){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
    const token = authorization.replace('Bearer ','')
    // 验证token
    try {
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        ctx.user = result
        await next()
    } catch (error) {
        const err = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error',err,ctx)
    }
}

const verifyPermission = (tableName)=>{
    return async (ctx,next)=>{
        console.log('验证权限的middleware');
        // 获取momentId和用户id
        
        const {id} = ctx.params;
        const {id:userId} = ctx.user
        //console.log(id,userId);
        // 查询是否具备权限
        try {
            
            const isPermission = await authService.checkResource(tableName,id,userId)
            //console.log(isPermission);
            if(!isPermission) throw new Error()
            await next()
           
        } catch (err) {
            const error = new Error(errorTypes.UNPERMISSION)
            return ctx.app.emit('error',error,ctx)
        }
        
        
    }
}
module.exports = {
    verifyLogin,verifyAuth,verifyPermission
}