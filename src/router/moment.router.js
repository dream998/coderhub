const Router = require('koa-router')
const {verifyAuth,verifyPermission} = require('../middleware/auth.middleware')
const {create,detail,list,update,remove,addLabels,fileInfo} = require('../controller/moment.controller')

const {verifyLabelExists} = require('../middleware/label.middleware')
const momentRouter = new Router({prefix:'/moment'})
// 发表动态
momentRouter.post('/',verifyAuth,create)
// 根据动态id获取某条动态的详情
momentRouter.get('/:momentId',detail)
// 获取多条动态
momentRouter.get('/',list)
// 更新某条动态
momentRouter.patch('/:id',verifyAuth,verifyPermission('moment'),update)
// 删除某条动态
momentRouter.delete('/:id',verifyAuth,verifyPermission('moment'),remove)
// 为动态添加标签
momentRouter.post('/:id/labels',verifyAuth,verifyPermission('moment'),verifyLabelExists,addLabels)
// 请求动态配图
momentRouter.get('/images/:filename',fileInfo)
module.exports = momentRouter