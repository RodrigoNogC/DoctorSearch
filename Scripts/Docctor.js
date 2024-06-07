document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('search-input');
    const addCardButton = document.getElementById('addCardButton');
    const medicoModal = $('#medicoModal');
    const medicoForm = document.getElementById('medicoForm');
    const apiBase = '/api/projeto4/fecaf';

    async function fetchMedicos() {
        try {
            const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos`);
            const medicos = await response.json();
            displayMedicos(medicos);
        } catch (error) {
            console.error('Erro ao buscar médicos:', error);
        }
    }

    function displayMedicos(medicos) {
        cardsContainer.innerHTML = '';
        medicos.forEach(medico => {
            const card = createCard(medico);
            cardsContainer.appendChild(card);
        });
    }

    function createCard(medico) {
        const card = document.createElement('div');
        card.className = 'card col-md-4';
        card.innerHTML = `
            <img src="${medico.image}" class="card-img-top" alt="${medico.nome}">
            <div class="card-body">
                <h5 class="card-title">${medico.nome}</h5>
                <p class="card-text">CRM: ${medico.crm}</p>
                <button class="btn btn-warning btn-edit" data-id="${medico.id}">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${medico.id}">Excluir</button>
            </div>
        `;
        card.querySelector('.btn-edit').addEventListener('click', () => editMedico(medico));
        card.querySelector('.btn-delete').addEventListener('click', () => deleteMedico(medico.id));
        return card;
    }

    async function addMedico(medico) {
        try {
            await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medico)
            });
            fetchMedicos();
        } catch (error) {
            console.error('Erro ao adicionar médico:', error);
        }
    }

    async function editMedico(medico) {
        const nome = prompt("Editar nome do médico:", medico.nome);
        const crm = prompt("Editar CRM do médico:", medico.crm);
        const image = prompt("Editar URL da imagem do médico:", medico.image);
        if (nome && crm && image) {
            try {
                await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/:${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...medico, nome, crm, image })
                });
                fetchMedicos();
            } catch (error) {
                console.error('Erro ao editar médico:', error);
            }
        }
    }

    async function deleteMedico(id) {
        try {
            await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/:${id}`, {
                method: 'DELETE'
            });
            fetchMedicos();
        } catch (error) {
            console.error('Erro ao excluir médico:', error);
        }
    }

    medicoForm.addEventListener('submit', event => {
        event.preventDefault();
        const nome = document.getElementById('medicoNome').value;
        const crm = document.getElementById('medicoCrm').value;
        const image = document.getElementById('medicoImage').value;
        if (nome && crm && image) {
            addMedico({ nome, crm, image });
            medicoModal.modal('hide');
            medicoForm.reset();
        }
    });

    addCardButton.addEventListener('click', () => {
        medicoModal.modal('show');
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = cardsContainer.querySelectorAll('.card');
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const crmText = card.querySelector('.card-text').textContent.toLowerCase();
            card.style.display = title.includes(searchTerm) || crmText.includes(searchTerm) ? '' : 'none';
        });
    });

    fetchMedicos();
});
