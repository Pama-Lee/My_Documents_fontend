/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function testDoc(
  params: {
    // query
    /** typr */
    type: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/doc/test', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
