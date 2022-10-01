import React from "react";
import { Form, Checkbox, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SignUpForm: React.FC = () => {
  
    const navigate = useNavigate()
    // 表单成功提交后调用,即表单中的数据全部符合规定后调用
    const onFinish = async (values: any) => {
        // 传统写法
     /*    let p1 = axios.post('http://123.56.149.216:8080/auth/register',{
            email:values.username,
            password:values.password,
            confirmPassword: values.confirmation
        })
        p1.then(()=>{
          navigate('/login')
        }).catch((error)=>{
            console.log(error)
        }) */
        // async写法
        try {
            await axios.post('http://123.56.149.216:8080/auth/register',{
                email:values.username,
                password:values.password,
                confirmPassword: values.confirmation
            })
            navigate('/login')
        }catch(error){
            console.log(error)
        }  

    }
    // 表单失败后调用
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }
    const regPassword = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$");
    return (<>
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* 表单中每一个元素都有form.item包裹起来 */}
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: ' You Need to Enter an Username', type:'email' }]}
            >
                <Input placeholder="Please Enter Your Username" />
            </Form.Item>
            {/* 密码部分 */}
            <Form.Item
                label='Passwaord'
                name='password'
                rules={[{ required: true, message: 'You Need to Enter Your Password', pattern: regPassword }]}
                hasFeedback
            >
                <Input.Password placeholder="The Password You Enter should have 8 - 16 digits and must include number, uppercase and lowercase letter " />
            </Form.Item>
            {/* 校验密码 */}
            <Form.Item
                label='Confirm the Password'
                name='confirmation'
                rules={[{ required: true, message: 'You need to enter the password twice for confirmation' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (getFieldValue('password') === value) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject(new Error('The two passwords you entered do not match!'))
                        }
                    }
                })
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Please enter the password again" />
            </Form.Item>
            {/* 记住按钮 */}
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 10 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* 提交按钮 */}
            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>)
}