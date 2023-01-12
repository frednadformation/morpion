// lancer express et utuliser
const express = require('express')
const app = express()
// lancer moongoose
const mongoose =  require('mongoose')
// separer le l'url pour le securiser
const dotenv = require('dotenv').config()
// hashed le mdp
const bcrypt = require('bcrypt')
// rajouter le put et delete
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// faire le lien entre ta base de donnes et tes requetes
// utuliser req.body etc...
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}))
// utiliser ejs les views
app.set('view engine', 'ejs')
// utuliser le modele
const User = require('./models/User')


// connection base de donnes

const dburl = process.env.DATABASE_URL
mongoose.set('strictQuery', false)

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Mongoose connection established"))
.catch(err => console.log(err))

// definir le port du serveur
const server = app.listen(4500, function() {
    console.log("NodeJS listening on port 4500")
})

// route vers la page de creation de compte
app.post('/api/register', function(req,res) {
    const Data = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        admin : false,
    })
    Data.save().then(()=>{
        console.log('Data saved')
        res.redirect('/login')
    }).catch(err => { console.log(err)});
})
// rediriger vers la pager Register
app.get('/register', function(req,res) {
    res.render('Register');
})

//connexion
app.post('/api/login', function(req,res) {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(!user) {
            return res.status(404).send('Email Invalid !');
        }
        if(!bcrypt.compareSync(req.body.password, user.password))
        {
            return res.status(404).send('Password Invalid!');
        }
        res.redirect('/userpage',);
        // res.redirect('/UserPage');
    }).catch(err => {console.log(err)})
})

app.get('/login', function(req,res){
    res.render('Login');
})

app.get('/userpage', function(req,res){
    res.render('UserPage');
})





