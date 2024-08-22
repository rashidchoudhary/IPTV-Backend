# IPTV Backend Express Project:

## Description

This is IPTV backend project using ExpressJS, Joi, Mongoose, JWT, Bcrypt, Services, Controllers, Routes, etc. 

## Run Project

### 1. Install packages

```bash
npm install
```

### 3. Run the project

```bash
npm run start
```

Or if you want to run the project in development mode

```shell
npm run dev
```

## Project Structure

Project structure is like this:

```md 
├── node_modules
├── src
│   ├── config
│   │   ├── env.js
│   │   ├── index.js
│   ├── constants
│   │   ├── error-codes.js
│   │   ├── index.js
│   │   ├── misc.js
│   │   ├── success-codes.js
│   ├── controllers
│   │   ├── index.js
│   │   ├── userController.js
│   ├── loaders
│   │   ├── express.js
│   │   ├── index.js
│   │   ├── mongoose.js
│   ├── models
│   │   ├── index.js
│   │   ├── userModel.js
│   ├── routes
│   │   ├── index.js
│   │   ├── userRoute.js
│   ├── services
│   │   ├── index.js
│   │   ├── userService.js
│   ├── utils
│   │   ├── httpResponse.js
│   │   ├── index.js
│   ├── validations
│   │   ├── index.js
│   │   ├── userValidation.js
│   ├── index.js
├── .dockerignore
├── .env
├── .env.docker
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
```



