const cardsContainer = document.querySelector('.cards');
const addButton = document.querySelector('.add-button');

// Função para buscar e renderizar os médicos
async function getMedicos() {
  try {
    const response = await fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos');
    const medicos = await response.json();

    cardsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    medicos.forEach(medico => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${medico.imagem}" alt="${medico.nome}">
        <h2>${medico.nome}</h2>
        <p>${medico.especialidade}</p>
        <button class="edit-button">Editar</button>
        <button class="delete-button">Excluir</button>
      `;
      cardsContainer.appendChild(card);

      // Adicionar evento de clique para editar o médico
      card.querySelector('.edit-button').addEventListener('click', () => {
        // Implemente a funcionalidade de edição aqui
        console.log('Editar médico', medico.id);
      });

      // Adicionar evento de clique para excluir o médico
      card.querySelector('.delete-button').addEventListener('click', () => {
        // Implemente a funcionalidade de exclusão aqui
        console.log('Excluir médico', medico.id);
      });
    });
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
  }
}

// Função para criar um novo médico (chamada ao clicar no botão +)
async function criarMedico() {
  // Implemente a funcionalidade de criação de novo médico aqui
  // 1. Abrir um formulário para o usuário inserir as informações do médico
  // 2. Obter as informações do formulário
  // 3. Fazer uma requisição POST para a API com as informações do novo médico
  // 4. Atualizar a lista de médicos após a criação
  console.log('Criar novo médico');
}

// Chamada inicial para obter e renderizar os médicos
getMedicos();

// Adicionar evento de clique para criar um novo médico
addButton.addEventListener('click', criarMedico);