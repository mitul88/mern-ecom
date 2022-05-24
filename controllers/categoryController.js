const _ = require('lodash');
const {Category, validate} = require('../models/category');

module.exports.createCategory = async (req, res) => {
    const {error} = validate(_.pick(req.body, ["name"]));

    if(error) return res.status(400).send(error.details[0].message);

    const category = new Category(_.pick(req.body, ["name"]));
    const result = await category.save();
    return res.status(201).send({
        message: "Category created successfully!",
        data: {
            name: result.name
        }
    })
}

module.exports.getCategories = async (req, res) => {

}