var express = require('express');
var router = express.Router();//express自带的路由工具
var fileUpload = require('../middlewares/fileUpload')
var position_controller = require('../controllers/position')

/* GET home page. */
router.get('/list', position_controller.list)
router.post('/save', fileUpload, position_controller.save)
router.get('/remove', position_controller.remove)
router.get('/listone', position_controller.listone)
router.post('/update', position_controller.update)


module.exports = router; 
