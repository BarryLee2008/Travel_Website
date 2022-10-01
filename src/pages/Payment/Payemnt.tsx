import React from "react";
import { Col, Row } from 'antd'
import { MainLayout } from '../../layouts'
import { PaymentForm, CheckOutCard } from '../../components'
import { payOrdersAsyncThunk } from '../../redux/placeOrder/order'
import { useDispatch, useSelector } from '../../redux/hooks'
export const Payemnt: React.FC = () => {
    const loading = useSelector((state) => {
        return state.order.loading
    })
    const currentOrder = useSelector((state) => {
        return state.order.currentOrder
    })
    const jwt = useSelector((state) => {
        return state.userLogin.token
    }) as string
    const error = useSelector((state) => {
        return state.order.error
    })
    const dispatch = useDispatch()
    console.log(currentOrder)
    return <>
        <MainLayout>
            <Row>
                <Col span={13}>
                    <PaymentForm />
                </Col>
                <Col span={11}>
                    <CheckOutCard
                        order={currentOrder}
                        error={error}
                        loading={loading}
                        onCheckout={() => {
                            dispatch(payOrdersAsyncThunk({ jwt: jwt, orderId: currentOrder.id }))
                        }}

                    />
                </Col>
            </Row>
        </MainLayout>
    </>
}