import { Sequelize } from "sequelize";
import configs from "./configs";

const db: Sequelize = new Sequelize(configs.db.uri! , {
    logging:false
});

export default db;
