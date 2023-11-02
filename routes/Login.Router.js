const { login } = require("../controllers/Login.Controller");

const router = require("express").Router();

router
      .post("/",[],login)

    
module.exports = router;    