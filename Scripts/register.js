document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.container');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const cpf = document.querySelector('input[name="cpf"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();
        const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim();

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        // Montar objeto com os dados do usuário
        const userData = {
            nome: name,
            email: email,
            cpf: cpf,
            senha: password
        };

        // Enviar requisição POST para a API de login para cadastrar o usuário
        fetch('https://back-login.vercel.app/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Usuário cadastrado com sucesso!');
                // Redirecionar para a página de login ou outra página desejada
                window.location.href = 'index.html';
            } else {
                alert('Falha ao cadastrar usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário: ' + error.message);
        });
    });
});