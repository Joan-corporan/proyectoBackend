
const jwt = require('jsonwebtoken')
const secreta = process.env.JWT_SECRET_KEY

const generateToken = (User)=> {
    const {_id, username, email} = User
    return jwt.sign({
        _id,
        username,
        email
    }, secreta, {
        expiresIn: '1d' 
    }
    )

}
module.exports = generateToken