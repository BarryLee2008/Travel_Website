import React, { useState } from "react";
import { MainLayout } from '../../layouts'
import { Row, Col, Modal } from 'antd'
import { useDispatch, useSelector } from '../../redux/hooks'
import { PaymentCard, ProductList } from '../../components'
import { clearshoppingCartAsyncThunk, checkOutshoppingCartAsyncThunk } from '../../redux/shoppingCart/ShoppingCartSlice'
import { useNavigate } from "react-router-dom";
export const ShoppingCart: React.FC = (props) => {
  const ShoppingCartItems = useSelector((state) => (state.ShoppingCart.itemsInShoppingCart))
  const shoppingCartLoading = useSelector((state) => { return state.ShoppingCart.loading })
  const error = useSelector((state)=>(state.ShoppingCart.error))
  const jwt = useSelector((state)=>{return state.userLogin.token}) as string
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // waring函数
  const warning = () => {
    Modal.warning({
      title:'No Item in The Shopping Cart ',
      content: 'Please Choose at least One Product into the Shopping Cart'
    })
  }
  return <>
    <MainLayout>
      <Row>
        {/*购物车中的商品 */}
        <Col span={16}>
          <ProductList
            data={ShoppingCartItems.map(item => item.touristRoute)}
          />
        </Col>
        {/* 结算卡片 */}
        <Col span={8}>
          <PaymentCard
            loading={shoppingCartLoading}
            // 先使用map函数形成一个元素全是价格的数组，然后用reduce函数把他们加起来
            originalPrice={ShoppingCartItems
              .map(item => item.originalPrice)
              .reduce((total, number) => total + number, 0)}
            price={ShoppingCartItems
              .map(item => item.discountPresent ? item.discountPresent * item.originalPrice : item.originalPrice * 1)
              .reduce((total, number) => total + number, 0)}
            onShoppingCartClear = { 
              () => {
                dispatch(clearshoppingCartAsyncThunk({jwt:jwt,itemIds:ShoppingCartItems.map(item => item.id)}))
              }
            }
            onCheckout = {()=>{
              // 当购物车为空的时候
              if(error == null && ShoppingCartItems.length <= 0 ) {
                warning()
                return
              }
              dispatch(checkOutshoppingCartAsyncThunk(jwt))
              if(error === null && ShoppingCartItems.length >= 1) {
                navigate('/payment')
              }
            }}
            
          />
         
        </Col>
      </Row>

    </MainLayout>
  </>
}