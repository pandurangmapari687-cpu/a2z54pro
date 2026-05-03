// var mysql = require("mysql2");
// var util = require("util");

// var conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "a2z54project"
// });

// var exe = util.promisify(conn.query).bind(conn);

// module.exports = exe;


var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createConnection({
    host: "b5y9on4sb3kkjb3whcbh-mysql.services.clever-cloud.com",
    user: "uvtdhiqhdp1kmayj",
    password: "nRVnKtUx8zH0OWMnyKA4",   // ✅ इथे actual password टाक
    database: "b5y9on4sb3kkjb3whcbh",
    port: 3306,
    ssl: {
        rejectUnauthorized: false   // ✅ Clever Cloud साठी important
    }
});

// optional but helpful
conn.connect(function(err){
    if(err){
        console.log("❌ DB Error:", err);
    } else {
        console.log("✅ DB Connected");
    }
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;

