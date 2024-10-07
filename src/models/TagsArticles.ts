import db from "../db";
const TagsArticles = db?.define(
    "tags_articles",
    {},
    {
      tableName: "tags_articles",
      timestamps: false,
    }
  );


export default TagsArticles;
