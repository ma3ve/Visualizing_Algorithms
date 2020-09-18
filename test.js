function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

(async function Main() {
  for (let i = 0; i < 10; i++) {
    await delay(1000);
    console.log(i);
  }
})();
