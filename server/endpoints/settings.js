var AWS = require('aws-sdk')
var fs = require("fs")
var path = require("path")
var s3Zip = require("s3-zip")
// var S3Zipper = require("aws-s3-zipper")

var ep = new AWS.Endpoint('s3.us-west-000.backblazeb2.com')
var s3 = new AWS.S3({endpoint: ep})
const Bucket = process.env.DB_BUCKET

const defaultPrefs = {
    changeFileExtension: false,

}

const saveSettings = (data, cb) => {
    s3.upload({Bucket: process.env.DB_BUCKET, Body: JSON.stringify(data), Key: ".preferences"}, cb)
}

const getSettings = (cb => {
    var params = {Bucket: process.env.DB_BUCKET, Key: ".preferences"}
    s3.getObject(params, (err, data) => {
        if (data) {
            try {
                var parsed = JSON.parse(data.Body.toString("utf-8"))
                cb(null, parsed)
            } catch (error) {
                cb(true, defaultPrefs)
            }
        } else {
            saveSettings(defaultPrefs, (err, data) => {
                if (err) {
                    cb(true, defaultPrefs)
                }
                if (data) {
                    cb(null, defaultPrefs)
                }
            })
        }
    })
})

exports.get = (req, res, next) => {
    getSettings((err, data) => {
        if (err) return res.status(500).json({success: false, message: "Error getting preferences. Using defaults", settings: defaultPrefs})
        return res.status(200).json({success: true, settings: data})
    })
    // var params = {Bucket: process.env.DB_BUCKET, Key: ".preferences"}
    // s3.headObject(params, (err, data) => {
    //     if (data) {
    //         s3.getObject(params, (err, data) => {
    //             var settings
    //             try {
    //                 console.log(data)
    //                 settings = JSON.parse(data.Body.toString("utf-8"))
    //                 return res.status(200).json({success: true, settings})
    //             } catch (error) {
    //                 console.log(error)
    //                 return res.status(500).json({success: false, message: "Broken settings file"})
    //             }
    //         })
    //     } else {
    //         // Create settings file with defaults
    //         saveSettings(defaultPrefs, (err, data) => {
    //             if (err) {
    //                 console.log(err)
    //                 res.status(500).json({success: false, error: err})
    //             }
    //             if (data) {
    //                 console.log(data)
    //                 res.status(200).json({success: true, settings: defaultPrefs})
    //             }
    //         })
    //     }
    // })
}

exports.reset = (req, res, next) => {
    // Change pref file to the default settings 
    saveSettings(defaultPrefs, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({success: false, error: err})
        }
        if (data) {
            console.log(data)
            res.status(200).json({success: true, settings: defaultPrefs})
        }
    })
}

exports.import = (req, res, next) => {
    // Get file thats passed in
    // With default settings overwrite them where imported setting exists and write
    const file = fs.readFileSync(req.file.path)
    try {
        const json = JSON.parse(file)
        const settings = defaultPrefs
        for (const key in json) {
            if (Object.hasOwnProperty.call(json, key)) {
                const setting = json[key];
                if (Object.hasOwnProperty.call(defaultPrefs, key)) {
                    if (setting !== undefined) {
                        settings[key] = setting
                    }
                }
            }
        }
        console.log(settings)

        saveSettings(settings, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({success: false, error: err})
            }
            if (data) {
                console.log(data)
                res.status(200).json({success: true})
            }
        })
        // TODO finish
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "File can't be parsed"})
    }
    
}

exports.update = (req, res, next) => {
    const toUpdate = req.body
    console.log("gettings")
    getSettings((err, settings) => {
        console.log("got")
        if (settings) {
            for (const key in toUpdate) {
                if (Object.hasOwnProperty.call(toUpdate, key)) {
                    const setting = toUpdate[key];
                    if (Object.hasOwnProperty.call(settings, key)) {
                        settings[key] = setting
                    }
                }
            }
            console.log("saving")
            saveSettings(settings, (err, data) => {
                console.log("saved")
                if (err) {
                    console.log(err)
                    res.status(500).json({success: false, error: err})
                }
                if (data) {
                    console.log(data)
                    res.status(200).json({success: true})
                }
            })
        } else {
            res.status(500).json({message: "File can't be parsed. Can't update"})
        }
    })
}