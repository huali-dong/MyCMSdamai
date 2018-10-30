const admin_module = require("../models/admin");
const { handleData } = require("../util");
const signup = async (req,res,next)=>{
    //对用户注册之前应该先判断用户名是否已存在
    let _isExit = await admin_module.judgeUser(req.body.username);
    if(!_isExit.length){//如果用户不存在，就执行下面的动作;注意的是返回的是一个数组
        if(!req.body.nickname) req.body.nickname = req.body.username;
        let _result = await admin_module.signup(req.body);
        handleData(_result,res,"admin");
    }else{
        res.render("admin",{
            code:201,
            data:JSON.stringify("用户名已存在")
        })
    }
}

const signin = async (req,res,next)=>{
    //登录模块,也应该先判断有没有该用户
    let _isExit = await admin_module.judgeUser(req.body.username);
    if(!!_isExit){//，再判断密码与数据库的密码是否一样
        let _result = await admin_module.signin((req.body.password),_isExit[0]);
        if(_result){
            // 登录成功后，保存session,使用的是一个中间件1. 用来验证 2. 存储一些用户信息做其他判断
            req.session.userinfo = {
                useid : _isExit[0]._id,
                level :_isExit[0].level || 7,
            }
            res.render("admin",{code:200,data:JSON.stringify("登录成功")});
        }else{
            res.render("amdin",{code:203,data:JSON.stringify("密码错误")});
        }
    }else{//如果没有改用户
        res.render("admin",{code:"202",data:JSON.stringify("用户名不存在")});
    }
}
module.exports = {
    signup,
    signin
}