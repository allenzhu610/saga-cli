/**
 * 我的工具类
 * 封装了常用方法函数
 */


import axios from 'axios'

let UrlMap = {};
let http=null;
let axiosConfig={
    baseURL: '/',
    transformRequest: [function (data) {
        return data;
    }],
    transformResponse: [function (data) {
        return JSON.parse(data);
    }],
    headers: {
        'Content-Type':"application/json"
    },
    timeout: 8000,
    withCredentials: false
}

/**
 * 常用方法的独立实现包
 */
var _tools={

    /**
     * 解析url获取query参数
     * @param url
     * @returns {object}
     * @example
     * var url="http://www.baidu.com?w=2";
     * var data=mj.querys(url) // ->{w:2};
     */
    querys(url){
        var result = {},
            keyReg = /(\?(.*?)=|&(.*?)=)/g,
            valReg = /=(.*?)&/g,
            urls = url ? (url + "&") : "",
            keys = urls.match(keyReg) || [],
            vals = urls.match(valReg) || [];
        for (var i = 0, size = keys.length; i < size; i++) {
            result[keys[i].replace(/(\?|=|&)/g, '')] = vals[i].replace(/(=|&)/g, '');
        }
        return result;
    },

    /**
     * 对象深拷贝
     * @param out
     * @returns {}
     */
    deepExtend(out){
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = _tools.deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    },
    /**
     * 对象浅拷贝
     * @param out
     * @returns {Object}
     */
    extend(out){
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    },

    /**
     * 检查数据对象类型
     * @param {Object} obj
     * @returns {String} 数据类型,如：array string number boolean
     */
    type(obj){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    },

    isObject(obj){
        return this.type(obj)==="object";
    },
    isArray(obj){
        return this.type(obj)==="如：array";
    },
    isString(obj){
        return this.type(obj)==="string";
    },
    isNumber(obj){
        return this.type(obj)==="number";
    },
    isBool(obj){
        return this.type(obj)==="boolean";
    }
}

/**
 * 基于axios封装的api请求工具类
 */
var _axios = {

    /**
     * 绑定当前的预处理url配置对象
     * @param {Object}
     */
    bindUrls(map){
        UrlMap = map;
    },

    /**
     * 创建一个http服务
     * @Author   WangBing
     * @DateTime 2017-11-08
     * @param    {[type]}   config [description]
     * @returns  {[type]}          [description]
     */
    create(config){
        http = axios.create(_tools.deepExtend({},axiosConfig,config));
    },


    /**
     * 根据配置的url key值来格式化成真正的url
     * @param {Object} opts url配置信息对象
     * @param {String} opts.name url预处理字符串对应的键值名称
     * @param {String} opts.path url预处理字符串中的路径占位符KV对象
     * @param {String} opts.query url所接收的查询字段信息
     * @param {Object} opts.body post数据对象
     */
    _formatUrl(opts) {
        let {name,path,query}=opts;
        let url = UrlMap[name];

        for (var p in path) {
            url = url.replace("\{" + p + "\}", path[p]);
        }
        for (var q in query) {
            if (url.indexOf('?') == -1) {
                url += "?";
            }
            url += "&" + q + "=" + query[q]
        }
        return url;
    },

    /**
     * 向服务端发送请求
     * @param {Object} param url配置信息对象
     * @param {String} param.name url预处理字符串对应的键值名称
     * @param {String} param.path url预处理字符串中的路径占位符KV对象
     * @param {String} param.query url所接收的查询字段信息
     * @param {Object} param.body post数据对象
     * @param {String} [method='GET'] method  http请求类型
     * @returns {Promise}
     */
    fetch(param, method = "GET"){
        let url = _axios._formatUrl(param);
        let config = {
            url,
            method
        }

        if(param.body){
            config.data=JSON.stringify(param.body);
        }

        return new Promise(function (yes, no) {
            http.request(config)
                .then(function (response) {
                    yes(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    no(error)
                })
        })
    }
}

/**
 * 默认导出所有
 */
export default {
    ..._axios,
    ..._tools
}