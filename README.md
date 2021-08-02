# Justify-API

## Introduction

Justify-API is a simple API to justify a text sent in parameter of a request.

## Routes

### POST /api/token

This route allows you to register with your email and get in response a token to be able to access the other route.
<br/>
You need to send as parameter of the request a JSON body _{email: "foo@bar.com"}_ and you get in response the token.
<br/><br/>
Example:

```
const response = await axios({
	method: 'post',
	url: '/api/token',
	data: {
	  email: 'foo@bar.com'
	},
	headers: {
	  'Content-Type': 'application/json',
	},
});
```

### POST /api/justify

This route allows you to send a text as parameter of the request and in response you get your text justified with a length of 80 characters per line.
<br/>
You need to be authenticated to access this route by passing the token you got from the previous route with the Authorization header.
<br/>
The body of the request must be of type text/plain
<br/>
There is also a limit of 80 000 words per day per token.
<br/><br/>
Example:

```
const response = await axios({
	method: 'post',
	url: '/api/justify',
	data: 'Justify this text.',
	headers: {
    'Content-Type': 'text/plain',
    'Authorization': 'Bearer ${token}'
	},
});
```

## Stack

This API is developped using NodeJS, TypeScript, Express.js and PostgreSQL.
<br/>
For code styling and readability, I am using ESLint and Prettier.

## Author

**Ariel Tedgui** : https://github.com/ArielTed
