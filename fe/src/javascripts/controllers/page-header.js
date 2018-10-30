
import page_header_model from "../models/page-header"
import page_header_template from "../views/page-header.html"
const render = (req,res)=>{
    // 记录上一次路由跳转的url
    // console.log(req.url);
    var prevUrl = ''
    let _data = page_header_model.pageHeaderInfo(req.url, prevUrl);
    // console.log( page_header_model.pageHeaderInfo(req.url, prevUrl));
    let _html = template.render(page_header_template,{
        data: _data
    })
    // 已经进入到当前路由了，将上一次路由改成当前的路由
    prevUrl = req.url;
    $("#page-header").html(_html);
}

export default {
    render
}