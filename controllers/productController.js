const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product');
const { query } = require('express');


module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err) return res.status(400).send("There has been an error");
        const {error} = validate(_.pick(fields, ["name", "description", "price", "category", "quantity"]));
        if(error) return res.status(400).send(error.details[0].message);

        const product = new Product(fields);

        if(files.photo) {
            fs.readFile( files.photo.filepath, (err, data) => {
                if(err) return res.status(400).send("Problem with file data !!");
                product.photo.data = data;
                product.photo.contentType = files.photo.mimetype; 
                product.save((err, result)=>{
                    if(err) res.status(500).send("Internal Server Error");
                    else return res.status(201).send({
                        message: "Product created successfully!",
                        data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                    })
                });
            })
        } else {
            return res.status(400).send("No image provided");
        }
    })
}

module.exports.getProducts = async (req, res) => {

    let order = req.query.order === 'desc'? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const products = await Product.find()
        .select({photo: 0, description:0})
        .sort({ [sortBy]: order })
        .limit(limit);
    return res.status(200).send(products);
}

module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
                        .select({ photo: 0 })
                        .populate('category', 'name');
    
    if(!product) return res.status(404).send("Product not found!!");
    return res.status(200).send(product);
}

module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
            .select({ photo: 1, _id: 0 });
    res.set('Content-Type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
}

module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=> {
        if (err) return res.status(400).send("Something Worng!");
        const updatedFields = _.pick(fields, ['name', 'description', 'price', 'category', 'quantity']);
        _.assignIn(product, updatedFields);

        if(files.photo) {
            fs.readFile(files.photo.filepath, (err, data)=> {
                if(err) return res.status(400).send("Something went wrong!");
                product.photo.data = data;
                product.photo.contentType = files.photo.mimetype;
                product.save((err, result) => {
                    if (err) return res.status(500).send("Something failed!");
                    else return res.status(200).send({
                        message: "Product updated successfully!!"
                    })
                })
            })
        } else {
            product.save((err, result) => {
                if (err) return res.status(500).send("Something failed!");
                else return res.status(200).send({
                    message: "Product updated successfully!!"
                })
            })
        }
    })

}
