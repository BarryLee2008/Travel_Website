import React from "react";
import styles from "./Signup.module.css"
import { UserLayout } from '../../layouts'
import { SignUpForm } from './SignUpForm'
export const Signup: React.FC = () => {
    return (
        <UserLayout>
            <SignUpForm/>
        </UserLayout>
    )
}