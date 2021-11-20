const labelService = require('../service/label.service')
class LabelControl{
    async create(ctx,next){
        
        const {name} = ctx.request.body
        //console.log(name);
        const result = await labelService.create(name)
        ctx.body = result
    }
}
module.exports = new LabelControl()

