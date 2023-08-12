import { getBookInfo } from "@/services/Book"
import { HomeOutlined, ProjectOutlined } from "@ant-design/icons"
import { ProHelp, ProLayout } from "@ant-design/pro-components"
import { Outlet, history, useParams } from "@umijs/max"
import { Spin, message } from "antd"
import React from "react"
import { useEffect } from "react"

const Book: React.FC = () => {

    const params = useParams()

    const uuid = params.uuid

    const [menuData, setMenuData] = React.useState<any>([])

    const [Loading, setLoading] = React.useState<boolean>(true)

    const [title, setTitle] = React.useState<string>('')
    

    useEffect(()=>{
        setMenuData([
            {
                path: '/',
                name: '首页',
                icon: <HomeOutlined />,
            },
            {
                name: '创建新文档',
                path: '/book/'+uuid+'/new',
                icon: <ProjectOutlined />,
            },])
    }, [])

    useEffect(()=>{
        if (!uuid) {
            history.push('/')
            return
        }

        // book信息获取
        getBookInfo(uuid).then((res)=>{
            if (res.code == 200) {

                setTitle(res.data.BookInfo.Name)

                // 获取res.data.Docs
                const docs = res.data.Docs

                if (!docs) {
                    setLoading(false)
                    return
                }

                for (let i = 0; i < docs.length; i++) {


                    const doc = docs[i];
                    const documents = doc.Documents

                    const menu: any = {
                        name: doc.Cate,
                        path: '/book/'+uuid+'/'+doc.UUID,
                        children: []
                    }

                    for (let j = 0; j < documents.length; j++) {
                        const document = documents[j];
                        menu.children.push({
                            name: document.Title,
                            path: '/book/'+uuid+'/doc/'+document.UUID,
                        })
                    }



                    setMenuData((oldMenuData: any)=>{
                        return [...oldMenuData, menu]
                    })
                }

                setLoading(false)
            } else {
                console.log("fe")
                message.error(res.msg)
            }
        }).catch((err)=>{
            message.error(err.message)
        })
    },[uuid])

    const getMuneData = ()=>{
        return menuData
    }
        

    if (!menuData.length) {
        return (
            <>
            <Spin tip="Loading...">
                </Spin>
            </>
        )
    }

    return (
        <>
        <ProLayout 
            logo="https://www.mocd.cc/assets/MOC-6f7f2da6.png"
            title={title}
            menu={
                {
                    locale: false,
                }
            }
            menuDataRender={getMuneData}

            loading={Loading}

            menuItemRender={(item: any, dom) => {
                    return (
                        <div onClick={()=>{
                            // 如果item.onClick存在，则执行onClick
                            if (item.onclick) {
                                item.onclick()
                            } else {
                                history.push(item.path)
                            }
                        }}>
                            {dom}
                        </div>
                    )
                }}

        ><div style={{
            width: "100%",
            overflow:"hidden"
        }}>
            <Outlet />
        </div>
            
            </ProLayout>
        </>
    )
}

export default Book