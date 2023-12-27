function myfetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['小红', '小明', '小李']);
    }, 3000);
  });
}

function getUser() {
  return myfetch();
}

function m1() {
  return getUser();
}

function m2() {
  return getUser();
}

function m3() {
  return getUser();
}

function main() {
  const user = m3();
  console.log('user', user);
}

// main();

function run(func) {
  let cache = [];
  let i = 0;

  // 保留原始的 myfetch
  const originalMyFetch = myfetch;
  // 重写 myfetch
  myfetch = () => {
    if (cache[i] && cache[i].status === 'fulfilled') {
      return cache[i].data;
    } else if (cache[i] && cache[i].status === 'rejected') {
      throw cache[i].err;
    }

    const result = { status: 'pending', data: null, err: null };
    cache[i++] = result;

    // 使用原始的 myfetch 发送请求
    const promise = originalMyFetch()
      .then((resp) => {
        result.status = 'fulfilled';
        result.data = resp;
      })
      .catch((err) => {
        result.status = 'rejected';
        result.err = err;
      });

    // 报错
    throw promise;
  };

  try {
    // 第一次执行 func 是触发异步任务的执行
    func();
  } catch (err) {
    // 什么时候引发重新执行 func
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        // 第二次执行 func 是从已经回来的异步任务缓存中获取返回值
        func();
      };
      err.then(reRun).catch(reRun);
    }
  }
}

run(main);
// run(main);
// run(main);
