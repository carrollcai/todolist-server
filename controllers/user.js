/**
 * user 控制器
 * set cookie部分后面设计
 * @author carrollai
 */

const { model: model } = require('../model/user');

const register = async (ctx, next) => {
  const { account, password, nickname } = ctx.request.body;
  // console.log(ctx);

  if (account.length <= 6 || account.length >= 18) {
    // let data = await postData(ctx);
    // ctx.body = data;
    console.log(ctx.response);

    ctx.response.body = {
      code: -1,
      msg: '用户名需在6~18位之间'
    };
    return false;
  }

  let accounts = await model.findAll({
    where: {
      account: {
        $like: account
      }
    }
  });
  if (accounts.length > 0) {
    ctx.response.body = {
      code: -1,
      msg: '用户名不允许重复'
    };
    return false;
  }
  await model.create(ctx.request.body);
  ctx.response.body = {
    code: 200,
    msg: '创建成功',
  };
};

const login = async (ctx, next) => {
  console.log(next);
  const { account, password } = ctx.request.body;
  let accounts = await model.findAll({
    where: {
      account: {
        $like: account
      }
    }
  });
  if (accounts.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: '用户名不存在'
    };
    return false;
  }
  if (accounts[0].password !== password) {
    ctx.response.body = {
      code: -1,
      msg: '密码不正确'
    };
    return false;
  }
  
  ctx.cookies.set("account", account, {key: account});
  ctx.session.account = account;
  ctx.response.body = {
    code: 200,
    msg: '登录成功',
    data: {
      nickname: accounts[0].nickname
    }
  };
};

// function postData(ctx) {
//   return new Promise((resolve, reject) => {
//     try {
//       let str = '';
//       ctx.req.on('data', (data) => {
//         str += data;
//       });
//       ctx.req.on('end', () => {
//         let postdata = parser(str);
//         resolve(postdata);
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

module.exports = {
  'POST /register': register,
  'POST /login': login,
};