const { Article, Tag  , User} = require("../db");
const slugify = require("slugify");
const articleSchema = require("../validators/articleSchema");

exports.create = async (req, res, next) => {
  try {
    let { title, content, tags } = req.body;

    await articleSchema.validate(
      { title, content, tags },
      { abortEarly: false }
    );
    let slug = slugify(title, { lower: true });
    const copyOfSlug = slug;
    const authorId = req.user.id;

    tags = Array.isArray(tags) ? tags : [tags];

    tags = tags.map((tag) =>
      Tag.findOrCreate({ where: { title: tag.trim() } })
    );
    tags = await Promise.all(tags);

    let article;
    let i = 1;
    const coverPath = `images/covers/${req.file?.filename}`;

    while (!article) {
      try {
        article = await Article.create({
          title,
          content,
          slug,
          author_id: authorId,
          cover: coverPath,
        });

        await article.addTag(tags.map((tag) => tag[0]));

        return res.status(201).json({
          ...article.dataValues,
          tags: tags.map((tag) => tag[0].title),
        });
      } catch (err) {
        if (err.original.code === "ER_DUP_ENTRY") {
          slug = `${copyOfSlug}-${i++}`;
        } else {
          throw err;
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: Tag,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          attributes: { exclude: ["passpord"] },
          as: "author",
        },
      ],
    order:[['created_at','DESC']]
    });

    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};
