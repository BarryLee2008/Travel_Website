import React from 'react'
import { Dropdown, Layout, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import styles from './userLayout.module.css'

// 定义children的接口
interface propsType {
    children: React.ReactNode
}
// 定义布局组件
export const UserLayout: React.FC<propsType> = (props) => {
    const menu = (<Menu

        items={[{ label: '中文', key: 'zh' }, { label: 'English', key: 'en' }]}>

    </Menu>)
    return (<>
        <Layout className={styles['user-layout-container']}>
            {/* 头部类容 */}
            <Layout.Header className={styles.header}>
                <div className={styles.lang}> 
                    <Dropdown.Button
                        overlay={menu}
                        icon={<CaretDownOutlined />}
                    >
                        选择语言
                    </Dropdown.Button>
                </div>
            </Layout.Header>
            {/* 中间主体类容 */}
            <Layout.Content className={styles.content}>
                <div className={styles.top}>
                    <div className={styles['content-header']}>
                        <Link to='/'>
                            <img src={logo} alt="logo" className={styles.logo}/>
                            <span className={styles.title}>旅游网</span>
                        </Link>
                    </div>
                    {/* 网站描述 */}
                    <div className={styles.desc}>
                        随便写的，就是装饰
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </Layout.Content>
            <Layout.Footer style={{textAlign:'center'}}>copyright 2011-2022</Layout.Footer>
        </Layout>
    </>)
}