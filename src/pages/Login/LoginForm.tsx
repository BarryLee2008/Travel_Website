import React, { useEffect } from "react";
import { Form, Checkbox, Button, Input } from 'antd'
import { userSliceAsyncThunk } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from '../../redux/hooks'
import{ useNavigate } from 'react-router-dom'
export const LoginForm:React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
      // 获取redux中的数据
      const loading = useSelector((state) => {
        return state.userLogin.loading
    })
    const errorLogin = useSelector((state)=>{
        return state.userLogin.error
    })
    const errorShoppingCart = useSelector((state)=>(state.ShoppingCart.error))
    const token = useSelector((state)=>{
        return state.userLogin.token
    } )
    // 判断token是否更新
    useEffect(()=>{

        if(token !== null && errorLogin === null && errorShoppingCart === null) {
            navigate('/')
        }

    },[token])
    // 成功后调用
    const onFinish = (values:any) => {
        dispatch(userSliceAsyncThunk({email:values.username,password:values.password}))
    }
    const onFinishFailed = (error:any) => {
        console.log(error)
    }
    return (<>
        <Form
            labelCol={{span:8}}
            wrapperCol={{span:10}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label= "Username"
                name= "username"
                rules={[{required:true, message: 'Please Enter Your Username', type:'email'}]}
            >
                <Input placeholder="Please Enter Your Username"/>
            </Form.Item>
            <Form.Item
                label = 'Password'
                name = 'password'
                rules={[{required:true, message: 'Please Enter Your Password'}]}
            >
                <Input.Password placeholder="Please Enter Your Password"/>
            </Form.Item>
            <Form.Item wrapperCol={{offset:8, span:10}}>
                <Checkbox>Remember Me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{offset:8, span:10}}>
                <Button htmlType="submit" type="primary" loading={loading}>Login</Button>
            </Form.Item>
        </Form>
    
    </>)
}