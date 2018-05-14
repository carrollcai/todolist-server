/** 
 * todotype 控制器
 * @author carrollai
*/

const { model: model } = require('../model/todotype');
const checkCookie = require('../middleware/checkCookie');

const _create = async (ctx, next) => {
  console.log(ctx.cookie);
  checkCookie(ctx, next);
  const { todotype } = ctx.request.body;
  if (!todotype) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型必填',
    };
    return false;
  }
  let todotypes = await model.findAll({
    where: {
      todotype: {
        $like: todotype
      }
    }
  });
  if (todotypes.length > 0) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型已存在',
    };
    return false;
  }

  await model.create(ctx.request.body);
  ctx.response.body = {
    code: 200,
    msg: '创建成功',
  };
};

const _get = async (ctx, next) => {
  console.log(ctx.cookies);
  await checkCookie(ctx, next);
  let todotypes = await model.findAll();
  ctx.response.body = {
    code: 200,
    msg: '成功',
    data: todotypes
  };
};

const _update = async (ctx, next) => {
  const { id, todotype } = ctx.request.body;
  let todotypes = await model.findAll({
    where: {
      id: {
        $like: id
      }
    }
  });
  if (todotypes.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型不存在',
    };
    return false;
  }
  await model.update({
    ...ctx.request.body
  },
    {
      where: {
        id: {
          $like: id
        }
      }
    });
  ctx.response.body = {
    code: 200,
    msg: '更新成功'
  };
};

const _delete = async (ctx, next) => {
  const { id } = ctx.request.body;
  let todotypes = await model.findAll({
    where: {
      id: {
        $like: id
      }
    }
  });
  if (todotypes.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型不存在',
    };
    return false;
  }
  await model.destroy({
    where: {
      id: {
          $like: id
      }
    }
  });
  ctx.response.body = {
    code: 200,
    msg: '删除成功'
  };
};

module.exports = {
  'POST /todotype/create': _create,
  'POST /todotype/get': _get,
  'POST /todotype/update': _update,
  'POST /todotype/delete': _delete,
};