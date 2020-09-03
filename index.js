const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
const User = require('./models/User')

app.use(express.json())

const viewPath = path.join(__dirname, "./views");

//View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("views", viewPath);
app.use(express.static("public"))

app.use(express.urlencoded({ extended:false }));
app.use(cookieParser())


const creativeExpDB = "mongodb+srv://Abhinav123:Abhinav123@participant-data-ce.2z40r.mongodb.net/Participants?retryWrites=true&w=majority";


app.get('/', (req, res) => {
    res.render('landing');
})
app.get('/CERegCount', async (req, res) => {
    mongoose.connect(creativeExpDB,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=> {
        console.log("MONGO DB CONNECTED!")
    }).catch((e)=>console.log("Cannot Connect to Mongo",e));

    // const count = await User.find({}).sort('-date');
    const count = await User.find({}).count();
    const latestRegs = await User.find({}).sort('-date').limit(10);
    res.render('data', {count, latestRegs, eName: "Creative Expression", eWeb: "https://creative-expression.herokuapp.com"});
})

app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}.`);
})