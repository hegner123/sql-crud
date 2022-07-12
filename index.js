import "dotenv/config";
import * as url from "url";
import { Note } from "./db/index.js";
import Fastify from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import fastifyForm from "@fastify/formbody";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const fastify = Fastify({
  logger: false,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(fastifyForm);

fastify.get("/", async function (request, reply) {
  return reply.sendFile("index.html");
});

fastify.get("/:file", async function (request, reply) {
  return reply.sendFile(`${request.params.file}`);
});

fastify.get("/api", async function (request, reply) {
  const notes = await Note.findAll();
  reply.send({ notes: notes });
});

fastify.get("/api/post", async function (request, reply) {
  reply.redirect("/");
});
fastify.post("/api/post", async function (request, reply) {
  const testNote = await Note.create({ body: request.body["post-body"] });
  reply.send(testNote);
});

fastify.put("/api/:id", async function (request, reply) {
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
});

fastify.delete("/api/:id", async function (request, reply) {
  const deleteId = request.params.id;
  const deleteNote = await Note.destroy({
    where: {
      id: deleteId,
    },
  });
  reply.send(deleteNote);
});

// Run the server!

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
