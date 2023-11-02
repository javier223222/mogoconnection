const mongoose=require("mongoose")
const connectDB=async ()=>{
    try{
       const cn=await mongoose.connect(process.env.MONGOURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
       cn.STATES.connected?console.log("connected"):console.log("not connected")
    }catch(e){
       console.log(e)
       process.exit(1)
    }
}

module.exports={
    connectDB
}