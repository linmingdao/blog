function myfetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['小红', '小明', '小李']);
    }, 3000);
  });
}

async function getUser() {
  return await myfetch();
}

async function m1() {
  return await getUser();
}

async function m2() {
  return await getUser();
}

async function m3() {
  return await getUser();
}

async function main() {
  const user = await m3();
  console.log(user);
}

main();
