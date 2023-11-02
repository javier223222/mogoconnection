const { gettoken, getDataToken } = require("../config/jwt.config")
const { getTemplate, sendEmail } = require("../config/mail.config")
const UsersModel = require("../models/Users.model")
const {v4:uuidv4}=require("uuid")
const bcrypt=require("bcryptjs")
const saltRounds=10;

const singUp=async(req,res)=>{
  try{

  
  const { username ,
  nombre ,
  apellidP,
  apellidoM,
  fechaDeNacimientoo,
  carrera,
  sexo,
  email,
  password}=req.body
  const fechaDeNacimiento=new Date(fechaDeNacimientoo);

  let user=await UsersModel.findOne({email})||null
  if(user){
    return res.status(400).json({message:"El usuario ya existe"})
  }

  const code=uuidv4()

  user= new UsersModel({
    username ,
    nombre ,
    apellidP,
    apellidoM,
    fechaDeNacimiento,
    carrera,
    sexo,
    email,
    password,
    code
  })
  bcrypt.genSalt(saltRounds,async(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        if(err)throw err
        user.password=hash
        user.updateAt=new Date()
    })
  })
  const token= await gettoken({id:user._id,code:user.code,email:user.email,user:user.username})
  const template=getTemplate(username,token)
  await sendEmail(email,"Confirmacion de registro",template)
  await user.save()
  return res.status(200).json({
    success:true,
    message:"Usuario creado correctamente",
  })
  
  }catch(error){
    console.log(error.message)
    return res.status(500).json({message:"Error al crear el usuario",error:error.message})
  }
    
}
const confirmUser=async(req,res)=>{
    try{
      const token=req.params.token
     const data=await getDataToken(token)
     if(data==null){
       return res.status(400).json({message:"El token no es valido"})
     }
     console.log(data)
     const {id,code,email,user}=data
     let userfind= await UsersModel.findOne({username:user})||null
     if(userfind==null){
       return res.status(400).json({message:"El usuario no existe"})
     }
     console.log(userfind.code)
    if(userfind.code!=code){
        return res.redirect('https://upconectionproject.vercel.app/dds');  
     }
     

        userfind.verificado=true
        userfind.updateAt=new Date()
        userfind.updateBy="sistem"
        await userfind.save()
       return  res.redirect('https://upconectionproject.vercel.app/Login')
     

    
    }catch(error){
        console.log(error.message)
     return  res.status(500).json({message:"Error al confirmar usuario",error:error.message})
    }
}

module.exports={
    singUp,
    confirmUser
}
