let mysql = require("mysql");

//登录请求
function sqlUser(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    results: result[0],
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

//登录请求
function sqlShoping(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length != 0) {
                resolve({
                    status: 200,
                    results: result,
                })
            } else {
                resolve({
                    status: 400,
                })
            }
        });
    });
}

function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

// 连接数据库
function connect() {
    connection.connect(handleError);
    connection.on('error', handleError);
}
let connection = mysql.createConnection({
    host: "47.107.88.192",
    user: "root",
    password: "990731",
    database: "back",
});
connect();

module.exports = {
    sqlUser,
    sqlShoping
}