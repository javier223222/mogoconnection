const UsersModel = require("../models/Users.model")
const bcrypt = require('bcryptjs');

const { serialize } = require("cookie");
const { gettoken } = require("../config/jwt.config");
const login=async(req,res)=>{
    try {
      const {useOrEma,password}=req.body
       let user=await UsersModel.findOne({email:useOrEma})||await UsersModel.findOne({username:useOrEma})
       if(!user){
           return res.status(200).json({succces:false,message:"usuario o contrasenia incorrecta"})
       }
       const token=await gettoken({id:user._id,code:user.code,email:user.email,user:user.username})
      bcrypt.compare(password,user.password,(err,result)=>{
        if(err)throw err
        console.log(result)
        if(!result){
            return res.status(200).json({succces:false,message:"usuario o contrasenia incorrecta"})
        }else {
           if(user.verificado && !user.deleted){
            res.setHeader("Set-Cookie",serialize("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"lax",
                maxAge:3600,
                path:"/"
            }))
            return res.status(200).json({succces:true,message:"usuario logeado correctamente"})
           }else{
            return res.status(200).json({succces:false,message:"usurio no existe"})
           }
            

        }
       
      
      })




    }catch(e){
     res.status(500).json({message:"Error al iniciar sesion"})
    }
}

module.exports={
    login
}