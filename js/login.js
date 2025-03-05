document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            errorMessage.textContent = "Username dan Password harus diisi!";
            return;
        }

        loginUser(username, password);
    });
});

async function loginUser(username, password) {
    const errorMessage = document.getElementById("errorMessage");

    try {
        
        const response = await fetch(`http://localhost:3000/users?username=${username}`);
        const users = await response.json(); 

        if (users.length === 0) {
            errorMessage.textContent = "Username tidak ditemukan!";
            return;
        }

        const user = users[0];

        if (user.password !== password) {
            errorMessage.textContent = "Password salah!";
            return;
        }
        alert("Login berhasil!");
        window.location.href = "dashboard.html";

    } catch (error) {
        errorMessage.textContent = "Terjadi kesalahan. Coba lagi nanti!";
    }
}
