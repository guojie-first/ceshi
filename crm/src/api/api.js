import http from './http';

export function login(options){
    return http.post("/user/login",options)
}
export function logout(options){
    return http.get("/user/signout")
}