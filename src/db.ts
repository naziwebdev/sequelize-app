import { Sequelize } from "sequelize";
import configs from "./configs";

const db: Sequelize = new Sequelize(configs.db.uri!);

export default db;
