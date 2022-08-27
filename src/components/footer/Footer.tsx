import React from "react";
import {Layout,Typography} from "antd"


export const Footer:React.FC = () =>{
    return (
        <Layout.Footer>
        <Typography.Title style={{textAlign:'center'}}>
          版权所有@BarryLee
        </Typography.Title>
      </Layout.Footer> 
    )
}