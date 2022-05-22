const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');


module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0]);    

    let user = {};
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // if user gets signed in right away, token has to be generated
    const token  = user.generateJWT();

    try{
        const result = await user.save();
        return res.status(201).send({
            message: "Registration Successfull !",
            token: token,
            user:_.pick(result, ["_id", "name", "email"])
        })
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }
}

module.exports.signIn = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("User not found");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if(!validUser) return res.status(400).send("Please enter correct password");
    
    const token = user.generateJWT();
    return res.status(200).send({
        message: "Sign in Successfull !",
        token: token,
        user:_.pick(user, ["_id", "name", "email"])
    })

}