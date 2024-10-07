import { Model, Optional, DataTypes } from "sequelize";
import db from "../db";


interface TagAttributes {
  id: number;
  title: string;
  createdAt: Date;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

interface TagInstance
  extends Model<TagAttributes, TagCreationAttributes>,
    TagAttributes {}

const Tag = db?.define<TagInstance>(
    "tag",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );

export default Tag;
