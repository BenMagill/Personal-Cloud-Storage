export default (isoDate) => {
    var date = new Date(isoDate)
    return date.toGMTString()
}