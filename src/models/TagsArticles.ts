import db from "../db";

const TagsArticles = () => {
  db.define(
    "tags_article",
    {},
    {
      tableName: "tags_articles",
      timestamps: false,
    }
  );
};

export default TagsArticles;
