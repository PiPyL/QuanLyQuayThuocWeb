import React, { useEffect, useState } from 'react'
import { database } from './firebase.js'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Button, Col, Input, Row } from 'antd'
import AddMedicineView from './component/AddMedicineView.js'
import UpdateMedicineView from './component/UpdateMedicineView.js'
import Utils from './controler/Utils.js'
import AppManager from './controler/AppManager.js'
import MedicationModel from './models/MedicationModel.js'
import { useNavigate } from 'react-router-dom'
import SideBar from './component/SideBar.js'

const App = () => {
    const [data, setData] = useState([])
    const [dataShow, setDataShow] = useState([])
    const [medicineSelected, setMedicineSelected] = useState(null)
    const db = getDatabase()
    const navigate = useNavigate()

    useEffect(() => {
        const starCountRef = ref(db, 'danhSachThuoc')
        onValue(starCountRef, (snapshot) => {
            let data = Object.values(snapshot.val() ?? [])
            data = data.sort((a, b) =>
                a?.tenThuoc.toLowerCase() > b?.tenThuoc.toLowerCase() ? 1 : -1
            )
            // setData(data)
            // setDataShow(data)
            const models = Object.values(data).map((e) => new MedicationModel(e))
            AppManager.shared.medications = models
            setData(models)
            setDataShow(models)
        })
    }, [])

    const getPrice = (info) => {
        // const prices = Object.values(info?.pri ?? [])
        // return Utils.formatVND(prices[prices.length - 1])
        return Utils.formatVND(info?.price)
    }

    const handleInputSearch = (e) => {
        const text = e.target.value
        if (text == '') {
            setDataShow(data)
            return
        }
        const dataFilter = data.filter((thuoc) =>
            thuoc?.name?.toLowerCase().includes(text.toLowerCase())
        )
        setDataShow(dataFilter)
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>NHÀ THUỐC PHAN HƯƠNG</h1>
            <Row style={{ paddingTop: 12 }}>
                <Col style={{ flex: 1 }} />
                <Col style={{ width: 360 }}>
                    {/* <Row>
                        <Button
                            style={{
                                marginRight: 4
                            }}
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Tạo đơn thuốc
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('prescription-list')
                            }}
                        >
                            Danh sách đơn thuốc
                        </Button>
                    </Row> */}
                    <Row style={{ marginBottom: 8, marginTop: 12 }}>
                        <Input placeholder='Nhập để tìm kiếm...' onChange={handleInputSearch} />
                    </Row>
                    {dataShow.map((e, index) => (
                        <Row
                            onClick={() => {
                                setMedicineSelected(e)
                            }}
                            style={{
                                height: 30,
                                alignItems: 'center',
                                background: medicineSelected?.name == e?.name ? '#c9c9c9' : 'white',
                                paddingLeft: 16
                            }}
                        >
                            <Col
                                style={{
                                    width: 200
                                }}
                            >
                                {index + 1} - {e?.name}
                            </Col>
                            <Col style={{}}>
                                {getPrice(e)} - {e?.cost ? Utils.formatVND(e?.cost) : ''}
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col style={{ width: 300, marginLeft: 20 }}>
                    <AddMedicineView />
                    <Row style={{ height: 0 }} />
                    {medicineSelected && <UpdateMedicineView info={medicineSelected} />}
                </Col>
                <Col style={{ flex: 1 }} />
            </Row>
        </div>
    )
}

export default App
