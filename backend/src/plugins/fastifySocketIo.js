// fastifySocketIo.js
const fp = require('fastify-plugin');
const socketIO = require('socket.io');

async function fastifySocketIo(fastify, options) {
    const io = socketIO(fastify.server, options);

    fastify.decorate('io', io);

    fastify.addHook('onClose', (fastifyInstance, done) => {
        io.close();
        done();
    });
}

module.exports = fp(fastifySocketIo);
