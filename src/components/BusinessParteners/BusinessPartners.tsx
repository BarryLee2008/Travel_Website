import React from "react";
import { Typography, Divider, Row, Col } from 'antd'
import styles from './BusinessPartners.module.css'
// 引入图片
import facebook from '../../assets/images/facebook-807588_640.png'
import follow from '../../assets/images/follow-826033_640.png'
import youtube from '../../assets/images/icon-720944_640.png'
import microsoft from '../../assets/images/microsoft-80658_640.png'

// 设置数组
const companyArry = [
    { src: facebook },
    { src: follow },
    { src: youtube },
    { src: microsoft }
]
export const BusinessPartners: React.FC = () => {
    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3}>
                    合作伙伴
                </Typography.Title>
            </Divider>
            <Row>
                {/*    {companyArry.map(
                    (item, index) => (
                        <Col span={6} key={`business-partner:${index}`}>
                            <img src={item.src} alt="business-partner"
                                style={{
                                    width: "80%",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                            </img>
                        </Col>
                    )

                )} */}
                {
                    companyArry.map(
                        (item, index) => {
                            // retrun不加大括号，除非是对象
                            return (
                                <Col span={6} key={`business-partner:${index}`}>
                                    <img src={item.src} alt="business-partner"
                                        style={{
                                            width: "80%",
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                    >
                                    </img>
                                </Col>
                            )
                        }
                    )
                }
            </Row>
            {/* 循环col */}
        </div >

    )
}