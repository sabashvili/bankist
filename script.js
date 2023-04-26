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


const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);


  });
};
displayMovements(account1.movements);


const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner.toLocaleLowerCase().split(" ").map(name => name[0]).join("")
  });
}

createUsernames(accounts)

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance}€`;
}
calcPrintBalance(account1.movements)


const calcDisplaySummary = function (movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  const out = Math.abs(movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0))
  const interest = movements.filter(mov => mov > 0).map(mov => mov * 1.2 / 100).reduce((acc, mov) => acc + mov, 0)

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${out}€`;
  labelSumInterest.textContent = `${interest}€`
}

calcDisplaySummary(account1.movements)



btnLogin.addEventListener("click", function (e) {
  e.preventDefault()
  console.log(inputLoginUsername.value, inputLoginPin.value);
})

/////////////////////////////////////////////////



// const deposits = movements.filter(mov => mov > 0)
// const withdrawal = movements.filter(mov => mov < 0)

// const balance = movements.re duce(function (acc, cur, i) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur
// })


// const MaxValue = movements.reduce((acc, mov) => {
//   if (acc < mov) {
//     acc = mov
//   }
//   return acc
// }, 0)
// console.log(MaxValue);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
// const MaxValue = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc
//   } else {
//     return mov
//   }
// }, movements[0])

// console.log(MaxValue);



// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
  const abult = humanAges.filter(humanAge => humanAge >= 18)
  const average = abult.reduce((acc, age) => acc + age, 0) / abult.length
  return average
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
