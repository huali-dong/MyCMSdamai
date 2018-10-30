
const jwt = require("jsonwebtoken");//处理token的

//此中间件的作用 就是判断用户是否还存在
const userSigninAuth =(req,res,next)=>{
    let _token = req.query.token;
    let cret = "i am dhl";
    // console.log(req.query.token);
    try {
        var decoded = jwt.verify(_token,cret);
        let _time = (Date.now()/1000)-decoded.iat
        let _expries = 30000;
        if(_time > _expries){
            res.render("user",{
                code:403,
                data:JSON.stringify("用户未登录,请重新登录")
            })
        }else{
            req.token = decoded;
            next();
        }
      } catch(err) {
        // err
        res.render("user",{
            code:403,
            data:JSON.stringify("用户信息已过期,请重新登录")
        })
      }
}
module.exports = userSigninAuth;