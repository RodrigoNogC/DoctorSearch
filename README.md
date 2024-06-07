# Project Title

A brief description of what this project does and who it's for.

## 1. Project Structure

The project will be divided into modules to facilitate the development and organization of the code. Each module will have its own HTML, CSS, and JavaScript file.

### Modules:

- **Login**: Responsible for user authentication.
- **Registration**: Responsible for registering new doctors.
- **Listing**: Responsible for listing all doctors.
- **Details**: Responsible for displaying the details of a specific doctor.
- **Edit**: Responsible for editing a doctor's data (challenge).
- **Deletion**: Responsible for deleting a doctor.
- **Carousel**: Responsible for displaying the doctors in a carousel (challenge).

## 2. HTML Files

- `index.html`: Main page (list of doctors).
- `registration.html`: Doctors' registration page.
- `cards.html`: Doctor details page.
- `edit.html`: Page for editing doctors (optional).

## 3. CSS Files

- `cards.css`: Styles for the Doctors cards page.
- `register.css`: Style for the registration page.
- `home.css`: Main page style.
- `style.css`: Global styles for the application.
- `login.css`: Specific styles for the login page.

## 4. JavaScript Files

- `scripts.js`: General scripts.
- `login.js`: Logic for user login.
- `home.js`: Logic for the home page and carousel.
- `registration.js`: Logic for user registration.
- `details.js`: Logic for displaying a doctor's details.
- `doctor.js`: Logic for editing doctors (optional).

## 5. Logic Implementation

### 5.1 Login

- Use the login API to authenticate the user.
- Check that the user is authenticated before accessing the other pages.

### 5.2 Registration

- Validate the data on the registration form.
- Send the data to the doctor registration API.

### 5.3 Listing

- Get the doctors' data from the listing API.
- Display the data on the screen in an organized way.

### 5.4 Details

- Get the doctor's details from the filter API.
- Display the details on the screen.

### 5.5 Editing (Challenge)

- Get the doctor's details from the filter API.
- Fill in the editing form with the doctor's details.
- Send the updated data to the doctor update API.

### 5.6 Deletion

- Obtain confirmation from the user to delete the doctor.
- Send the request to the API for deleting doctors.

### 5.7 Carousel (Challenge)

- Include the carousel on the list page.
- Configure the carousel to display the doctors' data.

## 6. Challenges

### 6.1 Carousel

- Implement a carousel using Bootstrap to display doctors more dynamically.
- Adapt the listing interface to include the carousel.

### 6.2 Editing

- Implement doctor editing functionality.
- Use the doctor update API to send the updated data to the server.

## 7. Tools

- **HTML**: To structure the layout and interface elements.
- **CSS**: To define the visual style of HTML elements.
- **JavaScript**: To interact with the user, manipulate data and communicate with the API.
- **Bootstrap**: To create the carousel (challenge).

## 8. API

- **PUT** - `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/atualizar/medico/:id`
- **Login** - `https://back-login.vercel.app/usuarios`
- **GET** - `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/listar/medicos`
- **Filter** - `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/buscar/medico/:id`
- **POST** - `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/novo/medico`
- **DELETE** - `https://projeto-integrado-avaliacao.azurewebsites.net/projeto4/fecaf/excluir/medico/:id`
