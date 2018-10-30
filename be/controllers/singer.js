const { handleData } = require("../util")
const singer_models = require("../models/singer");


// //歌手列表信息
// const list =async (req,res)=>{
//     let _listData = await singer_models.list();
//     // console.log(_listData);
//     handleData(_listData,res,"singer");
// }

//增加信息
const add= async (req,res)=>{
    let _addData =await singer_models.add( req.body);
    // console.log(_addData)
    handleData(_addData,res,"singer");
}
//查找某一个
const findOne = async (req,res)=>{
    // console.log(req.query)
    let _findData = await singer_models.findOne(req.query);
    // console.log(_findData);
    handleData(_findData,res,"singer");
}
const update = async (req,res)=>{
    // console.log(req.body);
    let _updateData = await singer_models.update(req.body);
    // console.log(_updateData);
    handleData(_updateData,res,"singer");
}
const remove = async (req,res)=>{
    let _data = await singer_models.remove(req.query)
    // console.log(_data);
    handleData(_data, res, 'singer')
}

//根据pageNo和pageSize查找

const listpage =async (req,res)=>{
    let _listpage = await singer_models.listpage(req.query);
    handleData(_listpage,res,"singer");
}
module.exports = {
    add,
    update,
    findOne,
    remove,
    listpage
}