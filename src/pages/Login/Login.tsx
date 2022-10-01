import React from "react";
import { UserLayout } from '../../layouts'
import { LoginForm } from './LoginForm'
export const Login: React.FC = () => {
    return (
        <UserLayout>
            <LoginForm/>
        </UserLayout>
    )
}