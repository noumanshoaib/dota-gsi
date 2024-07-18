'use strict'

async function routes (fastify, options) {
  // Add dota routes
  require('./dota')(fastify, options)
}

module.exports = routes
