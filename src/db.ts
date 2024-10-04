import { Sequelize } from "sequelize";
import configs from "./configs";

const db = new Sequelize(configs.db.uri!, {
  logging: configs.isProduction ? false : console.log,
});

//* JsDoc
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const User = require("./models/User");
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Tag = require("./models/Tag");
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const TagsArticles = require("./models/TagsArticles");
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Article = require("./models/Articles");

//one-to-many
User.hasMany(Article, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

Article.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

//many-to-many
Article.belongsToMany(Tag, {
  through: TagsArticles,
  foreignKey: "article_id",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Article, {
  through: TagsArticles,
  foreignKey: "tag_id",
  onDelete: "CASCADE",
});

export default db;
export { User, Tag, Article, TagsArticles };
