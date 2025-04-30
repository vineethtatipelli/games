"use strict";

const account1 = {
  owner: "Vineeth Tatipelli",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Krishna Murthy Tatipelli",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Nagamani Tatipelli",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Shailaja Tatipelli",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

const containerMovements = document.querySelector(".movements");
const textBalanceValue = document.querySelector(".balance_value");
const summaryInValue = document.querySelector(".in_value");
const summaryOutValue = document.querySelector(".out_value");
const summaryInterestValue = document.querySelector(".interest_value");
const loginButton = document.querySelector(".login_button");
const loginUser = document.querySelector(".login_input_user");
const loginPassword = document.querySelector(".login_input_password");
const containerWelcome = document.querySelector(".welcome");
const application = document.querySelector(".app");
const transferTo = document.querySelector(".to");
const transferAmount = document.querySelector(".transfer_amount");
const transferButton = document.querySelector(".transfer_button");
const loan_amount = document.querySelector(".loan_amount");
const loan_button = document.querySelector(".loan_button");
const closeUser = document.querySelector(".confirm_user");
const closePassword = document.querySelector(".confirm_pin");
const closeButton = document.querySelector(".close_account_button");
const sortButton = document.querySelector(".sort_button");
const dateLabel = document.querySelector(".date1");
const timerLabel = document.querySelector(".timer");

const displayMovements = function (movements, sorting = false) {
  containerMovements.innerHTML = "";
  const movs = movements;
  if (sorting) {
    movs.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
    });
  }
  movs.forEach(function (element, index) {
    let type = "";
    if (element > 0) {
      type = "deposit";
    } else {
      type = "withdraw";
    }
    const html = `
    <div class="movements_row">
    <div class="movements_type movements_type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements_date">3 days ago</div>
    <div class="movements_value">$ ${element}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const generateUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (elem) {
        return elem[0];
      })
      .join("");
  });
};

// const user = "Vineeth Tatipelli"; // vt

// const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(function (elem) {
//     return elem[0];
//   })
//   .join("");

// console.log(username);

generateUsernames(accounts);
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

// console.log(deposits);

const withdrawls = movements.filter(function (mov) {
  return mov < 0;
});

// console.log(withdrawls);

//  this will add balance to the account set
const calculateBalance = function (accs) {
  accs.forEach(function (acc) {
    let movement = acc.movements;
    let balance1 = movement.reduce(function (acc, curr, index, arr) {
      return acc + curr;
    });
    acc.balance = balance1;
  });
};

calculateBalance(accounts);

const displayBalance = function (movement) {
  const balance = movement.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  textBalanceValue.textContent = `$${balance}`;
};

// displayBalance(account4.movements);

const maximum = movements.reduce(function (acc, curr) {
  if (curr > acc) {
    return curr;
  } else {
    return acc;
  }
}, movements[0]);

const displaySummary = function (acc) {
  const incomes = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  const outgoes = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  const interest = acc.interestRate * incomes * 0.01;
  summaryInValue.textContent = `$${incomes}`;
  summaryOutValue.textContent = `$${outgoes}`;
  summaryInterestValue.textContent = `$${interest}`;
};

const startLogoutTimer = function () {
  let time = 300;
  const timerApp = setInterval(function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    timerLabel.textContent = `${min}:${sec}`;
    time--;
    if (time === -1) {
      clearInterval(timerApp);
      application.classList.add("hidden");
      containerWelcome.textContent = "Login to get started";
    }
  }, 1000);
};

let currentUser;
//   console.log(currentUser);

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find(function (acc) {
    return acc.username === loginUser.value;
  });
  if (currentUser && currentUser.pin !== Number(loginPassword.value)) {
    alert("incorrect password");
    application.classList.add("hidden");
  }
  if (currentUser && currentUser.pin === Number(loginPassword.value)) {
    application.classList.remove("hidden");
    loginUser.value = "";
    loginPassword.value = "";

    console.log("logged in");
    console.log(currentUser);
    startLogoutTimer();
    //display welcome message
    containerWelcome.textContent = `Welcome , ${currentUser.owner}`;
    //display movements
    displayMovements(currentUser.movements);
    //display balance
    displayBalance(currentUser.movements);
    //display summary
    displaySummary(currentUser);
    //implementing transfer
    transferButton.addEventListener("click", function (e1) {
      e1.preventDefault();
      let reciver = accounts.find(function (acc) {
        return acc.username === transferTo.value;
      });
      let transferredAmount = Number(transferAmount.value);
      if (
        reciver &&
        reciver != currentUser &&
        currentUser.balance >= transferredAmount &&
        transferredAmount > 0
      ) {
        currentUser.movements.push(-transferredAmount);
        reciver.movements.push(transferredAmount);
        console.log("transfer done");
        transferAmount.value = "";
        transferTo.value = "";
        displayMovements(currentUser.movements);
        displayBalance(currentUser.movements);
        displaySummary(currentUser);
      }
    });
    loan_button.addEventListener("click", function (e2) {
      e2.preventDefault();
      const requestedAmount = Number(loan_amount.value);
      currentUser.movements.push(requestedAmount);
      console.log("loan request done");
      loan_amount.value = "";
      displayMovements(currentUser.movements);
      displayBalance(currentUser.movements);
      displaySummary(currentUser);
    });
    closeButton.addEventListener("click", function (e3) {
      e3.preventDefault();
      if (
        currentUser.username === closeUser.value &&
        currentUser.pin === Number(closePassword.value)
      ) {
        const index = accounts.findIndex(function (acc) {
          return acc.username === currentUser.username;
        });
        accounts.splice(index, 1);
        console.log(accounts);
        application.classList.add("hidden");
        console.log("closed");
      } else {
        console.log("not closed");
      }
    });
    let sorted = false;
    sortButton.addEventListener("click", function (e4) {
      e4.preventDefault();
      displayMovements(currentUser.movements, !sorted);
      sorted = !sorted;
    });
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const day = `${now.getDate()}`.padStart(2, 0);
    const hours = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    const displayTime = `${day}/${month}/${year},${hours}:${min}`;
    dateLabel.textContent = displayTime;
  }
});
// console.log(accounts);

// console.log(movements, "before sorted");

// movements.sort(function (a, b) {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// console.log(movements, "after sorted");
