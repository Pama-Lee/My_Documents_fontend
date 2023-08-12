import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { ModalForm, PageContainer, ProFormSelect, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
import { history, request, useModel, useParams } from '@umijs/max';
import styles from './index.less';
import DocViewer from '@cyntler/react-doc-viewer';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.css';
import { useEffect } from 'react';
import React from 'react';
import { Button, Image, Tabs, message } from 'antd';
import prefix from '@/services/prefix';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [markdown, setMarkdown] = React.useState('');
  const markdownEditor = React.useRef<any>(null);

  const params = useParams();

  useEffect(() => {
    console.log(params);


    const cherryInstance = new Cherry({
      id: 'markdown-container',
      value: '# Hello World',
    });

    markdownEditor.current = cherryInstance;
  }, [])


  return (
    <PageContainer ghost>
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Markdown" key="1">
            <Button type='primary' onClick={() => {
              const markdown = markdownEditor.current.getValue();
              setMarkdown(markdown);
              localStorage.setItem('markdown', markdown);
            }}>保存草稿</Button>
            <ModalForm
              title="新建文档"
              trigger={
                <Button type='primary' style={{
                  // 浮动在右边
                  float: 'right',
                }} onClick={() => {
                  const markdown = markdownEditor.current.getValue();
                  setMarkdown(markdown);
                  localStorage.setItem('markdown', markdown);
                }}>
                  新建文档
                </Button>
              }
              modalProps={{
                onCancel: () => console.log('run'),
              }}
              onFinish={async (values) => {

                const res = await request(prefix + "/api/v1/doc/create/markdown", {
                  method: "POST",
                  data: {
                    name: values.name,
                    book_uuid: params.uuid,
                    content: markdown,
                    category: values.category

                  },
                  headers: {
                    "Identify": localStorage.getItem("MD_token") || ""
                  }
                })

                if (res.code != 200) {
                  message.error(res.msg)
                } else {
                  message.success("发布成功")
                  history.back();
                }

                return true;
              }}
            >
              <ProFormText
                width="md"
                name="name"
                label="文档名称"
                placeholder="请输入文档名称"
                rules={[{ required: true, message: '请输入文档名称' }]}
              />
              <ProFormText
                width="md"
                name="description"
                label="文档描述"
                placeholder="请输入文档描述"
                rules={[{ required: true, message: '请输入文档描述' }]}
              />
              <ProFormSelect
                width="md"
                name="category"
                label="文档分类"
                placeholder="请选择文档分类"
                rules={[{ required: true, message: '请选择文档分类' }]}
                showSearch
                debounceTime={300}

                request={async (keywords) => {
                  const res = await request(prefix + '/api/v1/book/category/search', {
                    method: 'POST',
                    headers: {
                      "Identify": localStorage.getItem('MD_token') || "",
                    },
                    data: {
                      book_uuid: params.uuid,
                      keyword: keywords.keyWords,
                    }
                  })

                  const r: any = []
                  res.data.forEach((item: any) => {
                    r.push({
                      label: item.Name,
                      value: item.Name,
                    })
                  })

                  if (keywords.keyWords === '' || keywords.keyWords === undefined) {
                    return r;
                  }
                  r.push({
                    label: '创建新分类-' + keywords.keyWords,
                    value: keywords.keyWords,
                  })

                  return r;
                }}
              />

            </ModalForm>
            <div id='markdown-container' className='editor' style={{
              height: '80vh',
              marginTop: '20px',
            }}></div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="上传" key="2">

            <div>
              <Dragger name="dragger"

                onChange={(info) => {
                  const { status } = info.file;
                  // 只能上传pdf,docx, excel
                  var name = info.file.name
                  if (!name.endsWith(".pdf") && !name.endsWith(".docx") && !name.endsWith(".xlsx")) {
                    message.error("只能上传pdf,docx, excel")
                    return;
                  }
                }}
                customRequest={(files) => {
                  request(prefix + "/api/v1/doc/create/upload?book_uuid="+params.uuid, {
                    method: "POST",
                    data: {
                      book_uuid: params.uuid,
                      files: files.file,
                    },
                    headers: {
                      "Identify": localStorage.getItem("MD_token") || "",
                      "Content-Type": "multipart/form-data"
                    }
                  }).then((res) => {
                    if (res.code != 200) {
                      message.error(res.msg)
                    } else {
                      message.success("上传成功")
                      history.back();
                    }
                  })
                }}

              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            </div>


          </Tabs.TabPane>
        </Tabs>
      </div>

    </PageContainer>
  );
};

export default HomePage;
