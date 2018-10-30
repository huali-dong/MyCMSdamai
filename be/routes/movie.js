var express = require('express');
var router = express.Router();//express自带的路由工具
// var fileUpload = require('../middlewares/fileUpload')
var movie_fileUpload = require('../middlewares/movie_fileUpload')
var movie_controller = require('../controllers/movie')

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

//为movie中的所有路由都使用这个中间件
router.use(resApplicationJson)

/* GET home page. */
router.get('/listall', movie_controller.listall)
router.get('/list', movie_controller.list)
// express中间件栈，一个功能模块可以利用一个或多个中间件来完成，每一个中间件顺序执行，
//可以传参（eg：给req绑定参数，下一个中间件可以使用），也可以阻止下面的中间件执行（不next（））
router.post('/save', movie_fileUpload, movie_controller.save)
router.get('/listone', movie_controller.listone)
router.post('/update',movie_fileUpload, movie_controller.update)
router.delete('/remove', movie_controller.remove)


module.exports = router; 
