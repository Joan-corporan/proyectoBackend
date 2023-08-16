const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken");
const hashPassword = require("../helpers/hashPassword");
const { findOne } = require("../models/User.model");

const User = mongoose.model("User");

const signup = async (req, res) => {
  const { username, email, password, address, lastname } = req.body;
  const emailLowerCase = email.toLowerCase();
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regexPassword.test(password)) {
    return res.status(401).json({
      mensaje:
        "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter ",
    });
  }
  const cryptoPassword = hashPassword(password);
  try {
    const user = new User({
      username,
      lastname,
      email: emailLowerCase,
      password: cryptoPassword,
      address,
    });
    const response = await user.save();
    console.log(response);
    const token = generateToken(response);

    return res.status(201).json({
      mensaje: "User Created",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Internal Server Error",
      detail: error,
    });
  }
};
/* extrayendo todos los usuarios almacenados */
const getUsers = async (req, res) => {
  try {
    const response = await User.find();
    return res.status(200).json({
      mensaje: "Ok",
      detail: res,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Internal Server Error",
      detail: error,
    });
  }
};

const updateUsers = async (req, res) => {
  const { _id, userUpdated } = req.body;
  try {
    const response = await User.findByIdAndUpdate(_id, userUpdated, {
      new: true,
    });
    return res.status(200).json({
      mensaje: "ok",
      detail: response,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Internal Server Error",
      detail: error,
    });
  }
};
const deleteUsers = async (req, res) => {
  const { _id } = req.body;
  try {
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
      mensaje: "ok",
      detail: response,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Internal Server Error",
      detail: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();

  const passwordHash = hashPassword(password);

  try {
    const userValidated = await User.findOne({ email: emailLowerCase });

    if (!userValidated) {
      return res.status(401).json({
        message: "Usuario no registrado",
      });
    }

    console.log(`${userValidated.password} vs ${passwordHash}`);

    if (userValidated.password === passwordHash) {
      console.log(`coinciden`);

      const token = generateToken(userValidated);

      return res.status(200).json({
        message: "User logged in successfully",

        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getUserById =(req,res)=>{
    const {_id}=req.params
    try {
        const user = User.findOne({_id})
        if(user){
            return res.status(200).json({
                mensaje:'ok',
                userId:userValidated,
                detail: user

            })
        }
        return res.status(404).json({
            mesaje:'not found'
        })
        
    } catch (error) {
        return res.status(500).json({
            mensje: 'Server Error',
            error
        })
    }
}
const deleteUserById=async(req,res)=>{

    const{_id}=req.params

    try {

        const resp=await User.findByIdAndDelete(_id)

        if(resp){            

            return res.status(200).json({

            messege:"ok",

            detail:resp,

        })

        }

        return res.status(404).json({

            message:'Not found'

        })

       

    } catch (error) {

        return res.status(500).json({

            message:'Server Error',

            error

        })

    }  

}

const updateUserById=async(req,res)=>{

    const{_id}=req.params

    const{userUpdated}=req.body

    const{password}=userUpdated

    const hashedPassword=hashPassword(password)

    try {

        const resp=await User.findByIdAndUpdate(_id,{...userUpdated,password:hashedPassword}, {new:true})

        if(resp){            

            return res.status(200).json({

            messege:"ok",

            detail:resp,

        })

        }

        return res.status(404).json({

            message:'Not found'

        })

       

    } catch (error) {

        return res.status(500).json({

            message:'Server Error',

            error

        })

    }  

}
/* Crear las rutas */

/* exprotando las funciones: */
module.exports = {
  signup,
  getUsers,
  updateUsers,
  deleteUsers,
  login,
  getUserById,
  deleteUserById,
  updateUserById
};
