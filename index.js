import "dotenv/config";
import * as url from "url";
import { Note } from "./db/index.js";
import Fastify from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import fastifyForm from "@fastify/formbody";
import fastifyCors from "@fastify/cors";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const fastify = Fastify({
  logger: false,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "my-app/dist"),
  prefix: "/dist/",
});

fastify.register(fastifyForm);
fastify.register(fastifyCors);

fastify.get("/", async function (request, reply) {
  console.log("get /api");
  reply.send({ body: "/api" });
});
fastify.get("/api", async function (request, reply) {
  try {
    const notes = await Note.findAll();
    reply.send({ notes: notes });
  } catch (error) {
    const errorString = JSON.stringify(error);
    reply.send({ error: errorString });
  }
});

fastify.post("/api/post", async function (request, reply) {
  try {
    const parsedData = JSON.parse(request.body);
    const testNote = await Note.create({ body: parsedData.body });
    reply.send(testNote);
  } catch (error) {
    const errorString = JSON.stringify(error);
    reply.send({ error: errorString });
  }
});

fastify.put("/api/:id", async function (request, reply) {
  try {
    const updateId = request.params.id;
    const updateNote = await Note.update(
      { body: request.body },
      {
        where: {
          id: updateId,
        },
      }
    );
    reply.send(updateNote);
  } catch (error) {
    const errorString = JSON.stringify(error);
    reply.send({ error: errorString });
  }
});

fastify.delete("/api/:id", async function (request, reply) {
  try {
    const deleteId = request.params.id;
    const deleteNote = await Note.destroy({
      where: {
        id: deleteId,
      },
    });
    reply.send(deleteNote);
  } catch (error) {
    const errorString = JSON.stringify(error);
    reply.send({ error: errorString });
  }
});

// Run the server!

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
