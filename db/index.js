// get the client
import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "sql_crud",
  "sql_crud_u",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

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
