const Koa = require("koa");
const app = new Koa()
const Router = require('koa-router')
//获取post要使用第三方插件
const bodyParser = require('koa-bodyparser')

const cors = require("koa2-cors")
//node里面需要require引入
const db = require("./mysqlConnection.js")

const router = new Router();

const server = require('http').createServer(app.callback());

//跨域问题
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

//登录请求
router.post('/login', async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    let sql = `SELECT * FROM User WHERE username='${data.username}' AND password='${data.password}'`;
    const result = await db.sqlUser(sql);
    if (result.status == 200) {
        ctx.body = {
            message: "成功",
            code: 200,
            result: true,
            token: "isuser"
        }
    } else {
        ctx.body = {
            message: "账号密码错误",
            result: false,
            code: 400,
        }
    }
})

//商品请求
router.get('/getShopping', async (ctx, next) => {
    let sql = `SELECT * FROM shopping`;
    const result = await db.sqlShoping(sql);
    if (result.status == 200) {
        ctx.body = {
            message: "成功",
            code: 200,
            result: result.results,
        }
    } else {
        ctx.body = {
            message: "错误",
            result: false,
            code: 400,
        }
    }
})

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
//自动丰富响应头
app.use(router.allowedMethods());


server.listen(8010, () => {
    console.log('server is running at http://localhost:8010')
  })