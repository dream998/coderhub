const connection = require('../app/database')
const service = require('../service/label.service')
verifyLabelExists = async (ctx,next)=>{
    const newLabels = []
    const {labels} = ctx.request.body
    for(let name of labels){
        const labelResult = await service.getLabelByName(name)
        const label = {name}
        if(!labelResult){
            // 创建标签数据
            const result = await service.create(name)
            label.id = result.insertId
        }else{
            label.id = labelResult.id
        }
        newLabels.push(label)
        
    }
    //console.log(newLabels);
    ctx.labels = newLabels
    await next()
}

module.exports = {verifyLabelExists}