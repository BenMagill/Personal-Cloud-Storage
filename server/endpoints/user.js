// const generateKey = require("../functions/generateKey")
const jwt = require("jsonwebtoken")
const generateKey = require("../generateKey")


exports.login = (req, res, next) => {
    const username = process.env.NAME
    const password = process.env.PASSWORD 

    const inputUsername = req.body.username
    const inputPassword = req.body.password

    if (username === inputUsername && password === inputPassword) {
        const key = generateKey()
        var token = jwt.sign({
                key
            },
            process.env.JWT_KEY,
            {
                expiresIn: "3h"
            }
        )
        process.env.CURRENTKEY = key
        res.cookie("Auth", token, {maxAge: 19000000})
        return res.status(200).json({success: true})
    } else {
        return res.status(401).json({success: false})
    }
}