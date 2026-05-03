// const express = require('express');
// const path = require('path');

// var userRoute = require("./routes/user");
// var adminRoute = require("./routes/admin");

// var fileUpload = require("express-fileupload");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // file upload
// app.use(fileUpload());

// // view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // static (VERY IMPORTANT)
// app.use(express.static(path.join(__dirname, 'public')));

// // routes
// app.use("/", userRoute);
// app.use("/admin", adminRoute);

// // server
// app.listen(1000, () => {
//     console.log("Server running on port 1000");
// });


const express = require('express');
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');
require("dotenv").config();

var userRoute = require("./routes/user");
var adminRoute = require("./routes/admin");

const app = express();

// ✅ SESSION
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use("/", userRoute);
app.use("/admin", adminRoute);

// ✅ FIXED PORT
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});