const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
  username :{type:String,required:true,unique:true},
  nombre :{type:String,required:true},
  apellidP:{type:String,required:true},
  apellidoM:{type:String,required:true},
  fechaDeNacimiento:{type:Date,required:true},
  carrera:{type:String,required:true},
  sexo:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  code:{type:String,required:true},
  verificado:{type:Boolean,default:false},
  createdAt:{type:Date,default:new Date()},
  creatBy:{type:String,default:"system"},
  updateAt:{type:Date,default:null},
  updateBy:{type:String,default:null},
  deletedAt:{type:Date,default:null},
  deletedBy:{type:String,default:null},
  deleted:{type:Boolean,default:false},
   
})

module.exports=mongoose.model("User",UserSchema)