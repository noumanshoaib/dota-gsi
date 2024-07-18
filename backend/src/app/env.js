const schema = {
  type: 'object',
  required: ['AUTH_TOKEN', 'PORT'],
  properties: {
    AUTH_TOKEN: {
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
