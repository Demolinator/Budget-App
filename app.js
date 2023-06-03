let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let editingListItem = null;

const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const category = document.getElementById("category"); 
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const dateInput = document.getElementById("dateInput");
let tempAmount = 0;
let editingExpense = 0;

// Set Budget Part
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseFloat(totalAmount.value);
    if (isNaN(tempAmount) || tempAmount < 0) {
    errorMessage.classList.remove("hide");
    } else {
    errorMessage.classList.add("hide");
    amount.innerHTML = tempAmount.toFixed(2);
    balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
    expenditureValue.innerText = "0.00"; 
    totalAmount.value = "";
    list.innerHTML = ""; 
    }
});

// Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
    });
};

// Function To Update List Values
const updateListValues = (listItem, newAmount) => {
    listItem.querySelector(".product").innerText = productTitle.value;
    listItem.querySelector(".amount").innerText = `- $ ${newAmount}`;
    listItem.querySelector(".category").innerText = category.value; 
    listItem.querySelector(".date").innerText = dateInput.value;
};

// function to modifiy elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentExpense = parseFloat(expenditureValue.innerText);
    let parentAmount = parseFloat(parentDiv.querySelector(".amount").innerText.substring(3));
    let parentCategory = parentDiv.querySelector(".category").innerText; 
    let parentDate = parentDiv.querySelector(".date").innerText;

    if (isNaN(parentAmount)) {
    parentAmount = 0;
    }

    if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    let parentCategory = parentDiv.querySelector(".category").innerText; 
    productTitle.value = parentText;
    category.value = parentCategory; 
    userAmount.value = parentAmount;
    dateInput.value = parentDate;
    editingExpense = parentAmount; 
    disableButtons(true);
    editingListItem = parentDiv;
    } else {
    parentDiv.remove();
    balanceValue.innerText = (parseFloat(balanceValue.innerText) + editingExpense).toFixed(2);
    expenditureValue.innerText = (currentExpense - parentAmount).toFixed(2); 
    editingListItem = null;

    if (list.childElementCount === 0) {
        expenditureValue.innerText = "0.00";
        balanceValue.innerText = amount.innerText; 
    }
    }
};

// Function To Create List
const listCreator = (expenseName, expenseValue, expenseCategory, expenseDate) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount"> -$ ${expenseValue}</p>&nbsp;&nbsp;&nbsp;<p class="category"> ${expenseCategory}</p>&nbsp;&nbsp;&nbsp;&nbsp;<p class="date"> ${expenseDate}</p>`; 
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);

    if (!editingListItem) {
    const expense = parseFloat(expenseValue);
    let currentExpense = parseFloat(expenditureValue.innerText);
    expenditureValue.innerText = (currentExpense).toFixed(2); 
    balanceValue.innerText = (parseFloat(balanceValue.innerText)).toFixed(2); 
    }

    return sublistContent;
};

// Function To Add Expenses 
checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value || !dateInput.value || !category.value) {
    productTitleError.classList.remove("hide");
    return false;
    }
    disableButtons(false);
    let expenditure = parseFloat(userAmount.value);
    if (isNaN(expenditure)) {
    expenditure = 0;
    }
    const currentExpense = parseFloat(expenditureValue.innerText);
    const newExpense = editingListItem ? (currentExpense - editingExpense + expenditure) : (currentExpense + expenditure);
    expenditureValue.innerText = newExpense.toFixed(2);
    const totalBalance = (tempAmount - newExpense).toFixed(2);
    balanceValue.innerText = totalBalance;
    if (editingListItem) {
    updateListValues(editingListItem, userAmount.value);
    editingListItem = null;
    } else {
    listCreator(productTitle.value, userAmount.value, category.value, dateInput.value); 
    }
    productTitle.value = "";
    category.value = ""; 
    userAmount.value = "";
    dateInput.value = "";
});





