class Result {
    public code: number;
    public msg: string;
    public data: any;

    static ok(data: any) {
        return {
            code:200,
            msg: '请求成功！',
            data:data
        }
    }
    static error(msg = '请求失败', data = null) {
        return {
            code:201,
            msg: msg,
            data:data
        }
    }
}

export default Result