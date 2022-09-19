import request from "@/utils/request"
export const doLogin = (data: any) => {
    return request("login", data);
}

export const doGetUsers = () => {
    return request("getUser", {});
}

export const doRegister = (data:any) => {
    return request("registerHandle", data);
}
export const addGroup = (data:any) => {
    return request("addGroup", data);
}
export const viewGroup = (data:any) => {
    return request("viewGroup", data);
}