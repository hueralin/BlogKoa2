const { genPassword } = require('../utils/cryp')
const { exec, escape } = require('../db/mysql')

// 用户登录
const login = async (username, password) => {

    username = escape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    let sql = `
        select username, realname from users where username = ${username} and password = ${password};
    `
    // console.log('SQL: ', sql)
    const rows = await exec(sql)
    return rows[0] || {}
    // return exec(sql).then(rows => {
    //     // console.log('LOGIN: ', rows[0])
    //     return rows[0] || {}
    // })
}

module.exports = {
    login
}
