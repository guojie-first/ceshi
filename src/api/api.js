import http from './http';

export function login(options) {
    return http.post("/user/login", options)
}
export function logout(options) {
    return http.get("/user/signout")
}
//获取部门列表
export function getDepList() {
    return http.get("/department/list")
}
//新增部门
export function addDep(option) {
    return http.post("/department/add", option)
}
//删除部门信息
export function removeDep(id) {
    /* return http.get("/department/delete",{
        params:{
            departmentId:id
        }
    }) */
    return http.get("/department/delete?departmentId=" + id)
}
//获取对应部门的详细信息
export function getDepInfo(id) {
    return http.get("/department/info", {
        params: {
            departmentId: id
        }
    })
}

//更新部门信息
export function updateDep(option) {
    return http.post("/department/update", option)
}
//获取员工列表
export function getUserList(options = { departmentId: 0, search: '' }) {
    return http.get("/user/list", {
        params: options
    })
}
