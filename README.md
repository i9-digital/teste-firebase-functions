# Firebase Functions

## What is inside?

This project uses the following technologies:

- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Typescript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/)
- [Jest](https://jestjs.io/)

## Folder Structure

```
├── functions
│   ├── src
│   │   ├── index.ts
│   │   ├── index.spec.ts
```

## Architecture
This project uses a serverless function-based architecture with Firebase Cloud Functions and Cloud Firestore.

Single Responsibility Principle (SRP):
- `createUser`: This function has a single responsibility, which is to create a new record in the 'users' collection. Therefore, it follows the SRP.

- `onUserCreate`: This function also has a single responsibility, which is to update the 'increment_id' when a new record is created.

And uses the KISS principle (Keep it Simple, Stupid)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

First, run the development server:

```bash
cd functions
npm install
npm run start:dev
```

Open [http://127.0.0.1:4000/ ](http://127.0.0.1:4000/ ) with your browser to see the result.

Post a request to the following endpoint to create a new user:

```bash
curl -X POST 'http://127.0.0.1:5001/recrutamento-felipe/us-central1/createUser' -H "Content-Type: application/json" -d '{"name": "John Doe"}'
```

### Deploy

To deploy your application to Firebase, run the following command:

```bash
firebase login
npm run deploy
```

### Testing

```bash
npm run test
```

## Commands

- `lint`: runs the linter in all project
- `start:dev`: runs your application on `localhost:3000`
- `deploy`: deploy your application to firebase
- `test`: runs all tests
- `build`: builds your application

## Documentation
