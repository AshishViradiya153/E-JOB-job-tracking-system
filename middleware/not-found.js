const notFoundMiddleware = (req, res) => res.status(404).send("Router dose not exist")

module.exports = notFoundMiddleware