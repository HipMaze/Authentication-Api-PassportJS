# Authentication-Api-PassportJS

Easy to use authentication and authorization api using passportJS.

## Description

This project is a simple to use backend starter template that features an authentication and authorization using passportjs strategies. As such, this project can be expanded with other strategies (twitter, google, Oauth) to fit a variety of authentication needs. And for the authorization part, adding or modifying roles can be done by modifing the roles object in /utils/roles. 

## Getting Started

### Dependencies

run npm install to install all the dependencies. (for a complete list of all the dependencies check package.json)
* npm
  ```sh
  npm install
  ```


### Installing

* git
  ```sh
  git clone git@github.com:HipMaze/Authentication-Api-PassportJS.git
  ```


### Executing program

* before running the code be sure to create a dotenv file with the required environement variables
  ```
  #Running port of Nodejs
  API_PORT=3000

  #DB URI 
  MONGO_URI=

  #Base api url
  BASE_API_URL=/api

  #Jwt secret key (the best option is to generate a rsa keypair)
  JWT_SECRET=
   ```

* node
  ```sh
  node index.js
  ```



## Help

if you find any problem using this api, if you find any bug, or if you need help adapting it to your needs be sure to create a new issue i will answer it asap.

## Authors

* Ayman El Azm : [@HipMaze](https://github.com/HipMaze)

## License

This project is licensed under the [MIT](LICENSE) License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [passport-next-auth-tutorial](https://github.com/jpreecedev/passport-next-auth-tutorial)
* [jwt-project](https://github.com/Olanetsoft/jwt-project)
* [express-jwt-authentication-starter](https://github.com/zachgoll/express-jwt-authentication-starter)
* [rest-api-mvc-jwt-rbac](https://github.com/msevera/rest-api-mvc-jwt-rbac)
