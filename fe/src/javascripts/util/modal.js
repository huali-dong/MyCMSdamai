
// 根据返回数据做出操作
const modal = ( data, options = {} ) => {
    let _none = () => {}
    let { isReact, success, fail ,callback,cb} = {
        isReact: ((typeof options.isReact) !== 'undefined') ? options.isReact : true,
        success: options.success || _none,
        fail: options.fail || _none,
        callback :options.callback || _none,
        cb :options.cb || _none
    }
    if ( data.status == 200 ) {
        if (isReact)  zeroModal.success({
            content:"操作成功",
            ok:true,
            onClosed:cb,
            okFn:callback
        });
        if ( success ) success(data.data);
    } else {
        if (isReact)  zeroModal.success({
            content:"操作失败",
            ok:true,
            onClosed:cb,
            okFn:callback
        });;
        if ( fail ) fail(data.data);
    }
}


export default  modal