const { getDataToken } = require("../config/jwt.config");

const verifyToken =async  (req, res, next) => {

    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const data=await getDataToken(token)
    
    if(data){
        next()
    }else{
        return res.status(401).send({ message: "Unauthorized!" });
    }
  }
module.exports={
    verifyToken
}