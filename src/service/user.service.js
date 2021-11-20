const connection = require('../app/database')

class UserService {
    async create(user) {
        // 将user存在数据库中
        const { name:username, password } = user
        const statement = `INSERT INTO users(name,password) VALUES (?,?);`
        const result = await connection.execute(statement,[username,password])
        // console.log('将用户数据保存在数据库中', user);
        return result[0]
    }
    async getUserByName(name){
        const statement = `select * from users where name = ?`
        const result = await connection.execute(statement,[name])
        return result[0]
    }
    async updateAvatarUrlById(userId,avatarUrl){
        try {
            const statement = `update users set avatar_url = ? where id = ?`;
            const [result] = await connection.execute(statement,[avatarUrl,userId])
            return result
        } catch (error) {
            console.log(error);
        }
       
    }
}

module.exports = new UserService()