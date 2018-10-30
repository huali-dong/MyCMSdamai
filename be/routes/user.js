
const express = require("express");
var router = express.Router();

const user_controller = require("../controllers/user");
const usreSigninAuth = require("../middlewares/userSigninAuth");
//设置响应头
const setresponseHeader  = (req,res,next)=>{
    res.set("content-type","application/json;charset = utf-8");
    next();
}
router.use(setresponseHeader);
router.get("/isSignIn",user_controller.isSignIn);
router.get("/info",usreSigninAuth,user_controller.info);
// router.post("/exit",user_controller.exit);
// router.post("/check",user_controller.check);

module.exports = router;