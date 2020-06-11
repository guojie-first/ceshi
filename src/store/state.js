let str = localStorage.getItem('crmUserInfo');
let obj = str ? JSON.parse(str) : {}
export default {
    //就是state
    count: 100,
    userInfo: obj
}