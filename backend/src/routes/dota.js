'use strict'
const GSIService = require('../services/GSIService')

async function routes (fastify, options) {
  fastify.post('/dota2-gsi', {preValidation: fastify.authenticate} ,async (req, reply) => {

    reply.code(200)

    const output =  await GSIService.ingestGameStats(fastify, req.body)

    return output
  })
}

module.exports = routes
