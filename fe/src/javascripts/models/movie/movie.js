
//提供列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/v1/movie/list', 
        data:page,
        success:(results) => {
           return results
        }
    })
}


// 提供保存数据
const save = () => {
    return new Promise((resolve) => {
        $('.movie-save #save-moive-form').ajaxSubmit({
            url: '/api/v1/movie/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

//listone
const listone = (data)=>{
    return $.ajax({
        url:'/api/v1/movie/listone',
        data,
        success:(results)=>{
            return results
        }
    })
}

//update
const update = () => {
    return new Promise((resolve) => {
        $('.movie-update #update-movie-form').ajaxSubmit({
            url: '/api/v1/movie/update',
            type: 'POST',
            success: (results) => {
                console.log(results)
                resolve(results)
            }
        })
    })
}

// remove
const remove = (data)=>{
    return $.ajax({
        url:'/api/v1/movie/remove',
        data,
        type:'delete',
        success:(results)=>{
            return results
        }
    })
}

export default {
    list,
    save,
    listone,
    update,
    remove
}
