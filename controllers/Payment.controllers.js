/* const mercadopago = require('mercadopago'); */
const mercadoPago = require('mercadopago')
/* const items = [
  {
    id: "1234",

    title: "Curso de React",

    description: "Curso de React desde absoluto cero",

    picture_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",

    quantity: 1,

    currency_id: "CLP",

    unit_price: 10000,
  },
]; */

const createPayment= async(req,res)=>{
  const productos= req.body 
  const items = productos.map((producto)=>{
    return{
      ...producto,
      unit_price:producto.precio,
      currency_id: "CLP",
      title:producto.nombre,
      id:producto._id,
      description:"",
      picture_url:producto.imagenes.pricipal

    }
  })
  console.log(items)
  try {
    mercadoPago.configure({
        access_token:"TEST-8790554050458508-081913-ccd2a1f90b177298eff22da260b179d4-1454615423"
    })
    const preference = {
        items,
        back_urls:{
            success:"http://localhost:5173/success-purchase",
            pending:"http://localhost:8080/payment/pending-payment",
            failure:"http://localhost:8080/payment/failure-payment"
        }
    }
    const respuesta= await mercadoPago.preferences.create(preference)
    return res.status(200).json({
        message: "OK",
        detail: respuesta
    })
    
  } catch (error) {
    res.status(500).json({
        message:('Serever Error'), 
        error
    })
    
  }
}
const successPayment= async(req,res)=>{
        res.status(200).json({
            messege:'ruta successPayment',
            detail:req.res
        })
        
 

}
const pendingPayment= async(req,res)=>{
        res.status(200).json({
            messege:'ruta pendingPayment',
            detail:req.res
        })
        
  
        
    

}
const failurePayment=async(req,res)=>{
        res.status(200).json({
            messege:'ruta failurePayment',
            detail:req.res
        })
        
   
      
        
    

}

module.exports={createPayment ,successPayment, failurePayment,pendingPayment }
