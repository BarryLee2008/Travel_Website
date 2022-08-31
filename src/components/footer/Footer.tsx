import React from "react";
import {Layout,Typography} from "antd"

// 引入i8n的钩子函数
import { useTranslation } from 'react-i18next'
export const Footer:React.FC = () =>{
  const { t } = useTranslation() // 返回的一个对象，这里是展开表达式直接获得对象的值
  const t1 = useTranslation().t // 等同上面的写法
  console.log(t,t1)
    return (
        <Layout.Footer>
        <Typography.Title style={{textAlign:'center'}}>
          {t('footer.detail')}
        </Typography.Title>
      </Layout.Footer> 
    )
}