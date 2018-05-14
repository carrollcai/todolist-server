const checkCookie = async (ctx, next) => {
  if (ctx.cookies.get("account", {key: "account"})) {
    next();
  } else {
    ctx.response.body = {
      code: 401,
      msg: '未登录',
    };
    return false;
  }
};
module.exports = checkCookie;