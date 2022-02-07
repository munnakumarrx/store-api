const notFound = (req, res) => res.status(404).send("<h1>Routes Doesn't Exist</h1>")

module.exports = notFound