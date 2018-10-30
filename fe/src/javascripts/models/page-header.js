
import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    
    let _search = URL.parse(prevUrl).search || "";
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/position-list': {
            title: '职位管理',
            description: '职位列表',
            list: [
                { text: '职位列表' }
            ]
        },
        '/position-save': {
            title: '职位管理',
            description: '添加职位',
            list: [
                { text: '职位列表', path: '#/position-list'+_search },
                { text: '添加职位'}
            ]
        },
        '/position-update': {
            title: '职位管理',
            description: '职位更新',
            list: [
                { text: '职位列表', path: '#/position-list'+_search },
                { text: '职位更新'}
            ]
        },
        '/singer-list': {
            title: '歌手管理',
            description: '歌手列表',
            list: [
                { text: '歌手列表' }
            ]
        },
        '/singer-add': {
            title: '歌手管理',
            description: '添加歌手',
            list: [
                { text: '歌手列表', path: '#/singer-list'+_search },
                { text: '添加歌手'}
            ]
        },
        '/singer-update': {
            title: '歌手管理',
            description: '歌手更新',
            list: [
                { text: '歌手列表', path: '#/singer-list'+_search },
                { text: '歌手更新'}
            ]
        },
        '/movie-list': {
            title: '电影管理',
            description: '电影列表',
            list: [
                { text: '电影列表' }
            ]
        },
        '/movie-save': {
            title: '电影管理',
            description: '添加电影',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },
                { text: '添加电影'}
            ]
        },
        '/movie-update': {
            title: '电影管理',
            description: '电影更新',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },
                { text: '电影更新'}
            ]
        },
        '/movie-lead': {
            title: '电影管理',
            description: '电影预览',
            list: [
                { text: '电影预览', path: '#/movie-list'+_search },
            ]
        }
        
    }
    return _infos[_pathname] || {  }
}


export default {
    pageHeaderInfo
}