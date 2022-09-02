const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

const csrf = require("csurf");

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// csrf
app.use(csrf());

app.use(function (err, req, res, next) {
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash('error_messages', 'The form has expired. Please try again');
        res.redirect('back');
    } else {
        next()
    }
});

app.use(function(req,res,next){
    res.locals.csrfToken = req.csrfToken;
    next();
})



// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
    express.urlencoded({
        extended: false
    })
);


// import routes
const landingRoutes = require('./routes/landing');
const modelKitRoutes = require('./routes/model-kit');
const cloudinaryRoutes = require('./routes/cloudinary');

async function main() {
    app.use("/", landingRoutes);
    app.use("/model-kit", modelKitRoutes);
    app.use("/cloudinary",cloudinaryRoutes);
}

main();

app.listen(3000, () => {
    console.log("Server has started");
});