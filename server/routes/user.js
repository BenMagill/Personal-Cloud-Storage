const express = require("express")
const UserEndpoints = require("../endpoints/user")

const router = express.Router()

router.post("/login", UserEndpoints.login)

module.exports = router