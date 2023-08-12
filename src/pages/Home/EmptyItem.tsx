
import { createBook } from "@/services/Book";
import { history } from "@umijs/max";
import { Input, Modal, message } from "antd";
import React from "react";

const EmptyItem: React.FC<any> = () => {

    const [isHover, setIsHover] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [name, setName] = React.useState('')

        return (
            <>
                <div style={{
                    maxWidth: '120px',
                    height: '150px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    position: 'relative',
                    backgroundColor: '#fff',
                    boxShadow: (isHover ? '0 2px 8px #ccc' : 'none'),
                    cursor: 'pointer',
                    // 虚线边框
                    border: '2px dashed #ccc',
                    // 动画渐变
                    transition: 'all 0.3s ease',
                    
                }} onClick={()=>{
                    setVisible(true)
                }}
                    // 当鼠标移动到元素上时，会触发 mousemove 事件
                    onMouseMove={()=>{
                        setIsHover(true)
                    }}
                    // 当鼠标移出元素时，会触发 mouseout 事件
                    onMouseOut={()=>{
                        setIsHover(false)
                    }}
                >
                    {
                        // 加号
                    }
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        // 深灰色
                        color: '#ccc',
                    }}>
                      +
                      </div>
                </div>

                <Modal
                    title="📚 新建书籍"
                    visible={visible}
                    onOk={() => {
                        if (!name) {
                            message.error('书籍名称不能为空')
                            return
                        }

                        createBook({
                            name: name,
                        }).then((res)=>{
                            message.success('创建成功')
                            history.push(`/book/${res.data.UUID}`)
                        }).catch((err)=>{
                            message.error(err.msg)
                        })
                    }}
                    onCancel={() => {
                        setVisible(false)
                    }}
                >
                    <Input value={name} onChange={(v)=>{
                        setName(v.target.value)
                    }} placeholder="书籍名称" />
                    </Modal>
            </>
        )
    }

export default EmptyItem