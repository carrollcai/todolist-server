const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const session = require('koa-session2');


app.use(bodyparser());

app.use(session({
  key: 'account',
}));

router.get('/', async (ctx, next) => {
  ctx.body = "all users list ok!";
});

app.use(router.routes());

const controller = require('./router');
app.use(controller());
// app.use(cookie());

app.listen(5000);