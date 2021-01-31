import Category from "../models/category.js";
import slugify from "slugify";

function createCategoryList(categories, parentId = null) {
  const categoryList = [];
  let currentCategories;
  if (parentId == null) {
    currentCategories = categories.filter(
      (category) => category.parentId == undefined
    );
  } else {
    currentCategories = categories.filter(
      (category) => category.parentId == parentId
    );
  }

  for (let category of currentCategories) {
    categoryList.push({
      _id: category._id,
      name: category.name,
      slug: category.slug,
      children: createCategoryList(categories, category._id),
    });
  }
  return categoryList;
}

export function createCategoryController(req, res) {
  const newCategory = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    newCategory.parentId = req.body.parentId;
  }

  const categoryObject = new Category(newCategory);
  categoryObject
    .save()
    .then((category) => res.status(201).json(category))
    .catch((error) => res.status(400).json(error));
}

export function getCategoryController(req, res) {
  Category.find()
    .then((categories) => createCategoryList(categories))
    .then((categoryList) => res.status(200).json(categoryList))
    .catch((error) => res.status(500).json(error));
}
