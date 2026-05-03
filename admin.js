// var express = require("express");
// var route = express.Router();
// var path = require("path");
// var exe = require("../conn");

// // admin page
// route.get("/", function (req, res) {
//     res.render("admin/index.ejs");
// });

// route.get("/Hero_section",function(req,res){
//     res.render("admin/Hero_section.ejs");
// })
// // save hero
// route.post("/save_hero_section", async function (req, res) {

//     var d = req.body;

//     if (!req.files || !req.files.hero_image) {
//         return res.send("No file uploaded");
//     }

//     var file = req.files.hero_image;
//     var img = Date.now() + "_" + file.name;

//     var uploadPath = path.join(__dirname, "../public/uploads/", img);

//     file.mv(uploadPath, async function (err) {
//         if (err) return res.send(err);

//         var sql = "INSERT INTO hero_section (hero_image, fullname, position, details) VALUES (?, ?, ?, ?)";
//         await exe(sql, [img, d.fullname, d.position, d.details]);

//         res.redirect("/admin");
//     });

// });

// var express = require("express");
// var route = express.Router();
// var exe = require("../conn");


// // ================= HOME =================
// route.get("/", function (req, res) {
//     res.render("admin/index.ejs");
// });


// // ================= HERO PAGE =================
// route.get("/Hero_Section", async function (req, res) {

//     var sql = "SELECT * FROM hero_section ORDER BY id DESC";
//     var data = await exe(sql);

//     res.render("admin/Hero_Section.ejs", { hero_data: data });
// });


// // ================= INSERT =================
// route.post("/save_hero_section", async function (req, res) {

//     var d = req.body;

//     let img = null;

//     if (req.files && req.files.hero_image) {
//         img = Date.now() + "_" + req.files.hero_image.name;
//         req.files.hero_image.mv("public/" + img);
//     }

