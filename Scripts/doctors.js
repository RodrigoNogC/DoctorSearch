document.addEventListener('DOMContentLoaded', async function() {
    await createCard();

    document.getElementById('search-input').addEventListener('input', function() {
        filterCards(this.value);
    });

    document.getElementById('addCardButton').addEventListener('click', function() {
        showAddForm();
    });
});

const filterCards = function(filterText) {
    let cards = document.querySelectorAll('.modal-doctor');

    cards.forEach(card => {
        let doctorName = card.querySelector('h2').textContent.toLowerCase();

        if (doctorName.includes(filterText.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const createCard = async function() {
    let modalFeed = document.getElementById('modal-feed');

    if (!modalFeed) {
        console.error('Elemento modal-feed não encontrado no DOM.');
        return;
    }

    try {
        const response = await fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos');
        const data = await response.json();

        console.log(data);

        if (data && data.medicos && data.medicos.length > 0) {
            modalFeed.innerHTML = '';

            data.medicos.forEach(doctor => {
                let doctorCard = document.createElement('div');

                let doctorImageBox = document.createElement('div');
                let doctorImage = document.createElement('img');
                let doctorInformation = document.createElement('div');
                let doctors = document.createElement('div');
                let doctorNameBox = document.createElement('h2');
                let doctorCRMBox = document.createElement('h3');
                let doctorSpecialtyBox = document.createElement('p');
                let buttonBox = document.createElement('div');
                let editButton = document.createElement('button');
                let deleteButton = document.createElement('button');

                let doctorName = document.createTextNode(`Nome: ${doctor.nome}`);
                let doctorCrm = document.createTextNode(`CRM: ${doctor.crm}`);
                let doctorSpecialty = document.createTextNode(`Especialidade: ${doctor.especialidade}`);
                let buttonEditText = document.createTextNode('Editar');
                let buttonDeleteText = document.createTextNode('Deletar');

                doctorCard.setAttribute('class', 'modal-doctor');
                doctors.setAttribute('class', 'doctors');
                doctorImageBox.setAttribute('class', 'doctorImg');
                doctorImage.setAttribute('src', `${doctor.image}`);
                doctorImage.setAttribute('alt', 'Imagem do Doutor');
                doctorInformation.setAttribute('class', 'doctorInformation');
                buttonBox.setAttribute('class', 'button-box');
                editButton.setAttribute('class', 'edit');
                deleteButton.setAttribute('class', 'delete');
                editButton.setAttribute('type', 'button');
                deleteButton.setAttribute('type', 'button');

                modalFeed.appendChild(doctorCard);

                doctors.appendChild(doctorImageBox);
                doctors.appendChild(doctorInformation);
                doctorCard.appendChild(doctors);
                doctorInformation.appendChild(doctorNameBox);
                doctorInformation.appendChild(doctorCRMBox);
                doctorInformation.appendChild(doctorSpecialtyBox);
                doctorCard.appendChild(buttonBox);
                buttonBox.appendChild(editButton);
                buttonBox.appendChild(deleteButton);
                doctorImageBox.appendChild(doctorImage);
                doctorNameBox.appendChild(doctorName);
                doctorCRMBox.appendChild(doctorCrm);
                doctorSpecialtyBox.appendChild(doctorSpecialty);
                editButton.appendChild(buttonEditText);
                deleteButton.appendChild(buttonDeleteText);

                editButton.addEventListener('click', function(){
                    showEditForm(doctor);
                });

                deleteButton.addEventListener('click', function(){
                    const id = doctor.id;
                    deleteDoctor(id);
                });
            });

        } else {
            alert('Nenhum Médico encontrado');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteDoctor = async function(id) {
    try {
        const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao fazer DELETE request');
        }
        console.log('Médico excluído com sucesso');
        await createCard();
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

const createNewDoctor = async function(formData) {
    try {
        const response = await fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao criar novo médico: ${errorData.message}`);
        }

        console.log('Novo médico criado com sucesso');
        await createCard();
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        // Exibir mensagem de erro ao usuário
        alert('Erro ao criar novo médico. Verifique se todos os campos estão preenchidos corretamente.');
    }
};


const showEditForm = function(doctor) {
    showModal('Editar Médico', doctor);
};

const showAddForm = function() {
    showModal('Adicionar Novo Médico');
};

const showModal = function(title, doctor = {}) {
    const modalBackground = document.createElement('div');
    modalBackground.style.position = 'fixed';
    modalBackground.style.top = '0';
    modalBackground.style.left = '0';
    modalBackground.style.width = '100%';
    modalBackground.style.height = '100%';
    modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalBackground.style.display = 'flex';
    modalBackground.style.justifyContent = 'center';
    modalBackground.style.alignItems = 'center';
    modalBackground.style.zIndex = '1000';

    const modalBox = document.createElement('div');
    modalBox.style.backgroundColor = 'white';
    modalBox.style.padding = '20px';
    modalBox.style.borderRadius = '10px';
    modalBox.style.width = '400px';
    modalBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;
    modalBox.appendChild(modalTitle);

    const form = document.createElement('form');
    form.innerHTML = `
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" value="${doctor.nome || ''}"><br>
        <label for="crm">CRM:</label>
        <input type="text" id="crm" name="crm" value="${doctor.crm || ''}"><br>
        <label for="specialty">Especialidade:</label>
        <input type="text" id="specialty" name="specialty" value="${doctor.especialidade || ''}"><br>
        <label for="image">URL da Imagem:</label>
        <input type="text" id="image" name="image" value="${doctor.image || ''}"><br>
        <button type="submit">Salvar</button>
    `;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const formData = {
            nome: document.getElementById('name').value,
            crm: document.getElementById('crm').value,
            especialidade: document.getElementById('specialty').value,
            image: document.getElementById('image').value
        };
    
        if (doctor.id) {
            await updateDoctor(doctor.id, formData);
        } else {
            await createNewDoctor(formData);
        }
    
        // Aqui está o problema, vamos verificar
        document.body.removeChild(modalBackground);
    });

    modalBox.appendChild(form);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modalBackground);
    });
    modalBox.appendChild(closeButton);

    modalBackground.appendChild(modalBox);
    document.body.appendChild(modalBackground);
};

const updateDoctor = async function(id, newData) {
    try {
        const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao atualizar médico: ${errorData.message}`);
        }

        console.log('Médico atualizado com sucesso');
        await createCard();
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
};
