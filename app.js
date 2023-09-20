const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern1', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    mobile: String,
    address: String
});

const Registration = mongoose.model('Registration',{
    user: String,
    mobile: String,
    trainers: String,
    package: String
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/css'))
app.use('/cse', express.static('cse'))
app.use('/images', express.static('images'))
app.use(express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/service', (req, res) => {
    res.render('service');
});
app.get('/trainers', (req, res) => {
    res.render('trainers');
});
app.get('/price', (req, res) => {
    res.render('price');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/schedule', (req, res) => {
    res.render('schedule');
});
app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});
// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'animate.html'));
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.render('home');
            console.log("hllo");
        }
        else {
            res.send('Invalid credentials.');
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

app.post('/signup', async (req, res) => {
    const { username, password, email, mobile, address} = req.body;
    const newUser = new User({ username, password, email, mobile, address });
    try {
        await newUser.save();
        console.log("hllo");
        
        res.render('home');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

app.post('/register', async (req, res)=>{
    const {user, mobile, trainers, package} = req.body;
    const newRegister = new Registration({ user, mobile, trainers, package});
    try{
        await newRegister.save();
        console.log("saved");
        res.render('thankyou');
    }
    catch(error) {
        res.status(500).send('Error: ' + error.message);
    }
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// $(document).ready(function () {
//     $(".ham-burger, .nav ul li a").click(function () {
//         $(".nav").toggleClass("open");
//         $(".ham-burger").toggleClass("active");
//     });

//     $(".accordian-container").click(function () {
//         $(".accordian-container").children(".body").slideUp();
//         $(".accordian-container").removeClass("active");
//         $(".accordian-container").children(".head").children("span").removeClass("fa-angle-down").addClass("fa-angle-up");
//         $(this).children(".body").slideDown();
//         $(this).addClass("active");
//         $(this).children(".head").children("span").removeClass("fa-angle-up").addClass("fa-angle-down");
//     });

//     $(".nav ul li a, .go-down").click(function (event) {
//         if (this.hash !== "") {
//             event.preventDefault();
//             var hash = this.hash;

//             $('html,body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 800, function () {
//                 window.location.hash = hash;
//             });

//             // add active class in navigation
//             $(".nav ul li a").removeClass("active");
//             $(this).addClass("active");
//         }
//     });
// });

// wow = new WOW(
//     {
//         animateClass: 'animated',
//         offset: 0,
//     }
// );
// wow.init();

