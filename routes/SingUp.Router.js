const { singUp, confirmUser } = require('../controllers/signUp.Controller');

const router = require('express').Router();

router
     .post("/",[],singUp)
     .get("/:token",[],confirmUser)


module.exports = router;     