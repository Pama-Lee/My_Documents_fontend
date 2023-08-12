import { login } from '@/services/user/AuthController';
import {
    AlipayCircleOutlined,
    GithubOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
import { history } from '@umijs/max';
  import { message, Space, Tabs } from 'antd';
  import type { CSSProperties } from 'react';
  import { useState } from 'react';
  
  type LoginType = 'nfc' | 'account';
  
  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    return (
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white',marginTop: '10vh' }}>
          <LoginForm
            logo="https://www.mocd.cc/assets/MOC-6f7f2da6.png"
            title="My Documents"
            subTitle="Cytono 私有云文档资产管理"
            actions={
              <Space>
                其他登录方式
                <GithubOutlined style={iconStyles} />
              </Space>
            }
            initialValues={{
                autoLogin: true,
                }}

            onFinish={async (values) => {
                const res = await login({
                    username: values.username,
                    password: values.password,
                })

                if (res.code !== 200) {
                    message.error(res.msg);
                    return;
                }

                message.success('登录成功');
                localStorage.setItem('MD_token', res.data.token);
                history.push('/');
            }}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'nfc'} tab={'NFC登录'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'密码: ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'nfc' && (
              <>
                {
                    // 检测是否是安卓手机
                    (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) ? (<>
                         {
                                // 暂不支持
                            }
                            <div style={{
                                // 居中
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: '24px',
                                color: '#ccc',
                            }}>
                                暂不支持, 等待开发中...
                            </div>
                    </>) : (
                        <>
                            {
                                // 暂不支持
                            }
                            <div style={{
                                // 居中
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                marginBottom: '24px',
                                color: '#ccc',
                            }}>
                                暂不支持, 请使用安卓手机登录
                            </div>
                        </>
                    )
                }
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    );
  };

  export default Login;