import { Sequelize } from "sequelize";
import configs from "./configs";

const db = new Sequelize( configs.db.uri! , {
  logging: configs.isProduction ? false : console.log,
});



export default db