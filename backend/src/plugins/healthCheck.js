module.exports = function (fastify, options, done) {
  fastify.get('/healthCheck', (req, res) => {
    res.send({ message: 'all is well!' })
  })
  done()
}
