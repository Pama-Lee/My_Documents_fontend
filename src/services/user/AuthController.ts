/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
import prefix from '../prefix';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function login(
  params: {
    // query
    /** typr */
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>(prefix+'/api/v1/user/login', {
    method: 'POST',
    data: {
        ...params,
    },
    ...(options || {}),
  });
}