//     var sql = `
//         INSERT INTO hero_section 
//         (hero_image, fullname, position, tagline, subtitle, details)
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     await exe(sql, [
//         img,
//         d.fullname,
//         d.position,
//         d.tagline,
//         d.subtitle,
//         d.details
//     ]);

//     res.redirect("/admin/Hero_Section");
// });


// // ================= UPDATE =================
// route.post("/update_hero_section", async function (req, res) {

//     var d = req.body;

//     let img = null;

//     if (req.files && req.files.hero_image) {
//         img = Date.now() + "_" + req.files.hero_image.name;
//         req.files.hero_image.mv("public/" + img);
//     }

//     if (img) {

//         var sql = `
//             UPDATE hero_section 
//             SET hero_image=?, fullname=?, position=?, tagline=?, subtitle=?, details=? 
//             WHERE id=?
//         `;

//         await exe(sql, [
//             img,
//             d.fullname,
//             d.position,
//             d.tagline,
//             d.subtitle,
//             d.details,
//             d.id
//         ]);

//     } else {

//         var sql = `
//             UPDATE hero_section 
//             SET fullname=?, position=?, tagline=?, subtitle=?, details=? 
//             WHERE id=?
//         `;

//         await exe(sql, [
//             d.fullname,
//             d.position,
//             d.tagline,
//             d.subtitle,
//             d.details,
//             d.id
//         ]);
//     }

//     res.redirect("/admin/Hero_Section");
// });


// // ================= DELETE =================
// route.get("/delete_hero/:id", async function (req, res) {

//     var id = req.params.id;

//     var sql = "DELETE FROM hero_section WHERE id=?";
//     await exe(sql, [id]);

//     res.redirect("/admin/Hero_Section");
// });


// // GET
// route.get("/about", async function (req, res) {
//   var sql = "SELECT * FROM about_section";
//   var data = await exe(sql);

//   res.render("admin/about.ejs", { about_data: data });
// });

// // SAVE (INSERT + UPDATE)
// route.post("/save_about", async function (req, res) {

//   var d = req.body;

//   if (d.id) {
//     var sql = `UPDATE about_section 
//       SET name=?, description1=?, description2=?, quote=?, hobby=?, exp=?, projects=?, students=?, countries=? 
//       WHERE id=?`;

//     await exe(sql, [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries, d.id]);
//   } else {
//     var sql = `INSERT INTO about_section 
//       (name, description1, description2, quote, hobby, exp, projects, students, countries) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     await exe(sql, [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries]);
//   }

//   res.redirect("/admin/about");
// });

// // Show form


// route.get("/skill", async function(req, res){

//     var sql = "SELECT * FROM skills_section ORDER BY id DESC LIMIT 1";
//     var skills = await exe(sql);

//     res.render("admin/skill.ejs", {
//         skills_data: skills   // ✅ IMPORTANT
//     });
// });



// route.post("/save_skills", async function(req, res){

//     var d = req.body;

//     var sql = `INSERT INTO skills_section (skills)
//                VALUES ('${d.skills}')`;

//     await exe(sql);

//     res.redirect("/admin/skill");
// });



// // Show form
// route.get("/education", function(req, res){
//     res.render("admin/education.ejs");
// });

// // Save data
// route.post("/save_education", async function(req, res){

//     var d = req.body;

//     var sql = `INSERT INTO education_section 
//     (title, college, year, description)
//     VALUES (
//       '${d.title}',
//       '${d.college}',
//       '${d.year}',
//       '${d.description}'
//     )`;

//     await exe(sql);

//     res.redirect("/admin/education");
// });
// route.get("/project", function(req, res){
//     res.render("admin/project.ejs");   // ✅ correct path
// });





// route.post("/save_project", async function(req, res){

//     var d = req.body;
//     var filename = "";

//     if(req.files && req.files.image){

//         var file = req.files.image;

//         filename = Date.now() + "-" + file.name;

//         // ✅ direct public मध्ये save
//         await file.mv("public/" + filename);
//     }

//     var sql = `INSERT INTO project_section 
//     (title, tag, description, image, link)
//     VALUES (
//       '${d.title}',
//       '${d.tag}',
//       '${d.description}',
//       '${filename}',
//       '${d.link}'
//     )`;

//     await exe(sql);

//     res.redirect("/admin/project");
// });









// module.exports = route;





// var express = require("express");
// var route = express.Router();
// var exe = require("../conn");

// route.get("/", async function(req, res){

//     try {
//         var about = await exe("SELECT COUNT(*) as total FROM about_section");
//         var skills = await exe("SELECT COUNT(*) as total FROM skills_section");
//         var edu = await exe("SELECT COUNT(*) as total FROM education_section");
//         var project = await exe("SELECT COUNT(*) as total FROM project_section");

//         res.render("admin/index.ejs", {
//             about_count: about?.[0]?.total || 0,
//             skill_count: skills?.[0]?.total || 0,
//             edu_count: edu?.[0]?.total || 0,
//             project_count: project?.[0]?.total || 0
//         });

//     } catch (err) {
//         console.log("Dashboard error:", err);
//         res.send("Dashboard Error");
//     }
// });
// // ================= HOME =================



// // ================= HERO =================
// route.get("/Hero_Section", async function (req, res) {

//     var data = await exe("SELECT * FROM hero_section ORDER BY id DESC");

//     res.render("admin/Hero_Section.ejs", { hero_data: data });
// });


// // ================= SAVE HERO =================
// route.post("/save_hero_section", async function (req, res) {

//     var d = req.body;
//     let img = null;

//     if (req.files && req.files.hero_image) {
//         img = Date.now() + "_" + req.files.hero_image.name;
//         await req.files.hero_image.mv("public/" + img);
//     }

//     var sql = `INSERT INTO hero_section 
//     (hero_image, fullname, position, tagline, subtitle, details)
//     VALUES (?, ?, ?, ?, ?, ?)`;

//     await exe(sql, [img, d.fullname, d.position, d.tagline, d.subtitle, d.details]);

//     res.redirect("/admin/Hero_Section");
// });


// // ================= UPDATE HERO =================
// route.post("/update_hero_section", async function (req, res) {

//     var d = req.body;
//     let img = null;

//     if (req.files && req.files.hero_image) {
//         img = Date.now() + "_" + req.files.hero_image.name;
//         await req.files.hero_image.mv("public/" + img);
//     }

//     if (img) {
//         await exe(
//             `UPDATE hero_section 
//              SET hero_image=?, fullname=?, position=?, tagline=?, subtitle=?, details=? 
//              WHERE id=?`,
//             [img, d.fullname, d.position, d.tagline, d.subtitle, d.details, d.id]
//         );
//     } else {
//         await exe(
//             `UPDATE hero_section 
//              SET fullname=?, position=?, tagline=?, subtitle=?, details=? 
//              WHERE id=?`,
//             [d.fullname, d.position, d.tagline, d.subtitle, d.details, d.id]
//         );
//     }

//     res.redirect("/admin/Hero_Section");
// });


// // ================= DELETE HERO =================
// route.get("/delete_hero/:id", async function (req, res) {

//     await exe("DELETE FROM hero_section WHERE id=?", [req.params.id]);

//     res.redirect("/admin/Hero_Section");
// });


// // ================= ABOUT =================
// route.get("/about", async function (req, res) {

//     var data = await exe("SELECT * FROM about_section");

//     res.render("admin/about.ejs", { about_data: data });
// });


// route.post("/save_about", async function (req, res) {

//     var d = req.body;

//     if (d.id) {
//         await exe(
//             `UPDATE about_section 
//              SET name=?, description1=?, description2=?, quote=?, hobby=?, exp=?, projects=?, students=?, countries=? 
//              WHERE id=?`,
//             [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries, d.id]
//         );
//     } else {
//         await exe(
//             `INSERT INTO about_section 
//              (name, description1, description2, quote, hobby, exp, projects, students, countries) 
//              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries]
//         );
//     }

//     res.redirect("/admin/about");
// });


// // ================= SKILLS =================
// // GET ALL
// route.get("/skill", async function (req, res) {

//     var skills = await exe("SELECT * FROM skills_section ORDER BY id DESC");

//     res.render("admin/skill.ejs", { skills_data: skills });
// });


// // SAVE NEW
// route.post("/save_skills", async function (req, res) {

//     var d = req.body;

//     await exe("INSERT INTO skills_section (skills) VALUES (?)", [d.skills]);

//     res.redirect("/admin/skill");
// });


// // DELETE
// route.get("/delete_skill/:id", async function(req, res){

//     await exe("DELETE FROM skills_section WHERE id=?", [req.params.id]);

//     res.redirect("/admin/skill");
// });


// // EDIT (fetch single)
// route.get("/edit_skill/:id", async function(req, res){

//     var data = await exe("SELECT * FROM skills_section WHERE id=?", [req.params.id]);

//     res.render("admin/skill.ejs", {
//         edit_data: data[0],
//         skills_data: await exe("SELECT * FROM skills_section ORDER BY id DESC")
//     });
// });


// // UPDATE
// route.post("/update_skill", async function(req, res){

//     var d = req.body;

//     await exe(
//         "UPDATE skills_section SET skills=? WHERE id=?",
//         [d.skills, d.id]
//     );

//     res.redirect("/admin/skill");
// });

// // ================= EDUCATION =================

// route.get("/education", async function(req, res){

//     var data = await exe("SELECT * FROM education_section ORDER BY id DESC");

//     res.render("admin/education.ejs", {
//         education_data: data   // ✅ IMPORTANT
//     });
// });
// route.post("/save_education", async function(req, res){

//     var d = req.body;

//     if(d.id){
//         await exe(
//             `UPDATE education_section 
//              SET title=?, college=?, year=?, description=? 
//              WHERE id=?`,
//             [d.title, d.college, d.year, d.description, d.id]
//         );
//     } else {
//         await exe(
//             `INSERT INTO education_section 
//              (title, college, year, description)
//              VALUES (?, ?, ?, ?)`,
//             [d.title, d.college, d.year, d.description]
//         );
//     }

//     res.redirect("/admin/education");
// });


// route.get("/delete_education/:id", async function(req, res){

//     await exe("DELETE FROM education_section WHERE id=?", [req.params.id]);

//     res.redirect("/admin/education");
// });


// // ================= PROJECT =================
// route.get("/project", function (req, res) {
//     res.render("admin/project.ejs");
// });

// route.post("/save_project", async function (req, res) {

//     var d = req.body;
//     var filename = "";

//     if (req.files && req.files.image) {

//         var file = req.files.image;

//         filename = Date.now() + "-" + file.name;

//         // ✅ direct public मध्ये save
//         await file.mv("public/" + filename);
//     }

//     await exe(
//         `INSERT INTO project_section 
//         (title, tag, description, image, link)
//         VALUES (?, ?, ?, ?, ?)`,
//         [d.title, d.tag, d.description, filename, d.link]
//     );

//     res.redirect("/admin/project");
// });







// route.get("/contact", async function(req, res){

//     var info = await exe("SELECT * FROM contact_section WHERE address IS NOT NULL LIMIT 1");

//     var messages = await exe("SELECT * FROM contact_section ORDER BY id DESC");

//     res.render("admin/contact.ejs", {
//         contact_data: info,
//         all_contacts: messages   // ✅ IMPORTANT
//     });
// });

// // SAVE / UPDATE CONTACT
// route.post("/save_contact", async function(req, res){

//     var d = req.body;

//     var check = await exe("SELECT * FROM contact_section WHERE address IS NOT NULL LIMIT 1");

//     if(check.length > 0){

//         var sql = `
//             UPDATE contact_section SET
//             name=?,
//             email=?,
//             address=?
//             WHERE id=?
//         `;

//         await exe(sql, [
//             d.name,
//             d.email,
//             d.address,
//             check[0].id
//         ]);

//     } else {

//         var sql = `
//             INSERT INTO contact_section (name, email, address)
//             VALUES (?, ?, ?)
//         `;

//         await exe(sql, [
//             d.name,
//             d.email,
//             d.address
//         ]);
//     }

//     res.redirect("/admin/contact");
// });


// route.get("/delete_contact/:id", async function(req, res){

//     await exe("DELETE FROM contact_section WHERE id=?", [req.params.id]);

//     res.redirect("/admin/contact");
// });







// route.get("/login", function(req, res){
//     res.render("admin/login.ejs");
// });

// route.post("/login", async function(req, res){

//     console.log(req.body); // 👈 हे बघ

// });

// route.post("/login", async function(req, res){

//     var username = req.body.username.trim();
//     var password = req.body.password.trim();

//     var sql = "SELECT * FROM admin WHERE username=? AND password=?";
//     var data = await exe(sql, [username, password]);

//     console.log(data);

//     if(data.length > 0){
//         res.redirect("/admin");
//     } else {
//         res.send("Invalid username or password");
//     }
// });
// module.exports = route;


var express = require("express");
var route = express.Router();
var exe = require("../conn");

// ✅ LOGIN CHECK
function checkLogin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }
    next();
}

