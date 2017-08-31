/**
 * Created by Administrator on 2017/7/10 0010.
 */
 const URLPATH1 = "http://192.168.10.228:8080/jad-saas-mgmt/api/";
const URLPATH="src/assets/js/api/";

// const URLPATH1="http://192.168.132.134:8080/jad-saas-mgmt/api/";
// const URLPATH1="http://127.0.0.1:8080/jad-saas-mgmt/api/";

// const URLPATH1="http://127.0.0.1:8080/jad-saas-mgmt/api/";

//const URLPATH1="http://127.0.0.1:8080/jad-saas-mgmt/api/";
//const URLPATH1 = "http://192.168.134.111:8080/jad-saas-mgmt/api/";

import 'babel-polyfill' //解决ie浏览器无内置promise对象
import Vue from 'vue';
import axios from 'axios';
import router from './../../router'
let querystring = require('querystring');
export default class ajax {
    static get(api, params, callback) {
        let token =JSON.parse(sessionStorage.getItem('Token'))?JSON.parse(sessionStorage.getItem('Token')):'';
        let url = `${URLPATH1}${api}?token=${token}`;
        for (var key in params) {
            url +='&'+  key + '=' + params[key]
        }
        axios({
            method: 'get',
            url: url,
        })
            .then(function (response) {
                if(response.data.stateCode.code=="200"){
                  callback(response.data)
                }else{
                  return router.push('/404');
                }



            })
            .then(function (error) {
                if (error) {
                    console.log(error)
                }
            });
    }
    static delete(api, params, callback) {
        let token =JSON.parse(sessionStorage.getItem('Token'))?JSON.parse(sessionStorage.getItem('Token')):'';
        let url = `${URLPATH1}${api}?token=${token}`;
        console.log(url);
        for (var key in params) {
            url +='&'+  key + '=' + params[key]
        }
        axios({
            method: 'delete',
            url: url,
        })
            .then(function (response) {
                if(response.data.stateCode.code==0) return alert(response.data.stateCode.message);
                    callback(response.data)
            })
            .then(function (error) {
                if (error) {

                    console.log(error)
                }
            });
    }
    static post(api,params , callback) {
        let url = `${URLPATH1}${api}`;
        let token =JSON.parse(sessionStorage.getItem('Token'))?JSON.parse(sessionStorage.getItem('Token')):'';
        let params1=Object.assign(params,{token:token});
        let temp = querystring.stringify(params1);
        axios.post(url,temp,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function (response) {
                callback(response)
            })
            .then(function (error) {
                if (error) {

                    console.log(error)
                }
            });
    }

}
