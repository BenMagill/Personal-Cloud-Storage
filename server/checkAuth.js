const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const tokenIn = req.cookies.Auth
    if (!tokenIn) {
        return res.status(401).json({
            success: false,
            message: "AUTH_FAILED"
        })
    }
    try {
        const decoded = jwt.verify(tokenIn, process.env.JWT_KEY)
        const key = process.env.CURRENTKEY
        if (decoded.key === key) {
            next()
        } else {
            return res.status(401).json({
                success: false,
                message: "AUTH_FAILED"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "AUTH_FAILED"
        })
    }
}