const jwt =require("jsonwebtoken");
const gettoken=async (payload)=>{
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
 }

 const getDataToken=async (token)=>{
    let data=null
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          data=null
        } else {
          data=decoded
        }
      });
      return data
 }

 module.exports={gettoken,getDataToken}
 