
const mongoose = require("../util/mongoose");
const Monment = require("moment");
const PATH = require("path");
const fs = require("fs-extra");

//创建数据库模型,mongoose的是从Schema开始的，每个schema都会映射到一个MongoDB collection
var Singer = new mongoose.Schema({
    
    name: String,
    birthday: String,
    city: String,
    companyName: String,
    works: String,
    occupation: String,
    createTime: String,
    formatTime: String,
    personLogo: String
  });

var singerModel = mongoose.model("singer",Singer);



const add = (body)=>{
    let _time = Date.now();
    let monment = Monment(_time);
    if(body.personLogo==='') body.personLogo = "/uploads/singer/default.jpg";
    return new singerModel({
        ...body,
        createTime: _time,
        formatTime: monment.format("YYYY-MM-DD, hh:mm")
    }).save()
    .then((result)=>{
        return result;
    }).catch(()=>{
        return false;
    })
}

const findOne = ({id})=>{
    return singerModel.findById(id)
        .then((result)=>{
            return result;    
        }).catch(()=>{
            return false;
        })  
}
const update = (body)=>{
    //如果图片不存在,就不更改personLogo,然后让body.personLogo上没有这个标签
    if( !body.personLogo ) delete body.personLogo;
    //是否更新时间，重新排序
    if ( body.republish ) {
        // console.log("34565667");
        let _time = Date.now()
        let monment = Monment(_time)
        body.createTime = _time
        body.formatTime = monment.format("YYYY-MM-DD, hh:mm")
    }
    // console.log("2342",body);
    return singerModel.updateOne({_id:body.id},{...body})
    .then((result)=>{
        return result;
    }).catch(()=>{
        return false;
    })
}
const remove =async ({id})=>{
    // 删除数据库中的某一条数据
    let _img = await findOne({ id })
    return singerModel.deleteOne({ _id: id }).then((results) => {
        results.deleteId = id;

        //删除文件夹里的图片的时候，要先判断这个文件是否存在，存在再删
        if(_img.personLogo && _img.personLogo!== "/uploads/singer/default.jpg"){
            fs.removeSync(PATH.resolve(__dirname, '../public'+_img.personLogo));
        }
       
        return results;
    }).catch((err) => {
        return false;
    })
}

const list = (query,reorder)=>{
    let _query =query ||  {};
    return singerModel.find(_query).sort({createTime: -1})
        .then((result)=>{
            return result;
    }).catch((err)=>{
        return false;
    })
}

//根据pageNo和pageSize查找
const listpage =async ({pageNo =1,pageSize = 3,search ="",reorder = -1})=>{
    let reg = new RegExp(search,"i");
    let _query = search ? {name : reg} : {};
    //skip是mongodb里面的从哪里开始查找
    //limit是指查出几条数据
   //要获取页面所有的数据
   console.log(reorder)
   let listall = await list(_query);
    return singerModel.find(_query)
        .sort({createTime:-1})
        .skip((pageNo-1)*pageSize)
        .limit(~~pageSize)//~~将数据转化为数值类型，因为传过来的是字符串，不能识别
        .then((result)=>{
            return {
                result,
                search,
                pageInfo : {
                    pageNo : pageNo,//页码数
                    pageSize : pageSize,//总的要查询的条数
                    total : listall.length,//总的数据数
                    totalPage : Math.ceil((listall.length)/pageSize)//一共有几页
                }
            };
    }).catch((err)=>{
        return false;
    })
}
module.exports = {
    // list,
    add,
    update,
    findOne,
    remove,
    listpage
}