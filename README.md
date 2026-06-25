# Star Wars Galactic Registry

A Star Wars-inspired backend project built with **Node.js**, **Express**, **MongoDB Atlas**, **Mongoose**, **Faker**, **bcrypt**, and **Handlebars**.

This application provides a galactic control panel where users and creatures can be generated, visualized, and stored in a database. It also includes API endpoints for mocking users and pets, inserting generated data into MongoDB, and checking the saved records.

## Live Demo

Render Deploy:

```txt
https://star-wars-0nsj.onrender.com
```

GitHub Repository:

```txt
https://github.com/Nicolas2001git/star-wars
```

---

## Project Description

**Star Wars Galactic Registry** is a backend project created as a mocking and data-generation exercise. The main goal is to generate fake users and pets using a dedicated mocking module and expose them through API endpoints.

The project includes:

* A custom mocks router.
* Mocked galactic users.
* Mocked galactic creatures.
* Encrypted passwords using bcrypt.
* Random roles between `user` and `admin`.
* Empty pets arrays for generated users.
* Data insertion into MongoDB Atlas.
* Visual pages built with Handlebars.
* A Star Wars-themed user interface.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Faker.js
* bcrypt
* Express Handlebars
* CSS
* Render
* GitHub

---

## Main Features

### Galactic User Mocking

The project can generate mock users with the following structure:

```js
{
  _id,
  first_name,
  last_name,
  email,
  password,
  role,
  pets,
  createdAt,
  updatedAt
}
```

Each generated user includes:

* A Star Wars-inspired first name.
* A Star Wars-inspired last name.
* A HoloNet-style email address.
* An encrypted password.
* A random role: `user` or `admin`.
* An empty `pets` array.

The default password before encryption is:

```txt
coder123
```

However, the password is never stored as plain text. It is encrypted using bcrypt.

---

### Galactic Creature Mocking

The project can also generate mocked creatures inspired by the Star Wars universe.

Each creature includes:

```js
{
  _id,
  name,
  specie,
  birthDate,
  adopted,
  owner,
  image,
  createdAt,
  updatedAt
}
```

Creatures may include species such as:

* Porg
* Tauntaun
* Bantha
* Loth-cat
* Wampa
* Rancor
* Blurrg
* Varactyl
* Nexu
* Acklay

---

## Project Structure

```txt
BACKEND-3/
│
├── package.json
├── package-lock.json
├── .gitignore
│
└── src/
    ├── app.js
    │
    ├── models/
    │   ├── users.model.js
    │   └── pets.model.js
    │
    ├── routes/
    │   ├── mocks.router.js
    │   ├── users.router.js
    │   ├── pets.router.js
    │   └── views.router.js
    │
    ├── utils/
    │   └── mocking.js
    │
    ├── public/
    │   └── css/
    │       └── styles.css
    │
    └── views/
        ├── layouts/
        │   └── main.handlebars
        ├── home.handlebars
        ├── users.handlebars
        ├── pets.handlebars
        ├── mockUsers.handlebars
        └── mockPets.handlebars
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Nicolas2001git/star-wars.git
```

Enter the project folder:

```bash
cd star-wars
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8080
MONGO_URL=your_mongodb_atlas_connection_string
```

Example format:

```env
PORT=8080
MONGO_URL=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/backend3-starwars?retryWrites=true&w=majority
```

Important: the `.env` file must not be uploaded to GitHub.

The project includes a `.gitignore` file with:

```gitignore
node_modules
.env
```

---

## Available Scripts

Run the project in production mode:

```bash
npm start
```

Run the project in development mode with nodemon:

```bash
npm run dev
```

---

## Main Views

### Command Center

```txt
/
```

Main visual panel where galactic travelers and creatures can be generated and inserted.

### Mock Galactic Travelers

```txt
/mockingusers-view
```

Displays mocked users in a Star Wars-themed table.

### Mock Galactic Creatures

```txt
/mockingpets-view
```

Displays mocked creatures in a Star Wars-themed table.

### Registered Travelers

```txt
/users-view
```

Displays saved users from the Galactic Registry.

### Registered Creatures

```txt
/pets-view
```

Displays saved creatures from the Galactic Registry.

---

## API Endpoints

### Mock Users

```http
GET /api/mocks/mockingusers
```

Generates 50 mock galactic users by default.

Optional query parameter:

```http
GET /api/mocks/mockingusers?users=10
```

---

### Mock Pets

```http
GET /api/mocks/mockingpets
```

Generates 100 mock galactic creatures by default.

Optional query parameter:

```http
GET /api/mocks/mockingpets?pets=10
```

---

### Generate and Insert Data

```http
POST /api/mocks/generateData
```

Generates and inserts users and pets into the database.

Example body:

```json
{
  "users": 10,
  "pets": 20
}
```

Example response:

```json
{
  "status": "success",
  "message": "Galactic data generated and inserted successfully into MongoDB.",
  "payload": {
    "usersInserted": 10,
    "petsInserted": 20
  }
}
```

---

### Get Saved Users

```http
GET /api/users
```

Returns all saved users.

---

### Get Saved Pets

```http
GET /api/pets
```

Returns all saved pets.

---

## Mocking Module

The mocking logic is separated into its own utility file:

```txt
src/utils/mocking.js
```

This module exports two main functions:

```js
generateMockUsers(quantity)
generateMockPets(quantity)
```

This keeps the code organized and separates data-generation logic from route handling.

---

## Mocks Router

The mocks router is located at:

```txt
src/routes/mocks.router.js
```

It works under the base path:

```txt
/api/mocks
```

It contains the following endpoints:

```txt
GET /mockingusers
GET /mockingpets
POST /generateData
```

---

## Star Wars Theme

The project uses a full Star Wars-inspired visual style:

* Dark galactic background.
* Yellow titles inspired by the Star Wars logo.
* Blue glowing details inspired by lightsabers.
* Galactic terminology throughout the interface.
* Travelers and creatures instead of generic users and pets.

---

## Deployment

The project is deployed on Render.

Production URL:

```txt
https://star-wars-0nsj.onrender.com
```

Render configuration:

```txt
Build Command: npm install
Start Command: npm start
```

The MongoDB connection string is configured as an environment variable in Render.

---

May the Force be with your data.
