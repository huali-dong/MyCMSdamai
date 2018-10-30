


const list = (list)=>{
    return $.ajax({
        url:"api/v1/singer/pagelist",
        data:list,
        success:(result)=>{
            return result;
        }
    })
}
const add = ()=>{
    return new Promise((resolve) => {
        $('.singer-add #save-form').ajaxSubmit({
            url: "api/v1/singer/add",
            type: 'POST',
            success: (results) => {
                resolve(results)
            },
            error:()=>{
                console.log(23);
            }
        })
    })
}
const update = ()=>{
    return new Promise((resolve) => {
        $('.singer-update #update-form').ajaxSubmit({
            url: "api/v1/singer/update",
            type: 'POST',
            success: (results) => {
                resolve(results)
            },
            // error:()=>{
            //     console.log(23);
            // }
        })
    })
}

const findOne = (id)=>{
    return $.ajax({
        url:"api/v1/singer/findOne",
        data:id,
        success:(result)=>{
            console.log(result)
            return result;
        }
    })
}

const remove = (data) => {
    return $.ajax({
        url: 'api/v1/singer/remove',
        data,
        success:(results) => {
           return results
        }
    })
}
export default {
    list,
    add,
    update,
    findOne,
    remove
}