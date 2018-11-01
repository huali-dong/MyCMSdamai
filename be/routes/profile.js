
var express = require("express");
var router = express.Router();
var userUpload = require("../middlewares/userUpload");
const profile_controller = require("../controllers/profile");
const setresponseHeader  = (req,res,next)=>{
    res.set("content-type","application/json;charset = utf-8");
    next();
}
router.use(setresponseHeader);

router.post("/update",userUpload,profile_controller.update);


module.exports = router;
