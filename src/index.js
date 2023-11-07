import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CreatePrescriptionScreen from './component/CreatePrescriptionScreen'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import PrescriptionsListScreen from './component/PrescriptionsListScreen'
import AppWithSideBar from './component/AppWithSideBar'
import SideBar from './component/SideBar'
import Layout, { Content } from 'antd/es/layout/layout'
import { Row, Switch } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Layout style={{ minHeight: '100vh' }}>
        <Layout className='site-layout'>
            <Content>
                <BrowserRouter>
                    <Row>
                        <SideBar />
                        <Row style={{ flex: 1, justifyContent: 'center', background: 'white' }}>
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
                        </Row>
                    </Row>
                    ?
                </BrowserRouter>
            </Content>
        </Layout>
    </Layout>
)

// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/QuanLyQuayThuocWeb' element={<App />} />
//                 <Route
//                     path='/QuanLyQuayThuocWeb/prescription'
//                     element={<CreatePrescriptionScreen />}
//                 />
//                 <Route
//                     path='/QuanLyQuayThuocWeb/prescription-list'
//                     element={<PrescriptionsListScreen />}
//                 />
//             </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
