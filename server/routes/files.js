const express = require("express")
const FileEndpoints = require("../endpoints/files")
const multer = require("multer")
const checkAuth = require("../checkAuth")

const router = express.Router()

router.get("/all", checkAuth, FileEndpoints.all)

router.get("/item/:id", checkAuth, FileEndpoints.read)

router.get("/folder/:id", checkAuth, FileEndpoints.readFolder)

router.post("/item/", checkAuth, multer({ dest: 'temp/' }).single('file'), FileEndpoints.write)

router.post("/item/rename", checkAuth, FileEndpoints.rename)

router.post("/item/delete", checkAuth, FileEndpoints.deleteFile)

router.post("/folder/new", checkAuth, FileEndpoints.createFolder)

router.post("/folder/delete", checkAuth, FileEndpoints.deleteFolder)

module.exports = router