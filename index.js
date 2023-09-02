require ('dotenv').config()
require('./models/User.model')
const cors = require('cors')
const userRoutes = require('./routes/User.routes')
const paymentRoutes = require('./routes/Payment.routes')
const productRoutes = require('./routes/Produc.routes')
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



/* Creando el middleware */
app.use(cors())
/* */
app.use(express.json())
/*  */
app.use('/users', userRoutes)
/* Rutas que va a estar escuchando es la de payments */
app.use('/payment',paymentRoutes )

app.use('/products',productRoutes)




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
 
    res.status(200).json({

        mensaje: 'ruta post', 
        detail: 'joan'
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