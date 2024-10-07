import User from "./models/User";
import Tag from "./models/Tag";
import Article from "./models/Article";
import TagsArticles from "./models/TagsArticles";

//one-to-many
User?.hasMany(Article, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
  
  Article?.belongsTo(User, {
    foreignKey: "author_id",
    as: "author",
  });
  
  //many-to-many
  Article?.belongsToMany(Tag, {
    through: TagsArticles,
    foreignKey: "article_id",
    onDelete: "CASCADE",
  });
  
  Tag?.belongsToMany(Article, {
    through: TagsArticles,
    foreignKey: "tag_id",
    onDelete: "CASCADE",
  });

export { User, Tag, Article, TagsArticles };