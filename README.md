# keycloak-nodejs-microservice

## Docs

- https://medium.com/devops-dudes/securing-node-js-express-rest-apis-with-keycloak-a4946083be51
- https://blog.ineat-group.com/2017/11/securisez-vos-apis-spring-avec-keycloak-2-parametrage-dun-domaine-keycloak/
- https://blog.ineat-group.com/2019/11/creer-une-api-node-js-et-la-securiser-avec-keycloak/

##   Start

1. Nodejs

```
node --version
v13.13.0
npm --version
6.14.4
```

Start your terminal/cmd, create a new folder named keycloak-nodejs-microserviceand cd (change directory) into it.

```
mkdir keycloak-nodejs-microservice
cd keycloak-nodejs-microservice

```
2. Now to create the package.json file using npm, use the following command.


```
npm init

```

It will ask you for the following information. Just keep pressing enter, and enter your name at the “author name” field.


npm init console output
3. Now we have our package.json file set up, we will further install Express. To install Express and add it to our package.json file, use the following command.

```
npm install --save express

```
To confirm that Express has installed correctly, run the following code.

```
ls node_modules #(dir node_modules for windows)
```
4. To make our development process a lot easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files, otherwise, we need to restart the server manually after each file modification. To install nodemon, use the following command.

```
npm install -g nodemon
```

## Keycloak Realm OpenID Endpoint Configuration

1. Copy token_endpoint from the OpenID Endpoint Configuration. URL would look like:

<KEYCLOAK_SERVER_URL>/auth/realms/<REALM_NAME>/protocol/openid-connect/token
Ex: http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token

2. Use the following CURL command to generate user credentials. Replace KEYCLOAK_SERVER_URL, REALM_NAME, CLIENT_ID, USERNAME, PASSWORD with correct values.

```
curl -X POST '<KEYCLOAK_SERVER_URL>/auth/realms/<REALM_NAME>/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=<CLIENT_ID>' \
 --data-urlencode 'username=<USERNAME>' \
 --data-urlencode 'password=<PASSWORD>'
 ```
 
Example:

```
curl -X POST 'http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=nodejs-microservice' \
 --data-urlencode 'client_secret=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx' \
 --data-urlencode 'username=employee1' \
 --data-urlencode 'password=mypassword'
 ```
 
Execute the CURL from Terminal or use Postman. The response would look like below.


## Let’s decode the access_token JWT token issued for employee1 using https://jwt.io.

Let’s decode the access_token JWT token issued for employee1 using https://jwt.io.

access_token includes the permission details.

realm_access.roles includes app_user realm role.
resource_access.nodejs-microservice.roles include the userclient role.
preferred_username includes the username of the user (employee1)

iat, exp includes the token issued time as well as the token expiry time. Access Token expiry times can be customizable under Realm Settings, Tokens tab. By default, Access Token Lifespan would be set to 5 minutes which can be customized based on your security requirements.

##  Test API

curl -X GET 'http://localhost:3000/test/user'  --header 'Authorization: bearer <ACCESS_TOKEN>'

curl -X GET 'http://localhost:3000/test/admin' --header 'Authorization: bearer <ACCESS_TOKEN>'

curl -X GET 'http://localhost:3000/test/all-user' --header 'Authorization: bearer <ACCESS_TOKEN>'
