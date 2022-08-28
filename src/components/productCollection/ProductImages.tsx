import React from "react";
import { Typography, Image } from "antd"
interface PropType {
    id: number | string,
    size: "small" | "large",
    imgSrc: string,
    price: number | string,
    title: string
}
export const ProductImages: React.FC<PropType> = ({ id, size, imgSrc, price, title }) => {
    return (
        <>
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
        </>
    )
}