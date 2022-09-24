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
export const delGroup = (data:any) => {
    return request("delGroup", data);
}
export const viewGroup = (data:any) => {
    return request("viewGroup", data);
}
export const updateGroup = (data:any) => {
    return request("updateGroup", data);
}

export const addItem = (data:any) => {
    return request("addItem", data);
}
export const delItem = (data:any) => {
    return request("delItem", data);
}
export const updateItem = (data:any) => {
    return request("updateItem", data);
}
export const viewItem = (data:any) => {
    return request("viewItem", data);
}