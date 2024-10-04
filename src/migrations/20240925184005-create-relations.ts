"use strict";

import sequelize from "sequelize";
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("articles", "author_id", {
        type: sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },

        onDelete: "CASCADE",
      });

      await queryInterface.createTable("tags_articles", {
        article_id: {
          type: sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "articles",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        tag_id: {
          type: sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "tags",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      });

      await queryInterface.addConstraint("tags_articles", {
        fields: ["article_id", "tag_id"],
        type: "unique",
        name: "unique_article_tag",
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("articles", "author_id");
      await queryInterface.dropTable("tags_articles");

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    await queryInterface.dropTable("relations");
  },
};
