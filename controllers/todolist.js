/** 
 * todolist 控制器
 * @author carrollai
*/

const { model: todolistModel } = require('../model/todolist');
const { model: todotypeModel } = require('../model/todotype');

const _create = async (ctx, next) => {
  const { todotypeId, text } = ctx.request.body;
  if (!todotypeId) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型不存在',
    };
    return false;
  }
  const todotypes = await todotypeModel.findById(Number(todotypeId));
  if (!todotypes) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型不存在',
    };
    return false;
  }

  await todolistModel.create(ctx.request.body);
  console.log(todotypes);
  let sum = todotypes.sum + 1;
  let undoSum = todotypes.undoSum + 1;
  await todotypeModel.update({
    sum,
    undoSum
  },{
    where: {
      id: {
        $like: Number(todotypeId)
      }
    }
  });

  ctx.response.body = {
    code: 200,
    msg: '创建成功',
  };
};

const _get = async (ctx, next) => {
  const { todotypeId } = ctx.request.body;
  if (!todotypeId) {
    ctx.response.body = {
      code: -1,
      msg: 'todo类型不存在',
    };
    return false;
  }
  let todolists = await todolistModel.findAll({
    where: {
      todotypeId: {
        $like: Number(todotypeId)
      }
    }
  });
  ctx.response.body = {
    code: 200,
    msg: '成功',
    data: todolists
  };
};

const _update = async (ctx, next) => {
  const { id, todotype } = ctx.request.body;
  let todolists = await todolistModel.findAll({
    where: {
      id: {
        $like: id
      }
    }
  });
  if (todolists.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: '此条todo内容不存在',
    };
    return false;
  }
  await todolistModel.update({
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
  let todolists = await todolistModel.findAll({
    where: {
      id: {
        $like: id
      }
    }
  });
  if (todolists.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: '此条todo内容不存在',
    };
    return false;
  }
  await todolistModel.destroy({
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

const _complete = async (ctx, next) => {
  const { id } = ctx.request.body;
  let todolists = await todolistModel.findAll({
    where: {
      id: {
        $like: id
      }
    }
  });
  if (todolists.length === 0) {
    ctx.response.body = {
      code: -1,
      msg: '此条todo内容不存在',
    };
    return false;
  }
  if (todolists[0].isComplete) {
    ctx.response.body = {
      code: -1,
      msg: '此条todo内容已完成，请勿重复更新',
    };
    return false;
  }
  await todolistModel.update({
    isComplete: true
  },{
    where: {
      id: {
        $like: id
      }
    }
  });

  let todotypeId = todolists[0].todotypeId;
  let todotypes = await todotypeModel.findById(Number(todotypeId));
  let undoSum = todotypes.undoSum - 1;
  await todotypeModel.update({
    undoSum
  },{
    where: {
      id: {
        $like: Number(todotypeId)
      }
    }
  });
  ctx.response.body = {
    code: 200,
    msg: 'todo成功'
  };
};

module.exports = {
  'POST /todolist/create': _create,
  'POST /todolist/get': _get,
  'POST /todolist/update': _update,
  'POST /todolist/delete': _delete,
  'POST /todolist/complete': _complete,
};