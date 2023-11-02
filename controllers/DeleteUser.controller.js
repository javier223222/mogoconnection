const { getDataToken } = require("../config/jwt.config")
const UsersModel = require("../models/Users.model")

const deleteUser = async (req, res) => {
   try{

      const {id}=await getDataToken(req.headers["x-access-token"])
      await UsersModel.find({_id:id}).updateOne({deleted:true})
     
   
    res.status(200).json({success:true,message:"Usuario eliminado correctamente"})
   }catch(e){
    res.status(500).json({success:false,message:"Error al eliminar el usuario",error:e.message})
   }

}

module.exports = {
    deleteUser
}