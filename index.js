var session = require('express-session');

var express = require('express');
var app = express();

const keycloak = require('./config/keycloak-config.js').initKeycloak();
//app.use(keycloak.middleware());

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'ae0f5535-e1f6-4867-9434-0409330f0689',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.



app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));



const testController = require('./controller/test-controller.js');
app.use('/test', testController);

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(3000);