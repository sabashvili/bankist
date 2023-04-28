"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const date = new Date();
const day = date.getDate();
const mounth = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();
const getDate = (unit) => `${unit < 10 ? `0${unit}` : `${unit}`}`;
const fullDate = `${getDate(day)}/${getDate(mounth)}/${year}, ${getDate(hour)}:${getDate(minute)}`;
labelDate.textContent = fullDate;

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ""

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${Math.abs(mov)}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);

  });
};



const updateUI = function (acc) {
  calcDisplaySummary(acc);
  calcPrintBalance(acc);
  displayMovements(acc.movements);
}



const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const out = Math.abs(acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0));
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${out}€`;
  labelSumInterest.textContent = `${interest}€`;
};

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username == inputLoginUsername.value);
  if (currentAccount?.pin == Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = "1";

    updateUI(currentAccount)
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});


btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ""
})


btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find((acc) => acc.username == inputTransferTo.value)
  if (receiverAcc && receiverAcc?.username !== currentAccount.username && currentAccount.balance >= amount && amount > 0) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    updateUI(currentAccount)
  }
  inputTransferTo.value = inputTransferAmount.value = ""
  inputTransferAmount.blur()
})


btnClose.addEventListener("click", function (e) {
  e.preventDefault()
  const inputCloseAcc = inputCloseUsername.value;
  const inputClosePincode = Number(inputClosePin.value);

  if (inputCloseAcc == currentAccount.username && inputClosePincode == currentAccount.pin) {
    const CloseAccIndex = accounts.findIndex((acc) => inputCloseAcc == acc.username)
    accounts.splice(CloseAccIndex, 1)
    containerApp.style.opacity = "0";
  }
  inputCloseUsername.value = ""
  inputClosePin.value = ""
})

let sorted = false;

btnSort.addEventListener("click", function () {
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})


/////////////////////////////////////////////////

// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const titleArr = title.split(" ")
  const finalTitle = titleArr.reduce((acc, text) => {
    text.length >= 2 ? acc += text[0].toUpperCase() + text.slice(1) + " " : acc += text[0].toLowerCase() + " "
    return acc
  }, "")

  console.log(finalTitle);
  return titleArr
}

console.log(convertTitleCase("this is a nice title"));