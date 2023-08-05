require('dotenv').config()
const {expressjwt}= require('express-jwt')
const secreta= process.env.JWT_SECRET_KEY

const getToken=(req)=>{
    const {authorization}=req.headers
    if(authorization){
        const [type,token] = authorization.split(' ')
        return (type === 'Token')?token:null
    }
    return null

}
const auth = expressjwt({
    secreta,
    algorithms:['HS256'],
    userProperty:'user',
    getToken
})
module.exports= auth
