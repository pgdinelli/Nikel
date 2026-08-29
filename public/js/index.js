const myModal = new bootstrap.Modal("#registerModal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

checkLogged();

// Login User
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmailInput").value;
    const password = document.getElementById("loginPasswordInput").value;
    const checkSession = document.getElementById("sessionCheck").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Dados inválidos! Verifique o usuário ou a senha.");
        return;
    }

    if (account) {
        if (account.password !== password) {
            alert("Dados inválidos! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }

});

// Create Account
document.getElementById("modalRegisterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailCreateInput").value;
    const password = document.getElementById("passwordCreateInput").value;

    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    registerAccount({
        login: email,
        password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso.");
});

function registerAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}