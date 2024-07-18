const schema = {
  type: 'object',
  required: ['AUTH_SECRET', 'PORT'],
  properties: {
    AUTH_SECRET: {
      type: 'string'
    },
    PORT: {
      type: 'number'
    }
  }
}

module.exports.options = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
  data: process.env
}
