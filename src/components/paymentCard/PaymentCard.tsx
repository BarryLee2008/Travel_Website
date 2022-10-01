import React from "react";
import {
    Skeleton,
    Switch,
    Card,
    Avatar,
    Button,
    Typography,
    Space,
    Tag,
    Table,
} from "antd";
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
interface propsType {
    loading: boolean;
    originalPrice: number;
    price: number;
    onShoppingCartClear: () => void;
    onCheckout: () => void;
}
interface item {
    item: string,
    amount: string | number | JSX.Element,
    key: number
}
const columns: ColumnsType<item> = [
    {
        title: '项目',
        dataIndex: 'item',
        key: 'item'
    },
    {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount'
    }
]

export const PaymentCard: React.FC<propsType> = (props) => {
    const dataSource: item[] = [
        {
            item: '原价',
            amount: <Typography.Text delete>￥{props.originalPrice}</Typography.Text>,
            key: 1
        },
        {
            item: '现价',
            amount: <Typography.Text type="danger">￥{props.price}</Typography.Text>,
            key: 2
        }
    ]
    return <>
        <Card style={{ width: 300, marginTop: 16 }}
            actions={
                [
                    <Button type="primary" danger loading={props.loading} onClick={props.onCheckout}> <CheckCircleOutlined /> 结算 </Button>,
                    <Button type="primary" danger loading={props.loading} onClick={props.onShoppingCartClear}><DeleteOutlined /> 清空 </Button>
                ]
            }
        >
            {/* loading表示只要为真就执行skeleton；active表示会有动画效果  */}
            <Skeleton loading={props.loading} active>
                <Card.Meta
                    title='总计'
                    description={<Table<item>
                        columns={columns}
                        dataSource={dataSource}
                        showHeader={false}
                        size="small"
                        bordered={false}
                        pagination={false}
                    />}
                ></Card.Meta>
            </Skeleton>
        </Card>
    </>
}