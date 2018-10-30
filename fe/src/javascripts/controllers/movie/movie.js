import { bus, handleToastByData } from '../../util'

import movie_lead_tempalte from '../../views/movies/movie-lead.html' 
import movie_list_tempalte from '../../views/movies/movie-list.html' 
import movie_update_tempalte from '../../views/movies/movie-update.html' 
import movie_save_tempalte from '../../views/movies/movie-save.html' 

import movie_model from '../../models/movie/movie'
import qs from 'querystring'

const lead =(req,res)=>{
    res.render(movie_lead_tempalte)
}

//list视图
const list = async(req,res,next)=>{
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        search: req.query.search
    }
    //编译模板
    let _html = template.render(movie_list_tempalte, {    //art-template的template.render(模板，数据)
        data: (await movie_model.list(_page)).data
    })
    res.render(_html)
    //给添加按钮，绑定事件
    bindListEvent(_page);
}

//list的事件绑定
const bindListEvent = (_page)=>{
    $('.movie-list #addbtn').on('click',function(){
        //添加按钮点击跳转到添加save路由  
        bus.emit('go','/movie-save')
    })

    $('.movie-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        //router.go('/user/123?name=hwen', { mes: 'hallo world'})   
        //router.go的隐式传参
        // bus.on('go', (path, body = {}) =>  router.go(path, body) )
        //{ id }相当于给body对象添加了一个id的属性，id:id(es6语法直接写id)，当触发emit的时候，body身上的id就起作用了
        bus.emit('go','/movie-update', { id }) 
    })

    //handleRemovemovie不是handleRemovemovie（）
    $('.pos-remove').on('click', function () {
        handleRemovemovie.bind(this,_page)()
    })

    //根据关键字搜索数据
    $('#possearch').on('click',async function(req,res){
        let keywords = $('#keywords').val();
        //上面已近配好了searc，所以只需要根据关键字跳转就可以了
        bus.emit('go', '/movie-list?search='+keywords)
    })
}
//删除事件
const handleRemovemovie = async function(_page){
    let id = $(this).parents('tr').data('id')
    let _data = await movie_model.remove({ id:id })
   // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
    // 删除的时候此页还有多少条数据
    let trs = $('.movie-list__tabel tr[data-id]')
    // 如果只剩一个，将pageNo-1
    let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))
    
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            bus.emit('go', '/movie-list?pageNo='+_pageNo+'&_='+data.removeId)
        }
    })
}




//save视图的控制器
const save = (req,res,next)=>{ 
    res.render(movie_save_tempalte)
    bindSaveEvent();
   
}

//save的事件绑定
const bindSaveEvent = ()=>{
    //添加按钮点击跳转到添加list路由   
    $('.movie-save #back').on('click',function(){
        bus.emit('go','/movie-list')
    })
    $('.movie-save #save-moive-form').submit(handleSaveSubmit)
    
    $("#movieLogo").on('change',function(){
        let imgdom = $("#portrait");
        let imgurl = window.URL.createObjectURL(this.files[0]);
        imgdom.attr('src',imgurl)
        imgdom.show()
    })
}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit =  async function(e){
    e.preventDefault()

    //函数防抖，防止多次提交
    if ( _isLoading ) return false;

    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())

    let result = await movie_model.save()
    
    _isLoading = false

    handleToastByData(result)
    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/movie-list')
    // }})
}


//update视图
const update = async (req,res)=>{
    let { id } = req.body;
    let html = template.render(movie_update_tempalte, {
        data: (await movie_model.listone({ id })).data  // 获取到列表数据
    })
    //根据这个id获取数据
    res.render(html)
    bindUpdateEvent()
}

///update的事件绑定
const bindUpdateEvent =()=>{
    // 返回按钮逻辑
    $('.movie-update #back').on('click', function () {
        bus.emit('go', '/movie-list')
    })

    $('.movie-update #update-movie-form').submit(handleUpdateSubmit)
}

//update的表单提交
const handleUpdateSubmit = async function(e){
    e.preventDefault();
    //用了一个空的input来保存了id
    // let _datastr = $(this).serialize()
    // let _data = qs.parse(_datastr)
    let _results = await movie_model.update()  
    handleToastByData(_results)
}

export default {
    lead,
    list,
    save,
    update
} 