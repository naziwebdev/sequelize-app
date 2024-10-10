const {DataTypes} = require('sequelize')


const Tag = (sequelize) =>
  sequelize.define(
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



module.exports = Tag
