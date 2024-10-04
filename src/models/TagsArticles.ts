import { Sequelize } from "sequelize";

const TagsArticles = (sequelize:Sequelize) => {
  sequelize.define(
    "tags_articles",
    {},
    {
      tableName: "tags_articles",
      timestamps: false,
    }
  );
};

export default TagsArticles;
