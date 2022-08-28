import React from "react";
import { Divider, Col, Row, Typography } from 'antd'
import style from "./ProductCollection.module.css";
import { ProductImages } from "./ProductImages";
// 定义函数组件的参数的类型
interface PropType {
    title: JSX.Element,
    sideImage: string,
    product: any[]
}
export const ProductCollection: React.FC<PropType> = ({ title, sideImage, product }) => { // 展开运算
    return (
        <div className={style.content}>
            <Divider orientation="left"> {title} </Divider>
            <Row>
                {/* 宣传栏左边的图片 */}
                <Col span={4}>
                    <img src={sideImage} alt="sideImage" className={style["side-image"]}></img>
                </Col>
                {/* 宣传栏右边的图片 */}
                <Col span={20}>
                    {/* 第一行图片。一张大图四张小图 */}
                    <Row>
                        {/* 大图片 */}
                        <Col span={12}>
                            <ProductImages
                                id={product[0].id}
                                size={'large'}
                                imgSrc={product[0].touristRoutePictures[0].url}
                                price={product[0].price}
                                title={product[0].title}
                            />
                        </Col>
                        {/* 小图片 */}
                        <Col span={12}>
                            {/* 第一行小图片 */}
                            <Row>
                                <Col span={12}>
                                    <ProductImages
                                        id={product[1].id}
                                        size={'small'}
                                        imgSrc={product[1].touristRoutePictures[0].url}
                                        price={product[1].price}
                                        title={product[1].title}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImages
                                        id={product[2].id}
                                        size={'small'}
                                        imgSrc={product[2].touristRoutePictures[0].url}
                                        price={product[2].price}
                                        title={product[2].title}
                                    />
                                </Col>
                            </Row>
                            {/* 第二行小图片 */}
                            <Row>
                                <Col span={12}>
                                    <ProductImages
                                        id={product[3].id}
                                        size={'small'}
                                        imgSrc={product[3].touristRoutePictures[0].url}
                                        price={product[3].price}
                                        title={product[3].title}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProductImages
                                        id={product[4].id}
                                        size={'small'}
                                        imgSrc={product[4].touristRoutePictures[0].url}
                                        price={product[4].price}
                                        title={product[4].title}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* 第二行图片。一行四张小图片 */}
                    <Row>
                        <Col span={6}>
                            <ProductImages
                                id={product[5].id}
                                size={'small'}
                                imgSrc={product[5].touristRoutePictures[0].url}
                                price={product[5].price}
                                title={product[5].title}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImages
                                id={product[6].id}
                                size={'small'}
                                imgSrc={product[6].touristRoutePictures[0].url}
                                price={product[6].price}
                                title={product[6].title}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImages
                                id={product[7].id}
                                size={'small'}
                                imgSrc={product[7].touristRoutePictures[0].url}
                                price={product[7].price}
                                title={product[7].title}
                            />
                        </Col>
                        <Col span={6}>
                            <ProductImages
                                id={product[8].id}
                                size={'small'}
                                imgSrc={product[8].touristRoutePictures[0].url}
                                price={product[8].price}
                                title={product[8].title}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}