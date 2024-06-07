let addCardButton = document.getElementById('addCardButton');
let back = document.getElementById('back');
let backEdit = document.getElementById('back-edit');
let adc = document.getElementById('adc');
let adcEdit = document.getElementById('btn-edit');
const blackout = document.getElementById('blackout');
const blackoutEdit = document.getElementById('blackout-edit');

let editingDoctorId = null;

addCardButton.addEventListener('click', function(){
    blackout.style.display = 'flex';
});

back.addEventListener('click', function(){
    blackout.style.display = 'none';
});

backEdit.addEventListener('click', function(){
    blackoutEdit.style.display = 'none';
});

adc.addEventListener('click', function(event){
    event.preventDefault();

    const requestBody = {
        nome: document.getElementById('name-input').value,
        crm: document.getElementById('crm-input').value,
        image: document.getElementById('img-input').value,
        especialidade: document.getElementById('specialty-input').value
    }
    addDoctor(requestBody);
});

function addDoctor(doctor){
    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        createCard();
        blackout.style.display = 'none';
    })
}

function editDoctor(doctor, id){
    fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctor)
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        createCard();
        blackoutEdit.style.display = 'none';
    })
}

document.addEventListener('DOMContentLoaded', async function() {
    await createCard();

    document.getElementById('search-input').addEventListener('input', function() {
        filterCards(this.value);
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
                doctorCard.setAttribute('id', `doctor-card-${doctor.id}`);

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
                editButton.setAttribute('type', 'submit');
                deleteButton.setAttribute('type', 'submit');

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

                editButton.addEventListener('click', function(event){
                    blackoutEdit.style.display = 'flex';
                    document.getElementById('name-input-edit').value = doctor.nome;
                    document.getElementById('crm-input-edit').value = doctor.crm;
                    document.getElementById('img-input-edit').value = doctor.image;
                    document.getElementById('specialty-input-edit').value = doctor.especialidade;
                    editingDoctorId = doctor.id;  // Store the doctor ID to be edited
                });

                deleteButton.addEventListener('click', async function(){
                    alert(`Doutor(a) Deletado!`)

                    try {
                        const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/${doctor.id}`, {
                            method: 'DELETE'
                        });
                
                        if (!response.ok) {
                            const errorText = await response.text();
                            throw new Error(errorText);
                        }

                        window.location.reload();
                        
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Erro ao excluir médico.');
                    }
                });
            });

        } else {
            alert(data.medicos);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

adcEdit.addEventListener('click', function(event){
    event.preventDefault();
    const requestEditBody = {
        nome: document.getElementById('name-input-edit').value,
        crm: document.getElementById('crm-input-edit').value,
        image: document.getElementById('img-input-edit').value,
        especialidade: document.getElementById('specialty-input-edit').value
    }
    if (editingDoctorId !== null) {
        editDoctor(requestEditBody, editingDoctorId);
        editingDoctorId = null;
    }
});

window.addEventListener('load', async function(){
    await createCard();
});
