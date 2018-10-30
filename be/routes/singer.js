
var express = require("express");
var router = express.Router();
var singer_controller = require("../controllers/singer");
var fileUpload = require('../middlewares/singer')
// var fileUpload = require('../middlewares/fileUpload')
const setresponseHeader  = (req,res,next)=>{
    res.set("content-type","application/json;charset = utf-8");
    next();
}
router.use(setresponseHeader);

//中间件栈
// router.get("/list",singer_controller.list);
router.get("/pagelist",singer_controller.listpage);
router.post("/add",fileUpload,singer_controller.add);
router.post("/update",fileUpload,singer_controller.update);
router.get("/findOne",singer_controller.findOne);
router.get("/remove",singer_controller.remove);
module.exports = router;