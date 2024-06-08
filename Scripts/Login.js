const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  fetch('https://back-login.vercel.app/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      senha: senha
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Falha na autenticação.');
    }
  })
  .then(data => {
    // Redirecionar para a página de médicos
    window.location.href = 'Main.HTML'; 
  })
  .catch(error => {
    console.error('Erro:', error);
    // Mostrar mensagem de erro ao usuário
    alert('Falha na autenticação. Por favor, verifique seus dados.');
  });
});