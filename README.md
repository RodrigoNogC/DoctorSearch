
# Project Title

A brief description of what this project does and who it's for
1. Estrutura do Projeto

O projeto será dividido em módulos para facilitar o desenvolvimento e a organização do código. Cada módulo terá seu próprio arquivo HTML, CSS e JavaScript.

Módulos:

Login: Responsável pela autenticação do usuário.
Cadastro: Responsável pelo cadastro de novos médicos.
Listagem: Responsável pela listagem de todos os médicos.
Detalhes: Responsável pela exibição dos detalhes de um médico específico.
Edição: Responsável pela edição dos dados de um médico (desafio).
Exclusão: Responsável pela exclusão de um médico.
Carousel: Responsável pela exibição dos médicos em um carousel (desafio).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Arquivos HTML

index.html: Página principal (listagem de médicos).
cadastro.html: Página de cadastro de médicos.
cards.html: Página de detalhes de um médico.
editar.html: Página de edição de médicos (opcional).

3. Arquivos CSS

cards.css: Estilos da pagina de cards dos Medicos.
register.css: Estilo da pagina de cadastro.
home.css: Estilo da main page.
style.css: Estilos globais para a aplicação.
login.css: Estilos específicos para a página de login.

4. Arquivos JavaScript

scripts.js: scripts gerais.
Login.js: Lógica para o Login do usuario.
Home.js: Logica da home page e carrosel.
cadastro.js: Lógica para o cadastro de usuario.
detalhes.js: Lógica para a exibição de detalhes de um médico.
Doctor.js: Lógica para a edição de médicos (opcional).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
5. Implementação da Lógica

5.1 Login

Utilizar a API de login para autenticar o usuário.
Verificar se o usuário está autenticado antes de acessar as demais páginas.

5.2 Cadastro

Validar os dados do formulário de cadastro.
Enviar os dados para a API de cadastro de médicos.

5.3 Listagem

Obter os dados dos médicos da API de listagem.
Exibir os dados na tela de forma organizada.

5.4 Detalhes

Obter os detalhes do médico da API de filtro.
Exibir os detalhes na tela.

5.5 Edição (Desafio)

Obter os dados do médico da API de filtro.
Preencher o formulário de edição com os dados do médico.
Enviar os dados atualizados para a API de atualização de médicos.

5.6 Exclusão

Obter a confirmação do usuário para excluir o médico.
Enviar a requisição para a API de exclusão de médicos.

5.7 Carousel (Desafio)

Incluir o carousel na página de listagem.
Configurar o carousel para exibir os dados dos médicos.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6. Desafios

6.1 Carousel

Implementar um carousel utilizando Bootstrap para exibir os médicos de forma mais dinâmica.
Adaptar a interface de listagem para incluir o carousel.

6.2 Edição

Implementar a funcionalidade de edição de médicos.
Utilizar a API de atualização de médicos para enviar os dados atualizados para o servidor.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
7. Ferramentas

HTML: Para estruturar o layout e os elementos da interface.
CSS: Para definir o estilo visual dos elementos HTML.
JavaScript: Para interagir com o usuário, manipular dados e se comunicar com a API.
Bootstrap: Para criar o carousel (desafio).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
8. API

Put – https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/:id 
Login - https://back-login.vercel.app/usuarios
Get – https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos 
Filtro - https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/buscar/medico/:id 
Post – https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico 
Delete – https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/:id

