require ('dotenv').config()
require('./models/User.model')
const cors = require('cors')
const userRoutes = require('./routes/User.routes')
/* PAQUETE DE MONGOOSE */
const mongoose = require('mongoose')
/* CONECTANDO MONGOOSE Y ACCEDIENDO A LA VARIABLE DE ENTORNO  */
mongoose.connect(process.env.MONGO_URI + "tienda")


const express = require('express')
const app = express()
const port = process.env.PORT

const corsOptions={
    origin:process.env.FRONTEND_URL,
    optionsSuccessStatus:200
}

/* CREAMOS UN MODELO */
/* const User = mongoose.model('User',{
    username: String,
    password : String,
}) */

/* Creando el middleware */
app.use(cors)(corsOptions)
/* Habilita e */
app.use(express.json())
/* lo que va hacer esto es que si va */
app.use('/users', userRoutes)

app.get('/',(req, res)=>{
    res.status(200).json({

        mensaje: 'ruta get'
    })
})
app.put('/',(req,res)=>{
    res.status(200).json({

        mensaje: 'ruta put'
    })
})
app.post('/',(req,res)=>{
  /*   const joan = new User({
        username:'joan',
        password:'joan'
    })
    joan.save() */
    res.status(200).json({

        mensaje: 'ruta post', 
        detail: joan
    })
})
app.delete('/',(req, res)=>{
    res.status(200).json({

        mensaje: 'ruta delete'
    })
})







app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`)
})