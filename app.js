let amountEl = document.getElementById("amount");
let descEl = document.getElementById("desc");
let categoryEl = document.getElementById("category");
var form = document.getElementById("my-form");
var expensesList = document.getElementById("expensesList");
// Delete event
expensesList.addEventListener("click", removeExpense);

// random Id genrator
const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

let id = randomId();

// Add expenses
function addExpenses(e) {
  e.preventDefault();
  let amount = amountEl.value;
  let desc = descEl.value;
  let category = categoryEl.value;
  let expense = {
    id,
    amount,
    desc,
    category,
  };
  localStorage.setItem(expense.id, JSON.stringify(expense));
  displayOnScreen(expense);
}

// Remove item
function removeExpense(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      let li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function displayOnScreen(expense) {
  const expensesList = document.getElementById("expensesList");
  const list = document.createElement("li");
  list.classList = "list-group-item";
  list.textContent = `${expense.amount} - ${expense.desc} - ${expense.category}`;

  // Add delete button
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";
  deleteBtn.classList = "btn btn-danger ml-5 deleteBtn";

  deleteBtn.onclick = () => {
    localStorage.removeItem(expense.id);
    expensesList.removeChild(list);
  };

  //   Add Edit button
  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit";
  editBtn.classList = "btn btn-dark ml-5 editBtn";
  editBtn.onclick = () => {
    localStorage.removeItem(expense.id);
    amountEl.value = expense.amount;
    descEl.value = expense.desc;
    categoryEl.value = expense.category;
    expensesList.removeChild(list);
  };
  list.appendChild(editBtn);
  list.appendChild(deleteBtn);

  expensesList.appendChild(list);
}
