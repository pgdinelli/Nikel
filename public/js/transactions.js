const myModal = new bootstrap.Modal("#transactionModal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

let data = {
    transactions: []
};

checkLogged();

document.getElementById("btnLogout").addEventListener("click", logout);

// Add Transactions
document.getElementById("transactionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const valueInput = parseFloat(document.getElementById("valueInput").value);
    const descriptionInput = document.getElementById("descriptionInput").value;
    const dateInput = document.getElementById("dateInput").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    data.transactions.unshift({
        value: valueInput,
        type: type,
        description: descriptionInput,
        date: dateInput
    });

    saveData(data);
    e.target.reset();

    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();

}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
            </tr>
            `;
        });
    }

    document.getElementById('transactionsList').innerHTML = transactionsHtml;
}