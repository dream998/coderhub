const connection = require('../app/database')
const commentService = require('../service/comment.service')
class commentController{
    async create(ctx,next){
        
        const {momentId,content,commentId} = ctx.request.body
        const {id:userId} = ctx.user
        console.log(momentId,content,commentId,'用户id',userId);
        const result = await commentService.create(momentId,content,userId,commentId)
        ctx.body = result
    }
    async remove(ctx,next){
        console.log('开始删除');
        const {id} = ctx.params;
        const result = await commentService.remove(id)
        ctx.body = result
    }
    async list(ctx,next){
        console.log('获取评论列表');
        const {momentId} = ctx.query
        //console.log(momentId);
        const result = await commentService.getCommentsByMomentId(momentId)
        ctx.body = result
    }
}

module.exports = new commentController()