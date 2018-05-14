const register = async (ctx, next) => {
  let accont = ctx.request.body.account;
  let password = ctx.request.body.password;
  let nickname = ctx.request.body.nickname;
  console.log(ctx);

  if (accont.length <= 6) {
    let data = await postData(ctx);
    ctx.body = data;
  }
  
};

function postData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let str = '';
      ctx.req.on('data', (data) => {
        str += data;
      });
      ctx.req.on('end', () => {
        let postdata = parser(str);
        resolve(postdata);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  'POST /register': register,
};