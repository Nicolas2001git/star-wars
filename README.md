# Star Wars Galactic Registry

A Star Wars-inspired backend application developed with **Node.js**, **Express**, **MongoDB Atlas**, **Mongoose**, **Faker**, **bcrypt**, **Handlebars**, **Swagger**, **Mocha**, **Chai**, **Supertest**, and **Docker**.

The application provides a galactic control panel where users and creatures can be generated, visualized, stored, and connected through adoption missions.

It also includes REST API endpoints, Swagger documentation, functional tests, a public Docker image, and a production deployment on Render.

---

## Live Project

### Render Deployment

```txt
https://star-wars-0nsj.onrender.com
```

### GitHub Repository

```txt
https://github.com/Nicolas2001git/star-wars
```

### Docker Hub Image

```txt
https://hub.docker.com/r/nicolasriveiradev2001/star-wars
```

---

## Project Description

**Star Wars Galactic Registry** is a backend application created to manage galactic users, creatures, mocked data, and adoption missions.

The project can generate fake users and creatures through a dedicated mocking module, insert them into MongoDB Atlas, display them through a Star Wars-themed interface, and create adoption relationships between users and creatures.

The project includes:

- Mocked galactic users.
- Mocked galactic creatures.
- Password encryption with bcrypt.
- Random roles between `user` and `admin`.
- MongoDB Atlas persistence.
- User and creature queries.
- Galactic adoption records.
- Swagger documentation.
- Functional tests.
- Docker support.
- A public Docker Hub image.
- Deployment on Render.

---

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

### Mocking and Security

- Faker.js
- bcrypt

### Views

- Express Handlebars
- HTML
- CSS

### API Documentation

- Swagger JSDoc
- Swagger UI Express
- OpenAPI 3

### Testing

- Mocha
- Chai
- Supertest
- MongoDB Memory Server

### Deployment and Containers

- Docker
- Docker Hub
- Render
- GitHub

---

## Main Features

### Galactic User Mocking

The application can generate mock galactic users with the following structure:

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

- A Star Wars-inspired first name.
- A Star Wars-inspired last name.
- A HoloNet-style email address.
- An encrypted password.
- A random role between `user` and `admin`.
- An empty `pets` array.
- MongoDB timestamps.

The default password before encryption is:

```txt
coder123
```

The password is encrypted with bcrypt before the user is returned or inserted into MongoDB.

---

### Galactic Creature Mocking

The application can generate creatures inspired by the Star Wars universe.

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

Generated creatures may include species such as:

- Porg
- Tauntaun
- Bantha
- Loth-cat
- Wampa
- Rancor
- Blurrg
- Varactyl
- Nexu
- Acklay

By default, generated creatures are not adopted and do not have an owner.

---

### Galactic Adoption System

The adoption module connects a galactic citizen with a creature.

When an adoption is completed:

- A new adoption record is created.
- The creature changes its `adopted` property to `true`.
- The user ID is stored as the creature's `owner`.
- The creature ID is added to the user's `pets` array.
- Duplicate adoption records are prevented.
- Invalid MongoDB IDs are rejected.
- Missing users and creatures return error responses.

An adoption record has the following structure:

```js
{
  _id,
  owner,
  pet,
  createdAt,
  updatedAt
}
```

The adoption router handles:

- Successful adoptions.
- Invalid adoption IDs.
- Missing adoption records.
- Invalid user IDs.
- Invalid creature IDs.
- Missing users.
- Missing creatures.
- Already adopted creatures.
- Duplicate adoption records.

---

### Star Wars-Themed Interface

The visual interface includes:

- Dark galactic backgrounds.
- Yellow titles inspired by the Star Wars logo.
- Blue glowing details inspired by lightsabers.
- Galactic terminology.
- Travelers instead of generic users.
- Creatures instead of generic pets.
- Adoption missions where creatures join new crews.

The interface is rendered with Express Handlebars.

---

## Project Structure

```txt
BACKEND-3/
│
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
│
├── test/
│   └── adoption.router.test.js
│
└── src/
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   └── swagger.js
    │
    ├── docs/
    │   └── users.yaml
    │
    ├── models/
    │   ├── users.model.js
    │   ├── pets.model.js
    │   └── adoptions.model.js
    │
    ├── routes/
    │   ├── mocks.router.js
    │   ├── users.router.js
    │   ├── pets.router.js
    │   ├── adoption.router.js
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

The `node_modules` folder and `.env` file are not included in the repository.

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

Install the dependencies:

```bash
npm install
```

Create the `.env` file and start the application.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URL=your_mongodb_atlas_connection_string
```

Example format:

```env
PORT=8080
MONGO_URL=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/backend3-starwars?retryWrites=true&w=majority
```

Do not include quotation marks around the values.

The `.env` file contains private information and must not be uploaded to GitHub or copied into the Docker image.

The `.gitignore` file includes:

```gitignore
node_modules
.env
```

---

## Available Scripts

### Production Mode

Runs the application with Node.js:

```bash
npm start
```

This command executes:

```txt
node src/server.js
```

### Development Mode

Runs the application with Nodemon:

```bash
npm run dev
```

