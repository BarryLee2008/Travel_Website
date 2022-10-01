import React from "react";
import { Card } from 'antd'
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs'
import images from '../../../node_modules/react-payment-inputs/images'
import styles from './paymentForm.module.css'
export const PaymentForm = () => {
    // 用usePaymentInputs方法获得一些列props getter函数。即每个input 属性都由这些函数获得
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs();

    return (
        <Card
            title="信用卡"
            bordered={false}
            className={styles["payment-credit-card"]}
        >
            <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} />
                <input {...getExpiryDateProps()} />
                <input {...getCVCProps()} />
            </PaymentInputsWrapper>
        </Card>
    );
};

