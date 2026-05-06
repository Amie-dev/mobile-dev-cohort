const counterValue = document.querySelector(".value");
const incBtn = document.querySelector(".incr");
const decBtn = document.querySelector(".decr");

let value = 0;
counterValue.innerText = `Count: ${value}`;

incBtn.addEventListener("click", () => {
  value++;
  counterValue.innerText = `Count: ${value}`;
});

decBtn.addEventListener("click", () => {
  value--;
  counterValue.innerText = `Count: ${value}`;
});
