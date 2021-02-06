export default (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0)  return "0 Bytes"
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)))
    return Math.round(bytes / Math.pow(1000, i), 2) + ' ' + sizes[i]
}