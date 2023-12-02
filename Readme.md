# RESTful API Authentication

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Quick start

Clone the project and install all the dependencies

```shell
$ git clone https://github.com/jatinnegi/authentication-api.git
$ cd authentication-api
$ npm install
```

Run the following command to initialize .env file

On Unix based machines:

```shell
$ source init.sh
```

On Windows machine:

```shell
$ init.bat
```

Then run the following command to spin up the server on specified port:

```shell
$ npm run dev
```

## API Endpoints

| HTTP Verbs | Endpoints                 | Action                                |
| ---------- | ------------------------- | ------------------------------------- |
| POST       | /api/users/register       | To register a new user                |
| POST       | /api/users/login          | To login an existing user account     |
| GET        | /api/users/detail         | To retrieve details of logged-in user |
| PUT        | /api/users/update         | To allow user to update their profile |
| DELETE     | /api/users/delete         | To allow user to delete their account |
| POST       | /api/users/logout         | To log out user and invalidate token  |
| POST       | /api/users/recover        | To recover deleted account (optional) |
| POST       | /api/users/password-reset | To reset password (optional)          |