// ================= LOGIN =================
route.get("/login", function (req, res) {
    res.render("admin/login.ejs");
});

route.post("/login", async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var data = await exe("SELECT * FROM admin WHERE username=? AND password=?", [username, password]);

    if (data.length > 0) {
        req.session.admin = data[0];
        res.redirect("/admin");
    } else {
        res.send("Invalid username or password");
    }
});

// ================= LOGOUT =================
route.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/admin/login");
});

// ================= DASHBOARD =================
route.get("/", checkLogin, async function (req, res) {

    var about = await exe("SELECT COUNT(*) as total FROM about_section");
    var skills = await exe("SELECT COUNT(*) as total FROM skills_section");
    var edu = await exe("SELECT COUNT(*) as total FROM education_section");
    var project = await exe("SELECT COUNT(*) as total FROM project_section");

    res.render("admin/index.ejs", {
        about_count: about[0].total,
        skill_count: skills[0].total,
        edu_count: edu[0].total,
        project_count: project[0].total
    });
});

// ================= HERO =================
route.get("/Hero_Section", checkLogin, async function (req, res) {
    var data = await exe("SELECT * FROM hero_section ORDER BY id DESC");
    res.render("admin/Hero_Section.ejs", { hero_data: data });
});

route.post("/save_hero_section", checkLogin, async function (req, res) {
    var d = req.body;
    let img = null;

    if (req.files && req.files.hero_image) {
        img = Date.now() + "_" + req.files.hero_image.name;
        await req.files.hero_image.mv("public/" + img);
    }

    await exe(
        `INSERT INTO hero_section (hero_image, fullname, position, tagline, subtitle, details)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [img, d.fullname, d.position, d.tagline, d.subtitle, d.details]
    );

    res.redirect("/admin/Hero_Section");
});

// ================= ABOUT =================
route.get("/about", checkLogin, async function (req, res) {
    var data = await exe("SELECT * FROM about_section");
    res.render("admin/about.ejs", { about_data: data });
});

route.post("/save_about", checkLogin, async function (req, res) {
    var d = req.body;

    if (d.id) {
        await exe(
            `UPDATE about_section SET name=?, description1=?, description2=?, quote=?, hobby=?, exp=?, projects=?, students=?, countries=? WHERE id=?`,
            [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries, d.id]
        );
    } else {
        await exe(
            `INSERT INTO about_section (name, description1, description2, quote, hobby, exp, projects, students, countries)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [d.name, d.description1, d.description2, d.quote, d.hobby, d.exp, d.projects, d.students, d.countries]
        );
    }

    res.redirect("/admin/about");
});

