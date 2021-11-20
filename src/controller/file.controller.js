const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {APP_HOST,APP_PORT} = require('../app/config')
class FileController{
    async saveAvatarInfo(ctx,next){
        const {mimetype,filename,size} = ctx.req.file
        const {id} = ctx.user
        const result = await fileService.createAvatar(filename,mimetype,size,id)
        // 2.将图像信息保存在服务器中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        await userService.updateAvatarUrlById(id,avatarUrl)
        ctx.body = '上传头像成功';

    }

    async savePictureInfo(ctx,next){
        // 1.获取图像信息
        const files = ctx.req.files;
        const {id} = ctx.user
        const {momentId} = ctx.query
       
        // 2. 将文件信息保存在数据库中
        for (const file of files) {
            const {mimetype,filename,size} = file;
            await fileService.createFile(filename,mimetype,size,id,momentId)
        }
        ctx.body = '动态配图上传完成'
    }
}

module.exports = new FileController()