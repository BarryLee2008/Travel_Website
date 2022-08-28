import React from "react";
import { Menu } from "antd"
import styles from "./SideMenu.module.css"
import { sideMenuList } from "./mockup"
import { GiftOutlined } from "@ant-design/icons"
export const SideMenu: React.FC = () => {
    return (
        <Menu mode="vertical"
              className={styles["side-menu"]}
              items={sideMenuList.map(
                (item) => {
                    return {
                        key: item.title,
                        label: item.title,
                        icon: <GiftOutlined  />,
                        /* children表示二级菜单，类容格式和一级菜单一样 */
                        children: item.subMenu.map((subItem) => {
                            return {
                                key:subItem.title,
                                label: subItem.title,
                                icon: <GiftOutlined />,
                                /* 三级菜单 */
                                children: subItem.subMenu.map((ssItem) => {
                                    return {
                                        key:ssItem,
                                        label:ssItem,
                                        icon: <GiftOutlined />
                                    }
                                })
                            }
                        })
                    }
                }
            )
            }    >

        </Menu>
    )
}