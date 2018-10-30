import { bus, handleToastByData } from '../../util'
// 职位列表视图
import position_list_template from '../../views/position/position-list.html'
// 添加职位视图
import position_save_template from '../../views/position/position-save.html'
// 修改职位视图
import position_update_template from '../../views/position/position-update.html'
// model
import position_model from '../../models/positon/position'

import qs from 'querystring'


// 列表视图的控制器
const list = async (req, res, next) => {
    // 编译模板 
    let html = template.render(position_list_template, {
        data: (await position_model.list()).data // 获取到列表数据
    })
    res.render(html)
    bindListEvent()// 给添加按钮绑定事件
}

// list的事件绑定
const bindListEvent = () => {
    // 添加按钮点击跳转到添加路由
    $('.position-list #addbtn').on('click', function () {
        bus.emit('go','/position-save')
    })
    $('.position-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/position-update', { id })
    })
    $('.pos-remove').on('click', handleRemovePosition)
}
// 删除操作
const handleRemovePosition = async function ()  {
    let id = $(this).parents('tr').data('id')
    let _data = await position_model.remove({id: id})  
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后
            bus.emit('go', '/position-list?_='+data.deleteId)
        }
    })
}

// save视图的控制器
const save = async (req, res, next) => { 
    res.render(position_save_template)
    bindSaveEvent()
}

// save的事件绑定
const bindSaveEvent = () => {
    // 返回按钮逻辑
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position-list')
    })
    $('.position-save #save-form').submit(handleSaveSubmit)
}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    
    e.preventDefault()

    if ( _isLoading ) return false;

    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())

    let result = await position_model.save()

    _isLoading = false

    handleToastByData(result)

    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/position-list')
    // }})
}


const update = async (req, res) => {
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染
    let html = template.render(position_update_template, {
        data: (await position_model.listone({ id })).data // 获取到列表数据
    })
    res.render(html)
    bindUpdateEvent()
}

const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.position-update #back').on('click', function () {
        bus.emit('go', '/position-list')
    })

    $('.position-update #update-form').submit(handleUpdateSubmit)
}

const handleUpdateSubmit = async function (e) {
    e.preventDefault();
    let _datastr = $(this).serialize()
    let _data = qs.parse(_datastr)
    let _results = await position_model.update(_data)  
    handleToastByData(_results)
}


export default {
    list,
    save,
    update
}