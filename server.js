const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const http = require('http');

require('dotenv').config();
// Use process.env.PORT to get the port number
const PORT = process.env.PORT || 3000;


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) =>{ res.send('Get success and then what?') }) 
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res);})

app.listen(PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});