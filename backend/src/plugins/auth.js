const fp = require('fastify-plugin');

async function verifyAuthToken(fastify, options) {

    fastify.decorate('authenticate', async function (req, res) {
        if(req.body?.auth?.token !== process.env.AUTH_TOKEN) {
            res.status(401).send({message: "Token not valid"})
        }
    });
}

module.exports = fp(verifyAuthToken);
