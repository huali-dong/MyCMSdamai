
const mongoose = require("mongoose");//引入mongoose
const UserModel = mongoose.model("users");//链接数据库中的表

//根据用户提供的id返回用户信息
const getuserById=(id)=>{
    return UserModel
    .findById(id)
    .then((result)=>{
        return result;
    })
    .catch(()=>{
        return false;
    })
}

module.exports = {
    getuserById
}