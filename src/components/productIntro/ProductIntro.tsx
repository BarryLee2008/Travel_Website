import { Typography, Carousel, Image, Rate, Table } from 'antd'
import React from 'react'
import styles from './ProductIntro.module.css'
// 引入表格组件的column参数对应的类型
import { ColumnsType } from 'antd/es/table'
// 定义props的类型
interface propsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}
// 声明行配置，即每一个表头对应的那一列，应该填入什么类型的数据
interface DataType {
    title: string,
    // 表示description的值的类型可以是一下三种
    description: string | number | JSX.Element,
    // key表示每一行对应的标识符
    key: number
}
// 声明table 组件中的column参数。它是一个数组，表示表格中的第一行表头.
// ColumsType<>相等于应该特殊的Array<>，要在<>中传入数组元素的类型。从而规范每一行传入的数据类型。这样Table组件中的行和列才能链接起来
const columns: ColumnsType<DataType> = [
    // 一个对象表示一个表头
    {   //这个表头的名字
        title: 'title',
        // Display field of the data record, support nest path by string array
        dataIndex: 'title',
        // 该表头的唯一标识符，如果设置了dataIndex可以去掉key
        key: 'title',
        // 对齐方式
        align: 'left',
        // 宽度
        width: 120
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
        align: 'center'
    }
]
export const ProductIntro: React.FC<propsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    points,
    discount,
    rating,
    pictures
}) => {
    console.log(title)
    // 声明表格数据
    // DataType[]表示dataForTable的数据是一个数组，每个元素是接口DataType定义对象 
    const dataForTable: DataType[] = [
        {
            key: 0,
            title: '路线名称',
            description: title
        },
        {
            key: 1,
            title: '价格',
            // 表格可以直接把JSX.Element渲染出来
            description: (
                <>
                    ￥{''}
                    <Typography.Text type='danger'>{price}</Typography.Text>

                </>
            )
        },
        {
            key: 2,
            title: '限时抢折扣',
            // 进行判断如果有discount这参数的话返回第一个JSX.Element，不然返回第二个
            description: discount ? (
                <>
                    ￥
                    <Typography.Text delete>{price}</Typography.Text>
                    ￥
                    <Typography.Text type='danger' strong>{discount}</Typography.Text>
                </>
            ) : (
                <Typography.Text>暂无折扣</Typography.Text>
            )
        },
        {
            key: 3,
            title: '领取优惠券',
            description: coupons ? (
                discount
            ) : ('无优惠券可领')
        },
        {
            key: 4,
            title: '路线评价',
            description: (
                <>
                   
                    <Rate allowHalf defaultValue={Number(rating)} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating}星
                    </Typography.Text>
                </>
            )
        }
        
    ]
    return (
        <>
            <div className={styles['intro-container']}>
                {/* 产品详情页面title */}
                <Typography.Title level={4}>{title}</Typography.Title>
                {/* 产品描述 */}
                <Typography.Text>
                    {shortDescription}
                </Typography.Text>
                {/* 产品的详细信息 */}
                <div className={styles['intro-detail-content']}>
                    {/* 价格 */}
                    <Typography.Text style={{ marginLeft: 20 }}>
                        ￥ <span className={styles['intro-detail-strong-text']}>{price}</span>/人起
                    </Typography.Text>
                    <Typography.Text style={{ marginLeft: 50 }}>
                        <span>{rating}</span>分
                    </Typography.Text>
                </div>
                <Carousel autoplay>
                    {
                        pictures.map((item) => {
                            return <Image height={150} src={item} />
                        })
                    }
                </Carousel>
                <Table<DataType> dataSource={dataForTable} columns={columns} size="small"
                    bordered={false}
                    pagination={false}
                   />

            </div>
        </>
    )
}