const connection = require('../app/database')

class CommentService {
    async create(momentId, content, userId, commentId) {
        const commentStatement = `INSERT INTO comment(content,moment_id,user_id) VALUES(?,?,?)`
        const replyStatement = `INSERT INTO comment(content,moment_id,user_id,comment_id) VALUES(?,?,?,?)`
        if (commentId) {
            console.log('这是回复');
            const result = await connection.execute(replyStatement, [content, momentId, userId, commentId])
            return result
        } else {
            console.log('这是评论');
            console.log(content, momentId, userId);
            try {
                const result = await connection.execute(commentStatement, [content, momentId, userId])
                return result
            } catch (error) {
                console.log('插入评论失败');
            }

        }

    }
    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id = ?`
        const result = await connection.execute(statement, [commentId])
        return result
    }
    async getCommentsByMomentId(momentId){
        const statement = `SELECT  * FROM comment WHERE moment_id = 4`
        const [result] = await connection.execute(statement)
        
        return result
    }
}

module.exports = new CommentService()