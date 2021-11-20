const Router = require('koa-router')
const {verifyAuth,verifyPermission} = require('../middleware/auth.middleware')
const {create,remove,list} = require('../controller/comment.controller')

const commentRouter = new Router({prefix:'/comment'})
// 发布评论
commentRouter.post('/',verifyAuth,create)
// 删除评论
commentRouter.delete('/:id',verifyAuth,verifyPermission('comment'),remove)
// 获取评论列表
commentRouter.get('/',list)
module.exports = commentRouter
