const { off } = require('../app/database');
const connection = require('../app/database')
const errorTypes = require('../constants/error-types');
const { update } = require('../controller/moment.controller');
class MomentService {
    async create(userId, content) {
        const statement = 'insert into moment (user_id,content) values (?,?)';
        try {
            const [result] = await connection.execute(statement, [userId, content]);
            console.log(result);
            return result
        } catch (error) {
            console.log('插入失败', error.message);
        }


    }
    async getMomentById(id) {
        try {
            const statement = `
            SELECT 
                m.id id, m.content content, m.createAt createTime,m.updateAt updateTime,
                JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user 
            FROM moment m
            LEFT JOIN users u ON m.user_id = u.id
            WHERE m.id = ${id}
            `;
            const [result] = await connection.execute(statement)
            result[0].user = JSON.parse(result[0].user)

            return result
        } catch (error) {
            console.log(error);
        }
    }

    async getMomentList(offset, size) {
        try {
            const statement = `
            SELECT 
            m.id id, m.content content, m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user ,
						(SELECT count(*) FROM comment c WHERE c.moment_id = m.id) commentCount
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        limit 0, 10 
            `

            const [result] = await connection.execute(statement, [offset, size])


            return result
        } catch (error) {

        }
    }

    async update(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }
    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?`
        const result = await connection.execute(statement, [momentId])
        return result
    }

    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result[0] ? true : false
    }
    async addLabel(momentId,labelId){
        const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?)`
        const [result] = await connection.execute(statement,[momentId,labelId])
        return result
    }
}



module.exports = new MomentService()