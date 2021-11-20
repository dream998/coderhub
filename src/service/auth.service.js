const connection = require('../app/database')
class authService{
    async checkResource(tableName,id,userId){
        console.log(tableName,id,userId);
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
        const [result] = await connection.execute(statement,[id,userId])
        
        return result.length === 0 ?false:true;
    }
}

module.exports = new authService