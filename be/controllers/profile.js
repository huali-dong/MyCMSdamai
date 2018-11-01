
const profile_model = require("../models/profile");
const user_model = require("../models/user");
const {handleData} = require("../util/index");
const crypto = require("crypto");

const update =async (req,res,next)=>{
    let _data = req.body;
    let _list =await user_model.getuserById(req.body.id);
    //先要对输入的旧密码进行判断
    let _pwd = "123456";
    // console.log(_list.password)
    const decipher = crypto.createDecipher('aes192', _pwd);
    /*
    第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
    第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
    第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
    */
   //解密数据库中的密码
    let decrypted = decipher.update(_list.password, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
   if(decrypted === _data.passwordold){//将数据库的密码与输入的旧密码进行对比，相等才能修改，
        let _result = await profile_model.update(_data,_list);
        handleData(_result,res,"profile");
   }else{
       res.render("singer",{
           code:205,
           data:JSON.stringify("输入的旧密码有误")
       })
   }

    
    
}

module.exports = {
    update
}