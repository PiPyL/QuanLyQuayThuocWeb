import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
    FileOutlined,
    FolderAddOutlined,
    MenuOutlined,
    PicRightOutlined,
    SearchOutlined,
    UnorderedListOutlined,
    UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

const SideBar = ({}) => {
    const navigate = useNavigate()
    const [indexSelected, setIndexSelected] = useState(['1'])

    return (
        <Sider width={210} theme='light'>
            <Menu mode='vertical' theme='light' selectedKeys={indexSelected}>
                <Menu.Item
                    key='1'
                    icon={<MenuOutlined />}
                    onClick={() => {
                        setIndexSelected(['1'])
                        navigate('/QuanLyQuayThuocWeb/')
                    }}
                >
                    Danh sách thuốc
                </Menu.Item>
                <Menu.Item
                    key='2'
                    icon={<PicRightOutlined />}
                    onClick={() => {
                        setIndexSelected(['2'])
                        navigate('/QuanLyQuayThuocWeb/prescription-list')
                    }}
                >
                    Danh sách đơn thuốc
                </Menu.Item>
                <Menu.Item
                    key='3'
                    icon={<FolderAddOutlined />}
                    onClick={() => {
                        setIndexSelected(['3'])
                        navigate('/QuanLyQuayThuocWeb/prescription')
                    }}
                >
                    Tạo đơn thuốc
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideBar
