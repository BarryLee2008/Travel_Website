import React, {PropsWithChildren} from "react";
import {Header,Footer} from '../../components'
import styles from './mainLayout.module.css'
// <MainLayout>JSX代码</MainLayout>，这个组件的中的JSX代码都会被props中的children属性所保留。所以说相当于JSX代码套上<MainLayout>这个组件的外壳。所以说本质上MainLayout组件相当于一个固定的布局
// PropsWithChildren表示children属性的类型，使得props能够接收JSX代码
export const MainLayout:React.FC<PropsWithChildren<{}>> = (props) => {
    return (<>
        <Header/>
        <div className={styles["content-container"]}>
            {props.children} {/* props.children就代表传入的JSX代码 */}
        </div>
        <Footer/>
    </>)
}
