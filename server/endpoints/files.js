var AWS = require('aws-sdk')
var fs = require("fs")
var path = require("path")
var s3Zip = require("s3-zip")
// var S3Zipper = require("aws-s3-zipper")

var ep = new AWS.Endpoint('s3.us-west-000.backblazeb2.com')
var s3 = new AWS.S3({endpoint: ep})
const Bucket = process.env.DB_BUCKET

const hiddenFiles = [".preferences"]
// var zipper = new S3Zipper({
//     endpoint: "s3.us-west-000.backblazeb2.com",
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: "us-west-000",
//     bucket: process.env.DB_BUCKET
// })

const filterFiles = (files) => {
    return files.filter(file => {
        return !hiddenFiles.includes(file.Key)
    })
}

exports.all = (req, res, next) => {
    // Get all objects (files) from the bucket
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        } else {
            filterFiles(data.Contents)
            res.status(200).json({data: {...data, Contents: filterFiles(data.Contents)}})
        }
    })
}

exports.read = (req, res, next) => {
    // Needs to be decoded so that can use paths including folders
    var objectTag = decodeURIComponent(req.params.id)
    var params = {Bucket: process.env.DB_BUCKET, Key: objectTag}
    s3.getObject(params)
    .createReadStream()
    .on('error', (error) => {
        res.status(500).json({error})
    })
    .pipe(res)
    .on('data', (data) => {
        // Supposedly does nothing.
        console.log(data)
    })
}

exports.readFolder = (req, res, next) => {
    res.set("content-type", "application/zip")
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, (err, files1) => {
        console.log(files1)
        var files2 = []
        var filesArch = []
        for (let i = 0; i < files1.Contents.length; i++) {
            const element = files1.Contents[i];
            // console.log(element)
            if (element.Key.startsWith(decodeURIComponent(req.params.id))) {
                files2.push(element.Key.replace(req.params.id, ""))
                filesArch.push({name: "/"+element.Key.replace(req.params.id,"")})
            }
        }
        console.log({files2, filesArch})
        s3Zip
            .archive({ s3: s3, bucket: process.env.DB_BUCKET , debug: true}, req.params.id, files2, filesArch)
            .pipe(res)

    })
    // res.json({"message":req.params.id.split("/")})
}

exports.write = (req, res, next) => {
    var folderPath = req.body.path
    if (hiddenFiles.includes(req.file.originalname)) return res.status(500).json({success: false, message: "Can't overwrite application files"})
    var params = {Bucket: process.env.DB_BUCKET, Body: fs.createReadStream(req.file.path), Key: req.body.path+req.file.originalname}
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        if (data) {
            fs.unlinkSync(req.file.path)
            console.log(data)
            res.status(200).json({message: "worked"})
        }
    })
}
const rename = async (oldName, newName, cb) => {
    const params = {Bucket: process.env.DB_BUCKET, CopySource: process.env.DB_BUCKET+"/"+oldName, Key: newName}
    s3.copyObject(params, (err, data) => {
        if (err) {
            console.log(err)
            if (cb) cb(false)
            // res.json({success: false})
        }
        s3.deleteObject({Bucket: process.env.DB_BUCKET, Key: oldName}, (err, data) => {
            if (err) {
                console.log(err)
                // res.json({success: false})
            }
            if (cb) cb(true)
            // res.json({success: true})
        })
    })
}
exports.rename = (req, res, next) => {    
    var oldName = req.body.oldName
    var newName = req.body.newName
    if (hiddenFiles.includes(newName) || hiddenFiles.includes(oldName)) return res.status(500).json({success: false, message: "Can't change name to or from application files"})
    rename(oldName, newName, success => {
        if (success) res.json({success: true})
        else res.json({success: false})
    })
}

exports.renameFolder = (req, res, next) => {
    var {oldName, newName} = req.body
    console.log({oldName, newName})
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, async (err, files) => {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        } else {
            for (let i = 0; i < files.Contents.length; i++) {
                const file = files.Contents[i];
                if (file.Key.startsWith(oldName)) {
                    const oldKey = file.Key
                    const newKey = newName + file.Key.replace(oldName, "")
                    await rename(oldKey, newKey)
                    console.log("renamed")
                }
            }
            console.log("done")
            res.json({success:true})   
        }
    })
}

exports.deleteFile = (req, res, next) => {
    var name = req.body.name
    if (hiddenFiles.includes(name)) return res.status(500).json({message: "Can't delete application files"})
    s3.deleteObject({Bucket:process.env.DB_BUCKET, Key: name}, (err, data) => {
        if (err) {
            console.log(err)
            res.json({success: false})
        }
        res.json({success: true})
    })
}

exports.deleteFolder = (req, res, next) => {
    var path = req.body.path+"/"
    console.log(path)
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, (err, files) => {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        }
        for (let i = 0; i < files.Contents.length; i++) {
            const file = files.Contents[i];
            if (file.Key.startsWith(path)) {
                console.log(file)
                s3.deleteObject({Bucket:process.env.DB_BUCKET, Key: file.Key}, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.json({success: false})
                    }
                })
            }
        }
        res.status(200).json({success: true})
    })
}

exports.createFolder = (req, res, next) => {
    var folderPath = req.body.path
    var params = {Bucket: process.env.DB_BUCKET, Body: "", Key: req.body.path+"/.hidden"}
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        if (data) {
            res.status(200).json({message: "worked"})
        }
    })
}

exports.recent = (req, res, next) => {
    // Get all objects (files) from the bucket
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        } else {
            // console.log(data.Contents)
            res.status(200).json(filterFiles(data.Contents).sort((curr,  next) => {
                if (curr.LastModified < next.LastModified) {
                    return -1
                } else if (curr.LastModified > next.LastModified) {
                    return 1
                } else {
                    return 0
                }
            }).reverse().slice(0, 5))
        }
    })
}

exports.search = (req, res, next) => {
    var searchTerm = req.query.searchTerm
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        } else {
            // console.log(data.Contents)
            res.status(200).json(filterFiles(data.Contents).filter(item => {
                const split = item.Key.split("/")
                const fileName = split[split.length-1]
                return fileName.includes(searchTerm)
            }))
        }
    })
}