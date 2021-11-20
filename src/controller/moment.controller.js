const fs = require('fs')
const {PICTURE_PATH} = require('../constants/file-path')
const momentService = require('../service/moment.service')
const {getFileByFilename} = require('../service/file.service')
class MomentController{
    async create(ctx,next){
        // 获取数据
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        console.log(userId);
        console.log(content);
        // 将数据插入到数据库中
        const result = await momentService.create(userId,content)
        ctx.body = result

    }
    async detail(ctx,next){
        // 获取动态id
        const momentId = ctx.params.momentId
        // 根据动态id获取动态
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }
    async list(ctx,next){
        const {offset,size} = ctx.query;
        const result = await momentService.getMomentList(offset,size)
        ctx.body = result
    }
    async update(ctx,next){
        const {momentId} = ctx.params;
        const {content} = ctx.request.body;
        
        const result = await momentService.update(content,momentId)
        ctx.body = result;
    }
    async remove(ctx,next){
        const {momentId} = ctx.params;
        const result = await momentService.remove(momentId);
        ctx.body = result
    }
    async addLabels(ctx,next){
        const {labels} = ctx
        const {id:momentId} = ctx.params
        // console.log('添加标签');
        
        for(let label of labels){
            // 判断标签是否已经和动态有关系
            //console.log(momentId,label.id);
            const isExist = await momentService.hasLabel(momentId,label.id)
            
            if(!isExist){
                const result = await momentService.addLabel(momentId,label.id)
            }
        }
        
        ctx.body = '为动态添加标签成功'
    }
    async fileInfo(ctx,next){
        console.log('开始了');
        const {filename} = ctx.params;
        console.log(filename);
        const result = await getFileByFilename(filename)
        ctx.response.set('content-type',result.mimetype)
        ctx.body =  fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}
module.exports = new MomentController