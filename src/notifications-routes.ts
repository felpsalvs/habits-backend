import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey =
  "BD2zEDbRWweZZvbE4Gx91hp451Qb1lV-NdOUbYsU8OfUpfVdyOsRSLtAelPy8r5YP_GUPivuuRdVXqm2ktQy3vg";
const privateKey = "RCESxhkplLvEwIsBYVmSWkXXyr9SLaPOCems6R8yovc";

WebPush.setVapidDetails("http://localhost:3000", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);
    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Hello from the server");
    }, 5000);

    return reply.status(201).send();
  });
}