### Functional Tests

Runs the adoption router functional tests:

```bash
npm test
```

Expected result:

```txt
11 passing
```

---

## Main Views

### Galactic Command Center

```http
GET /
```

Main control panel where galactic users and creatures can be generated and inserted into MongoDB.

---

### Mock Galactic Travelers

```http
GET /mockingusers-view
```

Displays generated mock users in a Star Wars-themed table.

---

### Mock Galactic Creatures

```http
GET /mockingpets-view
```

Displays generated mock creatures in a Star Wars-themed table.

---

### Registered Travelers

```http
GET /users-view
```

Displays users stored in MongoDB Atlas.

---

### Registered Creatures

```http
GET /pets-view
```

Displays creatures stored in MongoDB Atlas.

---

## API Endpoints

## Mocking Endpoints

### Generate Mock Users

```http
GET /api/mocks/mockingusers
```

Generates 50 mock galactic users by default.

An optional quantity can be provided:

```http
GET /api/mocks/mockingusers?users=10
```

---

### Generate Mock Creatures

```http
GET /api/mocks/mockingpets
```

Generates 100 mock creatures by default.

An optional quantity can be provided:

```http
GET /api/mocks/mockingpets?pets=10
```

---

### Generate and Insert Data

```http
POST /api/mocks/generateData
```

Generates users and creatures and inserts them into MongoDB Atlas.

Example request body:

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
  "message": "Datos galácticos generados e insertados correctamente en MongoDB.",
  "payload": {
    "usersInserted": 10,
    "petsInserted": 20,
    "users": [],
    "pets": []
  }
}
```

The `users` and `pets` values must be integers equal to or greater than zero.

---

## Users Endpoints

### Get All Users

```http
GET /api/users
```

Returns all users stored in MongoDB.

Example response:

```json
{
  "status": "success",
  "message": "Usuarios obtenidos correctamente.",
  "payload": []
}
```

---

### Get One User

```http
GET /api/users/:uid
```

Returns one user using a MongoDB ID.

Example:

```http
GET /api/users/688b9d67e55c88d1bfe4a001
```

Possible responses:

- `200`: User retrieved successfully.
- `404`: User not found.
- `500`: Internal server error.

---

## Creature Endpoints

### Get All Creatures

```http
GET /api/pets
```

Returns all creatures stored in MongoDB.

Example response:

```json
{
  "status": "success",
  "message": "Mascotas obtenidas correctamente.",
  "payload": []
}
```

---

### Get One Creature

```http
GET /api/pets/:pid
```

Returns one creature using a MongoDB ID.

Example:

```http
GET /api/pets/688b9d67e55c88d1bfe4a002
```

Possible responses:

- `200`: Creature retrieved successfully.
- `404`: Creature not found.
- `500`: Internal server error.

---

## Adoption Endpoints

### Get All Galactic Adoptions

```http
GET /api/adoptions
```

Returns every adoption record with populated user and creature information.

Example response:

```json
{
  "status": "success",
  "message": "Galactic adoptions retrieved successfully.",
  "payload": []
}
```

---

### Get One Galactic Adoption

```http
GET /api/adoptions/:aid
```

Returns one adoption using its MongoDB ID.

Possible responses:

- `200`: Adoption retrieved successfully.
- `400`: Invalid adoption ID.
- `404`: Adoption not found.
- `500`: Internal server error.

---

### Create a Galactic Adoption

```http
POST /api/adoptions/:uid/:pid
```

Creates an adoption between a user and a creature.

Example:

```http
POST /api/adoptions/USER_ID/PET_ID
```

The endpoint verifies that:

- The user ID is valid.
- The creature ID is valid.
- The user exists.
- The creature exists.
- The creature has not already been adopted.
- A previous adoption record does not already exist.

Successful response:

```json
{
  "status": "success",
  "message": "The galactic creature has successfully joined its new crew.",
  "payload": {
    "_id": "ADOPTION_ID",
    "owner": {},
    "pet": {},
    "createdAt": "2026-07-30T00:00:00.000Z",
    "updatedAt": "2026-07-30T00:00:00.000Z"
  }
}
```

Possible responses:

- `201`: Adoption created successfully.
- `400`: Invalid ID, adopted creature, or duplicate adoption.
- `404`: User or creature not found.
- `500`: Internal server error.

---

## Swagger Documentation

The Users module is documented with Swagger and OpenAPI 3.

Start the project:

```bash
npm start
```

Open the local Swagger documentation:

```txt
http://localhost:8080/api/docs
```

The documentation includes:

```txt
GET /api/users
GET /api/users/{uid}
```

Swagger describes:

- The User schema.
- User properties.
- Successful responses.
- Users not found.
- Invalid requests.
- Internal server errors.

The production Swagger documentation is available at:

```txt
https://star-wars-0nsj.onrender.com/api/docs
```

---

## Functional Tests

Functional tests were developed for every endpoint in `adoption.router.js`.

The tests use:

- Mocha as the test runner.
- Chai for assertions.
- Supertest for HTTP requests.
- MongoDB Memory Server for an isolated temporary database.

Run the tests with:

```bash
npm test
```

The test suite covers:

1. Getting all galactic adoptions.
2. Getting one adoption successfully.
3. Rejecting an invalid adoption ID.
4. Returning an error for a missing adoption.
5. Creating an adoption successfully.
6. Rejecting an invalid user ID.
7. Rejecting an invalid creature ID.
8. Returning an error when the user does not exist.
9. Returning an error when the creature does not exist.
10. Rejecting a creature that is already adopted.
11. Rejecting a duplicate adoption record.

Expected output:

```txt
Functional tests for Galactic Adoptions
  GET /api/adoptions
    ✔ should return all galactic adoptions
  GET /api/adoptions/:aid
    ✔ should return one galactic adoption
    ✔ should return 400 when the adoption ID is invalid
    ✔ should return 404 when the adoption does not exist
  POST /api/adoptions/:uid/:pid
    ✔ should adopt a galactic creature successfully
    ✔ should return 400 when the user ID is invalid
    ✔ should return 400 when the pet ID is invalid
    ✔ should return 404 when the galactic citizen does not exist
    ✔ should return 404 when the galactic creature does not exist
    ✔ should return 400 when the creature is already adopted
    ✔ should return 400 when an adoption record already exists

