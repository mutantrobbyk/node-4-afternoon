require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const ctrl = require('./controllers/searchController')

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET ,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagController.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', ctrl.search)

app.listen(SERVER_PORT, () => {console.log(`Server is listening on port ${SERVER_PORT}`)})