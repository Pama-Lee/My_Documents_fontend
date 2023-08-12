// 运行时配置

import { RunTimeLayoutConfig, history } from "@umijs/max";
import { request } from "@umijs/max";
import { Avatar } from "antd";
import prefix from "./services/prefix";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name?: string;
  admin?: boolean;
  login?: boolean;
}> {

  // 如果不存在在localStorage中的Token
  if (!localStorage.getItem('MD_token')) {
    console.log('no token');
    history.push('/login');
    return {
      name: 'guest',
      admin: false,
      login: false,
    }
  }

  // 初始化用户信息
  
  return request(prefix+'/api/v1/user/info', {
    method: 'GET',
    headers: {
      "Identify": localStorage.getItem('MD_token') || "",
    }
  }).then((res) => {
    return {
      name: res.name,
      admin: res.admin,
      login: true,
    }
  }).catch(() => {
    return {
      name: 'guest',
      admin: false,
      login: false,
    }
  });


}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://www.mocd.cc/assets/MOC-6f7f2da6.png',
    menu: {
      locale: false,
    },
    // 默认布局调整
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
  };
};


const Loading: React.FC = () => {
  return (
    <>
      <div style={{
        // 居中
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '24px',
        color: '#ccc',
      }}>
        Loading...
      </div>
    </>
  );
}



const RightContent: React.FC = () => {
  return (
    <>
      <div style={{
        // 居中
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '24px',
        color: '#ccc',
      }}>
          Cytono ©2023
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <div
      style={{
        padding: '0px 24px 24px',
        textAlign: 'center',
      }}
    >
      Cytono ©2023 Created by Pama Lee
    </div>
  );
}
