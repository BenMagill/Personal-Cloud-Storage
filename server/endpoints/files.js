var AWS = require('aws-sdk')
var fs = require("fs")

var ep = new AWS.Endpoint('s3.us-west-000.backblazeb2.com')
var s3 = new AWS.S3({endpoint: ep})

exports.all = (req, res, next) => {
    // Get all objects (files) from the bucket
    var params = {Bucket: process.env.DB_BUCKET, MaxKeys: 1000}
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({message: "ERROR"})
        } else {
            console.log(data);
            res.status(200).json({data})
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
    // Old code to be deleted. DOes not work
    // s3.getObject(params, function(err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).json({error: err})
    //     } else {
    //         console.log(data.Body.toString());
    //         data.BodyString = data.Body.toString()
    //         res.attachment('test.pdf')
    //         data.Body.pipe(res)
            
    //         res.status(200).json({data})
    //     }
    // })
    // try {
    //     var fileStream = s3.getObject(params).createReadStream();
    //     res.attachment(objectTag);
    //     fileStream.pipe(res);
    // } catch (error) {
    //     res.status(500).json({error})
    // }

}

exports.write = (req, res, next) => {
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