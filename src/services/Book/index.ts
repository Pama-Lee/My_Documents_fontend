import { request } from "@umijs/max"
import prefix from "../prefix"

// 获取文档库信息
export const getBookInfo = (uuid: string) => {
    return request(prefix+`/api/v1/book/info/${uuid}`,{
        headers: {
            'Identify' : localStorage.getItem('MD_token') || ''
        }
    })
}

// 新建文档库
export const createBook = (data: {
    name: string,
}) => {
    return request(prefix+`/api/v1/book/create`,{
        method: 'POST',
        data,
        headers: {
            'Identify' : localStorage.getItem('MD_token') || ''
        }
    })
}

