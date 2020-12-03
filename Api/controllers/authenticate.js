const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = () => {
    const controller = {};

    controller.authenticate = (req, res) => {
        try{
            const { user } = req.body;

            const token = jwt.sign({ name: user }, authConfig.secret, {
                expiresIn: 3600,
            })

            res.send({name: user, token: token});
        }catch(err){
            res.status(401).send({error: 'Error on authenticate'});
        };
    }

    return controller;
}