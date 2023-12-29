// DOM加载完毕后执行的代码
document.addEventListener('DOMContentLoaded', function () {
  const bodyElm = document.body;
  const ballElm = document.getElementById('ball');
  const clientWidth = bodyElm.clientWidth - ballElm.clientWidth - 10;

  let direction = 'l';
  let currentOffset = 0;

  function animate() {
    if (currentOffset >= clientWidth) {
      direction = 'r';
    }
    if (currentOffset <= 0) {
      direction = 'l';
    }
    if (direction === 'l') {
      currentOffset += 10;
      ballElm.style.left = currentOffset + 'px';
    }
    if (direction === 'r') {
      currentOffset -= 10;
      ballElm.style.left = currentOffset + 'px';
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
