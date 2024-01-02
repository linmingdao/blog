function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 支持的最大并发任务数
    this.tasks = []; // 记录所有的并发任务
    this.runningCount = 0; // 正在执行的任务数量
  }

  // 添加任务到任务队列
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this._run();
    });
  }

  // 执行任务
  _run() {
    while (this.tasks.length > 0 && this.runningCount < this.parallelCount) {
      const { task, resolve, reject } = this.tasks.shift();
      // 执行
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });

      this.runningCount++;
    }
  }
}

const superTask = new SuperTask();

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1); // 10000ms后输出：任务1完成
addTask(5000, 2); // 5000ms后输出：任务2完成
addTask(3000, 3); // 8000ms后输出：任务3完成
addTask(4000, 4); // 12000ms后输出：任务4完成
addTask(5000, 5); // 15000ms后输出：任务5完成
