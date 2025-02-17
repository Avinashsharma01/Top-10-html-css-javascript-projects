let totalExpense = 0;
const expenseList = [];

function addExpense() {
    const name = document
        .getElementById("expense-name")
        .value.trim();
    const amount = parseFloat(
        document.getElementById("expense-amount").value
    );
    const category =
        document.getElementById("expense-category").value;

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
    };

    expenseList.push(expense);
    totalExpense += amount;

    updateExpenseList();
    updateTotal();

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
}

function updateExpenseList() {
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenseList.forEach((expense) => {
        const item = document.createElement("div");
        item.className = "expense-item";

        const details = document.createElement("p");
        details.textContent = `${expense.name} - ₹${expense.amount} (${expense.category})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteExpense(expense.id);

        item.appendChild(details);
        item.appendChild(deleteBtn);

        list.appendChild(item);
    });
}

function deleteExpense(id) {
    const index = expenseList.findIndex(
        (expense) => expense.id === id
    );
    if (index !== -1) {
        totalExpense -= expenseList[index].amount;
        expenseList.splice(index, 1);

        updateExpenseList();
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById(
        "total-expense"
    ).textContent = `Total: ₹${totalExpense}`;
}