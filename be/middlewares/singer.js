var PATH = require('path')
var multer = require('multer')

// 控制文件存储位置和名字
var storage = multer.diskStorage({
  // 存储位置
  destination: function (req, file, cb) {
    cb(null, PATH.resolve(__dirname, '../public/uploads/singer'))
  },
  // 文件名字
  filename: function (req, file, cb) {
    let _originalName = file.originalname // 原名
    let _extName = PATH.extname(_originalName); // 后缀名
    let _baseName = PATH.basename(_originalName, _extName); // 文件名
    let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖
    // 将图片的路径放入到req.body中的，下个中间件就可以取用了
    req.body.personLogo = '/uploads/singer/' + _filename
    cb(null, _filename)
  }
})

// 过滤文件类型
function fileFilter (req, file, cb) {
  let _flag = file.mimetype.startsWith('image')

  cb(_flag ? null : new Error('请上传正确格式的图片'), _flag)
}


// var upload = multer({dest: PATH.resolve(__dirname, '../public/uploads')})
// 已经是一个中间件了
var upload = multer({ storage, fileFilter }).single('personLogo') // .single处理单文件上层


// 在upload中间件外面套上一个空壳中间件，目的是为了让upload处理错误后选择是否继续向下执行
const singer = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
          res.set('content-type', 'application/json; charset=utf8')
      res.render('singer', {
          code: 501,
          data: JSON.stringify({ msg: '请上传正确格式的图片' })
      })
    } else {
      // 一切都好
      next()
    }
  })
}

module.exports = singer