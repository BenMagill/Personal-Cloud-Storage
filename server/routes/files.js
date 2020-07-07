const express = require("express")
const FileEndpoints = require("../endpoints/files")
const multer = require("multer")
const checkAuth = require("../checkAuth")

const router = express.Router()

router.get("/all", checkAuth, FileEndpoints.all)

router.get("/item/:id", checkAuth, FileEndpoints.read)

router.post("/item/", checkAuth, multer({ dest: 'temp/' }).single('file'), FileEndpoints.write)

module.exports = router