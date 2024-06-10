document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        console.log('Dados do login:', { email, password });

        fetch('https://back-login.vercel.app/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha: password })
        })
        .then(response => {
            console.log('Resposta da API:', response); // Log da resposta da API
            if (!response.ok) {
                throw new Error('Falha ao fazer login');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados da API:', data); 
             (data.success)
                alert('Login bem-sucedido!');
                window.location.href = './home.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer login: ' + error.message);
        });
    });
});
