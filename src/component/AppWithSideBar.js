import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SideBar from './SideBar'
import App from '../App'
import CreatePrescriptionScreen from './CreatePrescriptionScreen'
import PrescriptionsListScreen from './PrescriptionsListScreen'

const { Content } = Layout

const AppWithSideBar = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className='site-layout'>
                <Content>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/QuanLyQuayThuocWeb' element={<App />} />
                            <Route
                                path='/QuanLyQuayThuocWeb/prescription'
                                element={<CreatePrescriptionScreen />}
                            />
                            <Route
                                path='/QuanLyQuayThuocWeb/prescription-list'
                                element={<PrescriptionsListScreen />}
                            />
                        </Routes>
                    </BrowserRouter>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppWithSideBar
