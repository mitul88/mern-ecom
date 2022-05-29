const _ = require('lodash');
const { CartItem } = require('../models/cart');

module.exports.createCartItem = async (req, res) => {
    let { price, product } = _.pick(req.body, ["price", "product"]);
    const item = await CartItem.findOne({
        user: req.user._id,
        product: product
    });

    if (item) return res.status(400).send("Item already added!");
    let cartItem = new CartItem({
        price: price,
        product: product,
        user: req.user._id
    });
    const result = await cartItem.save();
    res.status(201).send({
        message: "product added to cart successfully!",
        data: result
    })
}

module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartItem.find({
        user: req.user._id
    })
    .populate('product', 'name')
    .populate('user', 'name')

    return res.status(200).send(cartItems);
}

module.exports.updateCartItem = async (req, res) => {

}

module.exports.deleteCartItem = async (req, res) => {

}