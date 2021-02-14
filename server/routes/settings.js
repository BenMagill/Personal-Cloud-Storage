const express = require("express")
const SettingsEndpoints = require("../endpoints/settings")
const multer = require("multer")
const checkAuth = require("../checkAuth")

const router = express.Router()

router.get("/", checkAuth, SettingsEndpoints.get)

router.post("/reset", checkAuth, SettingsEndpoints.reset)

router.post("/import", multer({ dest: 'temp/' }).single('file'), checkAuth, SettingsEndpoints.import)

router.post("/update", checkAuth, SettingsEndpoints.update)

module.exports = router