11 passing
```

MongoDB Memory Server prevents the tests from modifying the production MongoDB Atlas database.

---

## Docker

The project includes a `Dockerfile` that generates a reproducible production image.

### Public Docker Image

The public Docker image is available at:

```txt
https://hub.docker.com/r/nicolasriveiradev2001/star-wars
```

Image name:

```txt
nicolasriveiradev2001/star-wars:latest
```

---

### Pull the Image

Download the image from Docker Hub:

```bash
docker pull nicolasriveiradev2001/star-wars:latest
```

---

### Build the Image Locally

Build the image using the included `Dockerfile`:

```bash
docker build -t nicolasriveiradev2001/star-wars:latest .
```

Confirm that the image was created:

```bash
docker images
```

---

### Run the Container

Create a valid `.env` file in the project root:

```env
PORT=8080
MONGO_URL=your_mongodb_atlas_connection_string
```

Run the container:

```bash
docker run --rm --name star-wars-api -p 8080:8080 --env-file .env nicolasriveiradev2001/star-wars:latest
```

Expected output:

```txt
MongoDB conectado correctamente
Servidor funcionando en http://localhost:8080
```

The application will be available at:

```txt
http://localhost:8080
```

Swagger will be available at:

```txt
http://localhost:8080/api/docs
```

The adoption endpoint will be available at:

```txt
http://localhost:8080/api/adoptions
```

---

### Stop the Container

When the container is running directly in the terminal, stop it with:

```txt
Ctrl + C
```

Because the command uses `--rm`, Docker automatically removes the container after it stops.

---

### Run the Container in the Background

Run the container in detached mode:

```bash
docker run -d --name star-wars-api -p 8080:8080 --env-file .env nicolasriveiradev2001/star-wars:latest
```

Stop the container:

```bash
docker stop star-wars-api
```

Remove the container:

```bash
docker rm star-wars-api
```

---

## Dockerfile

The project uses the following Dockerfile:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
```

The Dockerfile:

- Uses the lightweight Node.js Alpine image.
- Creates `/app` as the working directory.
- Copies the dependency files first.
- Installs production dependencies with `npm ci`.
- Copies the application files.
- Configures the production environment.
- Exposes port `8080`.
- Starts the project with `npm start`.

---

## Docker Ignore Configuration

The `.dockerignore` file prevents private or unnecessary files from being copied into the image:

```txt
node_modules
npm-debug.log
.env
.git
.gitignore
test
coverage
```

This keeps the image smaller and prevents private environment variables from being included.

---

## Render Deployment

The application is deployed on Render.

Production URL:

```txt
https://star-wars-0nsj.onrender.com
```

Render configuration:

```txt
Build Command: npm install
Start Command: npm start
```

The MongoDB Atlas connection string is configured securely through the Render environment variables.

The application uses the port provided by Render or port `8080` as a local default.

When Render displays the following message, the deployment is available:

```txt
Available at your primary URL https://star-wars-0nsj.onrender.com
```

---

## Security Notes

- Never upload `.env` to GitHub.
- Never include MongoDB credentials in the README.
- Never copy `.env` into the Docker image.
- Use environment variables in Render.
- Change database passwords if they are accidentally exposed.
- Generated passwords are encrypted with bcrypt.
- Production credentials should be different from test data.

---

## Final Project Requirements

This project includes the requested final-delivery features:

- Swagger documentation for the Users module.
- Functional tests for every adoption endpoint.
- Successful and error test cases.
- A reproducible Dockerfile.
- A public Docker image uploaded to Docker Hub.
- Docker build and execution instructions.
- A Docker Hub link in the README.
- MongoDB environment configuration.
- Render production deployment.

---

## Author

Developed by **Nicolás Riveira**.

### GitHub

```txt
https://github.com/Nicolas2001git
```

### Docker Hub

```txt
https://hub.docker.com/u/nicolasriveiradev2001
```

---

## Final Message

**May the Force be with your data.**