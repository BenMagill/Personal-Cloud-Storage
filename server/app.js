const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookies = require("cookie-parser")
const path = require("path")

const UserRoutes = require("./routes/user")
const FileRoutes = require("./routes/files")

const app = express()

app.use(morgan("common")) // Logs all incoming requests
app.use(bodyParser.urlencoded({extended: false})) // Parses the url
app.use(bodyParser.json()) // Parse json
app.use(cookies()) // use cookies for storing auth

// This shares the static files 
app.use(express.static(path.resolve(__dirname, "../client/build"))) // Provides compiled react at root

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods", 
            "PUT, POST, PATCH, DELETE, GET"
        )
        return res.status(200).json({});
    }
    next();
});

// Handles the api routes used
app.use("/api/user", UserRoutes)
app.use("/api/files", FileRoutes)

// If the uri is not in the build files or api routes just send the react file
// This is useful when haveing "single page" apps where the client handles pages
app.use("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

// This only executes if no endpoint was accessed
// Tbh i think its useless with react as that will handle 404s but we'll see i guess
app.use((error, req, res, next) => {
    res.status(error.status || 500) //  either specified error message or default 500
    console.log(error)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app