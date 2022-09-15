import React from "react";
import { Comment, List, Tooltip } from 'antd'
// 定义props类型
interface propsData {
    // 这个data是List标签中的数据。data中每个元素就是一个评论。每个元素包括action,author,avatar,content和datetime
    data: {
        author: string,
        avatar: string,
        content: string,
        createDate: string
    }[]
}
export const Comments: React.FC<propsData> = ({ data }) => {
    return (<>
        <List
            itemLayout="horizontal"
            dataSource={data}
            /* 这里是个回调函数 */
            renderItem={(item) => {/* item是data中每一个元素 */
                return (<li>
                    <Comment
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.createDate}

                    >
                    </Comment>
                </li>)

            }

            }
        >

        </List>
    </>)
}