// ================= SKILLS =================
route.get("/skill", checkLogin, async function (req, res) {
    var skills = await exe("SELECT * FROM skills_section ORDER BY id DESC");
    res.render("admin/skill.ejs", { skills_data: skills });
});

route.post("/save_skills", checkLogin, async function (req, res) {
    await exe("INSERT INTO skills_section (skills) VALUES (?)", [req.body.skills]);
    res.redirect("/admin/skill");
});

route.get("/delete_skill/:id", checkLogin, async function (req, res) {
    await exe("DELETE FROM skills_section WHERE id=?", [req.params.id]);
    res.redirect("/admin/skill");
});

// ================= EDUCATION =================
route.get("/education", checkLogin, async function (req, res) {
    var data = await exe("SELECT * FROM education_section ORDER BY id DESC");
    res.render("admin/education.ejs", { education_data: data });
});

route.post("/save_education", checkLogin, async function (req, res) {
    var d = req.body;

    if (d.id) {
        await exe(
            `UPDATE education_section SET title=?, college=?, year=?, description=? WHERE id=?`,
            [d.title, d.college, d.year, d.description, d.id]
        );
    } else {
        await exe(
            `INSERT INTO education_section (title, college, year, description) VALUES (?, ?, ?, ?)`,
            [d.title, d.college, d.year, d.description]
        );
    }

    res.redirect("/admin/education");
});

