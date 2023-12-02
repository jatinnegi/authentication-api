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

## API Example

### POST /api/users/register

**Request**

```shell
$ curl --header "Content-Type: application/json" --request POST --data '{"name":"John Doe","username": "john_doe","password":"password","age":"30","bio":"Backend enthusiast"}' http://localhost:1337/api/users/register
```

**Response**

```
{
    "status": "success",
    "user": {
        "id": 1,
        "name": "John Doe",
        "username": "john_doe",
        "age": "30",
        "bio": "Backend enthusiast"
    }
}
```

### POST /api/users/login

**Request**

```shell
$ curl --header "Content-Type: application/json" --request POST --data '{"username": "john_doe","password":"password"}' http://localhost:1337/api/users/login
```

**Response**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMTUzMTA4NSwiZXhwIjoxNzAxNTMyODg1fQ.hSXScNYjbE_-KpQAu0vLbBuvMReWihHc744jjhJRVos",
    "user": {
        "id": 1,
        "name": "John Doe",
        "username": "john_doe",
        "age": 30,
        "bio": "Backend enthusiast"
    }
}
```

### GET /api/users/detail

**Request**

```shell
$ curl --header "Authorization: Token <ACCESS_TOKEN>" http://localhost:1337/api/users/detail
```

**Response**

```
{
    "user": {
        "id": 1,
        "name": "John Doe",
        "username": "john_doe",
        "age": 30,
        "bio": "Backend enthusiast"
    }
}
```

### PUT /api/users/update

**Request**

```shell
$ curl -H "Authorization: Token <ACCESS_TOKEN>" -H "Content-Type: application/json" --data '{"name":"Jane Doe","username":"jane_doe","age":"35","bio":"Frontend enthusiast"}' -X PUT http://localhost:1337/api/users/update
```

**Response**

```
{
    "status": "success",
    "user": {
        "id": 1,
        "name": "John Doe",
        "username": "john_doe",
        "age": 30,
        "bio": "Backend enthusiast"
    }
}
```

### DELETE /api/users/delete

**Request**

```shell
$ curl -H "Authorization: Token <ACCESS_TOKEN>" -H "Content-Type: application/json" --data '{"password":"password"}' -X DELETE http://localhost:1337/api/users/delete
```

**Response**

```
{
    "status": "success"
}
```

### POST /api/users/logout

**Request**

```shell
$ curl -H "Authorization: Token <ACCESS_TOKEN>" -H "Content-Type: application/json" -X POST http://localhost:1337/api/users/logout
```

**Response**

```
{
    "status": "success"
}
```

### POST /api/users/recover

**Request**

```shell
$ curl -H "Content-Type: application/json" --data '{"username":"jane_doe","password":"password"}' -X POST http://localhost:1337/api/users/recover
```

**Response**

```
{
    "status": "success"
}
```

### POST /api/users/password-reset

**Request**

```shell
$ curl -H "Authorization: Token <ACCESS_TOKEN>" -H "Content-Type: application/json" --data '{"oldPassword":"password","newPassword":"new_password"}' -X POST http://localhost:1337/api/users/password-reset
```

**Response**

```
{
    "status": "success"
}
```
