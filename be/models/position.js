const mongoose = require('../util/mongoose')
const Moment = require('moment') // 时间格式化
const fs = require('fs-extra') // 文件模块
const PATH = require('path') // 路径

// 创建的Model模型 （collection）
var PositionModel = mongoose.model('positions', new mongoose.Schema({
    city: String,
    positionName: String,
    companyName: String,
    salary: String,
    createTime: String,
    formatTime: String,
    companyLogo: String
}));

// 返回列表数据
const list = () => {
    let _query = {}// 查询的约定条件
    return PositionModel.find(_query).sort({createTime: -1}).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}

// 保存职位数据
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)

    return new PositionModel({
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    })
    .save()
    .then((result) => {
        return result
    })
    .catch((err) => {
        return false
    })

}
// 删除职位的model
const remove = async( { id } ) => {
    // 删除数据库中的某一条数据
    let _row = await listone({ id })
    return PositionModel.deleteOne({ _id: id }).then((results) => {
        results.deleteId = id
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.companyLogo))
        return results
    }).catch((err) => {
        // fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' +JSON.stringify(err))
        return false
    })
}

const listone = ({ id }) => {
    return PositionModel.findById(id).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}

const update = (body) => {
    if ( body.republish ) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return PositionModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}

module.exports = {
    list,
    save,
    remove,
    listone,
    update
}