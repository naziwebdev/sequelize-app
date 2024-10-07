import { Sequelize } from "sequelize";
import configs from "./configs";

import User from "./models/User";
import Article from "./models/Article";
import Tag from "./models/Tag";
import TagsArticles from "./models/TagsArticles";


const db: Sequelize = new Sequelize(configs.db.uri!, {
  logging: configs.isProduction ? false : console.log,
});


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
