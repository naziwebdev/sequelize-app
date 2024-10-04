import { DataTypes, Optional, Model } from "sequelize";
import { Sequelize } from "sequelize";

// in models dont put columns that have relation(author_id)

interface ArticleAttributes {
  id: number;
  title: string;
  content: string;
  slug: string;
  cover: string;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, "id"> {}

interface ArticleInstance
  extends Model<ArticleAttributes, ArticleCreationAttributes>,
    ArticleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Article = (sequelize:Sequelize) => {
  sequelize.define<ArticleInstance>(
    "article",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "articles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};


export default Article;
