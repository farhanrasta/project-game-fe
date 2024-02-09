# Game API Spec

## Sign Up User

Endpoint : http://localhost:3000/api/signup

Method : POST

Request Body :

```json 
{
    "username" : "densa123",
    "password" : "densa123", // ketika di save buat jadi form data
    "name" : "Deni Saputra"
}
```

Response Body (Success):

```json
{
    "data" : "Ok"
}
```

Response Body (Failed):

```json
{
    "errors" : "Username has already exist"
}
```



## Login User

Endpoint : http://localhost:3000/api/login

Method : POST

Request Body :

```json 
{
    "username" : "densa123",
    "password" : "densa123" //form data
}
```

Response Body (Success):

```json
{
    "data" : {
      "token" : "TOKEN",
      "expiredAt" : 164681687646 
    }
}
```

Response Body (Failed, 401):

```json
{
    "errors" : "username or password is incorrect"
}
```



## Game Display

Endpoint : http://localhost:3000/api/game

Method : POST

Request Header :

- X-API-TOKEN : Token (Mandatory)

Request Body :

```json 
{
    "user" : "gunting",
    "computer" : "kertas" //di random
}
```

Response Body (Success):

```json
{
  "data" : "anda menang!"
}
```

Response Body (Failed, 401):

```json
{
    "errors" : "Unauthorized"
}
```



## Logout User

Endpoint : http://localhost:3000/api/logout

Method : DELETE

Request Header :

- X-API-TOKEN : Token (Mandatory)

Response Body (Success) :

```json
{
    "data" : "Ok"
}
```
