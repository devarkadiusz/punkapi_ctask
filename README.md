Downloading repository
----------------------

    git clone https://github.com/devarkadiusz/punkapi_ctask.git
    cd punkapi_ctask

Installing dependencies
-----------------------

    # Frontend
    npm install

    # Backend
    npm --prefix src/backend install

Running
--------

    # Database
    MongoDB

    url = mongodb://localhost:27017/punkapi_db

    # npm
    
    ## Frontend
    npm start

    ## Backend
    npm run server

    # or use nodemon for the backend
    cd src/backend && nodemon server.js

# API
## Register - POST - http://localhost:8080/api/register
--------
    {
        "username": string",
        "password": string",
        "email": string"
    }

## Login - POST - http://localhost:8080/api/login
--------
    {
        "username": string",
        "password": string"
    }

## Get Token - POST - http://localhost:8080/api/token (for testing)
--------
    {
        "id": string
    }

## Update - PUT - http://localhost:8080/api/
--------
    Authorization (required)
        - Type OAuth 2.0
        - Access Token: TOKEN
        - Header Prefix: Bearer

    http://localhost:8080/api/
    {
        "email": string
    }

## Get List of favorites - GET - http://localhost:8080/api/favorite
--------
    Authorization (required)
        - Type OAuth 2.0
        - Access Token: TOKEN
        - Header Prefix: Bearer

    {
    }

## Add favorite - PUT - http://localhost:8080/api/favorite/
--------
    Authorization (required)
        - Type OAuth 2.0
        - Access Token: TOKEN
        - Header Prefix: Bearer

    {
        "beerID": string
    }

## Delete favorite - DELETE - http://localhost:8080/api/favorite
--------
    Authorization (required)
        - Type OAuth 2.0
        - Access Token: TOKEN
        - Header Prefix: Bearer

    {
        "beerID": number
    }