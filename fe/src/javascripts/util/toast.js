
const toast = (text) => {
    $.toast({ 
        text , 
        showHideTransition : 'fade',
        allowToastClose : false,
        hideAfter : 3000,
        stack : 5,
        textAlign : 'left',
        position : 'top-center'
    })
}

export default toast