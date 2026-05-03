// var express = require("express");
// var route = express.Router();

// var exe = require("../conn");  

// // GET
// route.get("/", async function (req, res) {

//     var sql = `SELECT * FROM hero_section`;
//     var data = await exe(sql);

//     var obj = { hero_data: data };   // correct object

//     res.render("user/index.ejs", obj);   // data pass kelay
// });

// module.exports = route;


var express = require("express");
var route = express.Router();
var exe = require("../conn");


// ================= HOME PAGE =================
route.get("/", async function (req, res) {

    var hero = await exe("SELECT * FROM hero_section ORDER BY id DESC LIMIT 1");
    var about = await exe("SELECT * FROM about_section");
    var skills = await exe("SELECT * FROM skills_section");
    var education = await exe("SELECT * FROM education_section");
    var projects = await exe("SELECT * FROM project_section");

    // ✅ only admin contact (address असलेला)
    var contact = await exe("SELECT * FROM contact_section WHERE address IS NOT NULL LIMIT 1");

    res.render("user/index.ejs", {
        hero_data: hero,
        about_data: about,
        skills_data: skills,
        education_data: education,
        projects: projects,
        contact_data: contact
    });
});


// ================= SAVE CONTACT MESSAGE =================
route.post("/save_contact_message", async function(req, res){

    var d = req.body;

    var sql = `
        INSERT INTO contact_section (name, email, address, message)
        VALUES (?, ?, ?, ?)
    `;

    await exe(sql, [
        d.name,
        d.email,
        null,        // user address नाही
        d.message
    ]);

    res.redirect("/");
});


module.exports = route;