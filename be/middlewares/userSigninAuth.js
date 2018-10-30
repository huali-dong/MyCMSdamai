
//此中间件的作用 就是判断用户是否还存在
const userSigninAuth =(req,res,next)=>{
    if(req.session.userinfo){
        next();
    }else{
        res.render("user",{
            code:403,
            data:JSON.stringify("用户信息已过期,请重新登录")
        })
    }
}
module.exports = userSigninAuth;