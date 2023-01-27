import { FastifyInstance } from "fastify";
import WebPush from "web-push";

const publicKey = 'BD2zEDbRWweZZvbE4Gx91hp451Qb1lV-NdOUbYsU8OfUpfVdyOsRSLtAelPy8r5YP_GUPivuuRdVXqm2ktQy3vg'
const privateKey = 'RCESxhkplLvEwIsBYVmSWkXXyr9SLaPOCems6R8yovc'

WebPush.setVapidDetails('http://localhost:3000', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
})

  app.post('/push/register', (request, reply) => {
    console.log(request.body)

    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    console.log(request.body)

    return reply.status(201).send()
  })
}