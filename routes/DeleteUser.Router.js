
const { verifyToken } = require("../middlewares");
const { deleteUser } = require("../controllers/DeleteUser.controller");
const router = require("express").Router();

router.delete("/",verifyToken,deleteUser)

module.exports = router;