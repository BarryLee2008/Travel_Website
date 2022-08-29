import React from "react";
import { Typography, Image } from "antd"
import { Link } from 'react-router-dom' // 引入Link组件实现超链接
interface PropType {
    id: number | string,
    size: "small" | "large",
    imgSrc: string,
    price: number | string,
    title: string
}
export const ProductImages: React.FC<PropType> = ({ id, size, imgSrc, price, title }) => {
    return (
        <Link to={`/detail/${id}`}> {/* 这里相当于把组件变成了超链接，而且允许用户直接右键打开新标签*/}
            {size === 'large' ? 
            (<Image src={imgSrc} width={490} height={285}></Image>) 
            : 
            (<Image src={imgSrc} width={240} height={120}></Image>)
            }
            <div>
                <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
                {/* type是颜色，strong是加粗 */}
                <Typography.Text type="danger" strong>￥{price}起</Typography.Text>
            </div>
        </Link>
    )
}