import React from "react";
import { Table, Card, Typography, Button, Skeleton  } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
interface propsType {
    loading: boolean,
    error: any,
    order:any,
    onCheckout:() => void
}
interface orderItems {
    key:number,
    item:string,
    amount:string | number | JSX.Element
}
const columns:ColumnsType<orderItems> = [
    {
        title: '产品',
        dataIndex: 'item',
        key:'item'
    },
    {
        title:'价格',
        dataIndex:'amount',
        key:'amount'
    }
]

export const CheckOutCard:React.FC<propsType> = ({loading,error,onCheckout,order}) => {
    const navigate = useNavigate()
    const dataSource:orderItems[] = order ? order.orderItems.map((i,key) => (
        {
            key:key,
            item:i.touristRoute.title,
            amount:(
                <>
                    <Typography.Text delete>{i.originalPrice}</Typography.Text>
                    <Typography.Text strong type="danger"> ¥ {i.originalPrice * i.discountPresent}</Typography.Text>
                </>
            )
        }
    )) : []
    return (
        <Card
            actions={[
                order&&order.state === 'Completed' ? (
                    <Button   onClick={()=>{navigate('/')}}>
                        <HomeOutlined/>
                        订单完成,回到首页
                    </Button>
                ) : (<Button type="primary" onClick={onCheckout} loading={loading}><CheckCircleOutlined/>提交订单</Button>)
            ]}
        >
           <Skeleton active loading={loading}>
                <Card.Meta
                    title={
                        order&&order.state === 'Completed' ? (<Typography.Title level={3}>
                               支付成功
                        </Typography.Title>) : (<Typography.Title>
                               总计
                        </Typography.Title>)
                    }
                    description={
                        <Table<orderItems>
                              columns={columns}
                              dataSource={dataSource}
                              showHeader={false}
                              size="small"
                              bordered={false}
                              pagination={false}
                            />
                    }
                />
           </Skeleton>
        </Card>
    )
}