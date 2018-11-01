
// 根据返回数据做出操作
const modal = ( data,options = {} ) => {
    let _none = ()=>{};
    let { isReact, success, fail ,callback,cb} = {
        isReact: ((typeof options.isReact) !== 'undefined') ? options.isReact : true,
        success: options.success || "操作成功",
        fail: options.fail ||"操作失败",
        callback :options.callback || _none,
        cb :options.cb || _none
    }
    if ( data.status == 200 ) {
        if (isReact)  zeroModal.success({
            content : success,
            ok:true,
            onClosed:cb,//关闭按钮回调
            okFn:callback//确认按钮回调
        });
    } else {
        if (isReact)  zeroModal.error({
            content: fail,
            ok:true,
            onClosed:cb,
            okFn:callback
        });;
    }
}


export default  modal