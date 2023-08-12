import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import styles from './index.less';
import DocViewer from '@cyntler/react-doc-viewer';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Col, Row } from 'antd';
import BookItem from './BookItem';
import EmptyItem from './EmptyItem';
import prefix from '@/services/prefix';

const HomePage: React.FC = () => {

  const [data, setData] = useState<any>([])
  useEffect(()=>{
    request(prefix+"/api/v1/book/list", {
      headers:{
        "Identify": localStorage.getItem("MD_token") || ""
      }
    }).then((res)=>{
      setData(res.data)
    })
  }, [])

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <h1>👋 欢迎回来</h1>
        <Row style={{
          marginTop: '20px',
        }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
            {
              data.map((item: any, index: any)=>{
                return (
                 <Col key={index} xs={6} sm={8} md={8} lg={8}>
                  <BookItem uuid={item.UUID} title={item.Name} />
                  </Col>
                )   
            })
          }
          <Col key={"empty"} xs={6} sm={8} md={8} lg={8}>
                  <EmptyItem />
                  </Col>
            </Row>
            
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
           
            </Col>
        </Row>
       </div>
    </PageContainer>
  );
};

export default HomePage;
