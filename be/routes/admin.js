
const express = require("express");
var router = express.Router();

const admin_controller = require("../controllers/admin");

//设置响应头
const setresponseHeader  = (req,res,next)=>{
    res.set("content-type","application/json;charset = utf-8");
    next();
}

router.use(setresponseHeader);
router.post("/signup",admin_controller.signup);
router.post("/signin",admin_controller.signin);
module.exports = router;