// get the client
import { Sequelize, Model, DataTypes } from "sequelize";
const databaseDB = process.env.DB_DATABASE;
const databaseUser = process.env.DB_USER;
const databasePass = process.env.DB_PASSWORD;

const sequelize = new Sequelize(databaseDB, databaseUser, databasePass, {
  host: "localhost",
  dialect: "mysql",
});

export const Note = sequelize.define("Note", {
  body: DataTypes.STRING,
});

await sequelize.sync();

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
