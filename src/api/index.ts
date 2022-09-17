import request from "@/utils/request"
export const doLogin = (data: any) => {
    return request("login", data);
}

export const doGetUsers = () => {
    return request("getUser", {});
}

export const doRegister = (data) => {
    return request("registerHandle", data);
}