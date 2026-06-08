document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });

        if (response.ok) {
            // Sucesso! Agora sim, o redirecionamento acontece.
            window.location.href = '/html/dashboard.html'; 
        } else {
            alert("Usuário ou senha incorretos.");
        }
    } catch (err) {
        console.error("Erro na conexão:", err);
        alert("Erro ao conectar com o servidor.");
    }
});

// No seu fetch dentro do login.js:
const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
    credentials: 'include' // <--- ADICIONE ISSO
});


window.onload = async () => {
    const response = await fetch('/verificar-sessao');
    if (!response.ok) {
        // Se não estiver logado, manda de volta pro login
        window.location.href = '/html/login.html';
    }
};



