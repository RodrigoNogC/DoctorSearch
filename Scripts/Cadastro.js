const cadastroForm = document.getElementById('cadastroForm');

cadastroForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const crm = document.getElementById('crm').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    // Validação básica (você pode adicionar mais validações)
    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Envia os dados para a API
    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            crm: crm,
            senha: senha // Certifique-se de criptografar a senha antes de enviar para a API
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            cadastroForm.reset(); // Limpa o formulário
        } else {
            alert('Erro ao cadastrar. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar. Verifique sua conexão com a internet.');
    });
});