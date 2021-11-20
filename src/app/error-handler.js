const errorTypes = require('../constants/error-types')
const errorHandler = (error, ctx) => {
    console.log(error.message);
    let status, message

    switch (error.message) {
        case errorTypes.NAME_ORPASSWORD_IS_REQUIRED:
            status = 400
            message = "用户名或者密码不能为空"
            break;

        case errorTypes.USER_ALREADY_EXISTS:
            status = 409
            message = '用户名已经存在'
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400
            message = '用户名不存在'
            break;
        case errorTypes.PASSWORD_IS_NOT_CURRENT:
            status = 400
            message = '密码错误'
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401
            message = '无效的token'
            break;
        case errorTypes.UNPERMISSION:
            status = 401
            message = '不具备操作权限'
            break;
        default:
            status = 404
            message = 'NOT FOUND'
            break;
    }
    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler