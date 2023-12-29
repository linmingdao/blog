function _runTask(task) {
  // requestIdleCallback 用于获取当前帧是否有空闲时间
  requestIdleCallback((idle) => {
    // 判断当前帧是否还有空闲时间，有则执行任务
    if (idle.timeRemaining() > 0) {
      task();
    } else {
      // 没有，则推迟执行任务
      _runTask(task);
    }
  });
}

function _runTaskPollyfill(task) {
  const start = performance.now();
  requestAnimationFrame(() => {
    if (performance.now() - start < 16.6) {
      task();
    } else {
      _runTaskPollyfill(task);
    }
  });
}

function runTask(task) {
  // 方案1：同步的方式直接执行 task --> 阻塞
  // task();
  // 方案2：把任务放到微队列里去执行 --> 阻塞
  // Promise.resolve().then(task);
  // 方案3：把任务放到宏任务去执行 --> 卡顿
  // setTimeout(task);
  // 方案4：直接使用raf --> 阻塞
  // requestAnimationFrame(task);
  // 方案5：idle --> 流畅，有兼容性问题（safari浏览器不支持）
  // _runTask(task);
  // 方案6：raf+控制 --> 流畅，解决兼容性问题
  _runTaskPollyfill(task);
  // 方案7：web worker
}
