import { bus} from '../../util';
import modal from "../../util/modal";
import singer_tempalte from "../../views/singer/singer.html";
import singer_models from "../../models/singer/singer";
import add_template from "../../views/singer/addSinger.html";
import update_template from "../../views/singer/updateSinger.html";
const list = async (req,res)=>{
    //将pageNo和pageSize传到后台
    // pageNo
    // console.log(req)
    req.query = req.query || {};
    let {pageNo,pageSize,search,reorder} = req.query;
    let _dataList = await singer_models.list({pageNo,pageSize,search,reorder});
    // console.log(_dataList)
    let html = template.render(singer_tempalte,{
        data: _dataList.data
    })
   res.render(html);
   
   ListbindEvent(_dataList.data.pageInfo);
}

//绑定list列表的按钮事件

const ListbindEvent = (pageInfo)=>{
    
    $(".singer-list #addbtn").on("click",function(){
        bus.emit("go","/singer-add");
    })
    $("#possearch").on("click",function(){
        //查找数据
        let keywords = $("#keywords").val();
        bus.emit("go","/singer-list?search="+keywords);
    })
    $("#reorder").on("click",function(){
        if($(this).val()=="true"){
            bus.emit("go","/singer-list?reorder=1");
        }
        
    })
    $(".pos-update").on("click",function(){
        //点击的时候让req.body属性上有这个id号。然后根据这个id号去数据库查找，再渲染到页面上
        let id = $(this).parents("tr").data("id");
        bus.emit("go","/singer-update?pageNo="+pageInfo.pageNo,{id});
    });

    //如果删除页只有一条数据，删除完之后就没有了，就必须调整一下，让pageNo-1;可以通过获取tr的值,也可以通过返回值处理
    let  _page = pageInfo.pageNo;
    if(((~~pageInfo.total) % (~~pageInfo.pageSize)) === 1) _page =  (pageInfo.pageNo -1);
    // console.log(~~pageInfo.pageNo,pageInfo.totalPage)
    $(".pos-remove").on("click",async function(){
        let id = $(this).parents('tr').data('id')
        let _data = await singer_models.remove({id: id})  
        modal(_data,{
            callback:()=>{
                //增加了pageNo参数，如果这里不加上，就会默认调到第一页
                bus.emit('go', '/singer-list?pageNo='+_page+'&_='+id)
            },
            cb:()=>{
                bus.emit('go', '/singer-list?pageNo='+_page+'&_='+id)
            }
        })
    })
}
const add = (req,res)=>{
    res.render(add_template);
    addbindEvent();
}
//add的事件绑定
const addbindEvent =()=>{
    //返回列表
    $("#back").on("click",()=>{
        bus.emit("go","/singer-list");
    });
    $("#personLogo").on("change",function(){
        // let imgHtml = $('<img id="addImage" width="80" height="80"/>')
        // $("#addImgeHtml").append(imgHtml);
        document.getElementById("addImage").src=window.URL.createObjectURL(this.files[0]);
    });
    $('.singer-add #save-form').submit(handleSaveSubmit);
   
}
    // 开关防止多次提交
    let _isLoading = false
    const handleSaveSubmit = async function (e) {
        e.preventDefault()
        if ( _isLoading ) return false;
        _isLoading = true
        let result = await singer_models.add();
        _isLoading = false
        modal(result,{
            callback:()=>{
                bus.emit("go","/singer-list");
            }
         
    })
}

//更新数据
const update = async (req,res)=>{
    //这里的id是上面存到req.body属性上的
    let {id} =  req.body;
    let _pageNo = req.query.pageNo || 1;
    console.log(_pageNo)
    let data =  (await singer_models.findOne({id})).data;
    let html = template.render(update_template,{
        data:data
    })
    // console.log(data.personLogo);
    res.render(html);
    updatebindEvent(_pageNo);
}

const updatebindEvent = (_pageNo)=>{
    $(".singer-update #back").on("click",()=>{
        bus.emit("go","/singer-list")
    });
    $(".singer-update #update-form").submit(function(e){
        e.preventDefault();
        handleUpdateSubmit(_pageNo)
    });
    //改变显示image的路径
    $("#changeFile").on("change",function(){
        document.getElementById("updateImage").src=window.URL.createObjectURL(this.files[0]);
    })
}
const handleUpdateSubmit =async function(_pageNo){
    // let _datastr = $(this).serialize();
    // let _data = qs.parse(_datastr);
    //在那一页修改之后，还是返回当前页
    let pageNo = _pageNo;
    let _result = await singer_models.update();
    modal(_result,{
        callback:()=>{
            bus.emit("go","/singer-list?pageNo="+pageNo);
        }
    })
}
export default {
    list,
    add,
    update,
}