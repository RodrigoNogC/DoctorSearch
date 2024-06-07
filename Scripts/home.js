$(document).ready(function() {
  // Função para buscar médicos da API e criar carrosséis e cards dinamicamente
  function fetchDoctors() {
    fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos')
    .then(response => response.json())
    .then(data => {
      // Limpar dados anteriores
      $('.carousel-inner').empty();
      $('#doctors-cards').empty();

      // Criar carrosséis e cards para cada médico
      data.forEach((doctor, index) => {
        // Carrossel
        const carouselItem = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${doctor.imagem}" alt="Doctor Image">
                                <div class="carousel-caption d-none d-md-block">
                                  <h5>${doctor.nome}</h5>
                                  <p>${doctor.especialidade}</p>
                                </div>
                              </div>`;
        $('.carousel-inner').append(carouselItem);

        // Card
        const card = `<div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${doctor.nome}</h5>
                          <p class="card-text">${doctor.especialidade}</p>
                          <button type="button" class="btn btn-primary edit-btn" data-id="${doctor.id}">Editar</button>
                          <button type="button" class="btn btn-danger delete-btn" data-id="${doctor.id}">Excluir</button>
                        </div>
                      </div>`;
        $('#doctors-cards').append(card);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar médicos:", error);
    });
  }

  // Chamar a função inicialmente
  fetchDoctors();

  // Event listener para botões de edição
  $(document).on('click', '.edit-btn', function() {
    const doctorId = $(this).data('id');
    // Implementar lógica para editar médico
  });

  // Event listener para botões de exclusão
  $(document).on('click', '.delete-btn', function() {
    const doctorId = $(this).data('id');
    // Implementar lógica para excluir médico
  });

  // Event listener para botão de adicionar médico
  $('#btnadd').on('click', function() {
    // Implementar lógica para adicionar médico
  });
});