// ================= PROJECT =================
route.get("/project", checkLogin, function (req, res) {
    res.render("admin/project.ejs");
});

route.post("/save_project", checkLogin, async function (req, res) {
    var d = req.body;
    var filename = "";

    if (req.files && req.files.image) {
        var file = req.files.image;
        filename = Date.now() + "-" + file.name;
        await file.mv("public/" + filename);
    }

    await exe(
        `INSERT INTO project_section (title, tag, description, image, link)
         VALUES (?, ?, ?, ?, ?)`,
        [d.title, d.tag, d.description, filename, d.link]
    );

    res.redirect("/admin/project");
});

// ================= CONTACT =================
route.get("/contact", checkLogin, async function (req, res) {
    var info = await exe("SELECT * FROM contact_section WHERE address IS NOT NULL LIMIT 1");
    var messages = await exe("SELECT * FROM contact_section ORDER BY id DESC");

    res.render("admin/contact.ejs", {
        contact_data: info,
        all_contacts: messages
    });
});

route.post("/save_contact", checkLogin, async function (req, res) {
    var d = req.body;

    var check = await exe("SELECT * FROM contact_section WHERE address IS NOT NULL LIMIT 1");

    if (check.length > 0) {
        await exe(
            `UPDATE contact_section SET name=?, email=?, address=? WHERE id=?`,
            [d.name, d.email, d.address, check[0].id]
        );
    } else {
        await exe(
            `INSERT INTO contact_section (name, email, address) VALUES (?, ?, ?)`,
            [d.name, d.email, d.address]
        );
    }

    res.redirect("/admin/contact");
});

module.exports = route;