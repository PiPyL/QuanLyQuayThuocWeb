import React, { useEffect, useState } from 'react'
import { database } from './firebase.js'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Col, Input, Row } from 'antd'
import AddMedicineView from './component/AddMedicineView.js'
import UpdateMedicineView from './component/UpdateMedicineView.js'
import Utils from './controler/Utils.js'

const App = () => {
    const [data, setData] = useState([])
    const [dataShow, setDataShow] = useState([])
    const [medicineSelected, setMedicineSelected] = useState(null)
    const db = getDatabase()

    useEffect(() => {
        const starCountRef = ref(db, 'danhSachThuoc')
        onValue(starCountRef, (snapshot) => {
            let data = Object.values(snapshot.val() ?? [])
            data = data.sort((a, b) =>
                a?.tenThuoc.toLowerCase() > b?.tenThuoc.toLowerCase() ? 1 : -1
            )
            setData(data)
            setDataShow(data)
        })
    }, [])

    const getPrice = (info) => {
        const prices = Object.values(info?.gia ?? [])
        return Utils.formatVND(prices[prices.length - 1])
    }

    const handleInputSearch = (e) => {
        const text = e.target.value
        if (text == '') {
            setDataShow(data)
            return
        }
        const dataFilter = data.filter((thuoc) =>
            thuoc?.tenThuoc?.toLowerCase().includes(text.toLowerCase())
        )
        setDataShow(dataFilter)
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>NHÀ THUỐC PHAN HƯƠNG</h1>
            <Row style={{}}>
                <Col style={{ flex: 1 }} />
                <Col style={{ width: 300 }}>
                    <Row style={{ marginBottom: 8 }}>
                        <Input placeholder='Nhập để tìm kiếm...' onChange={handleInputSearch} />
                    </Row>
                    {dataShow.map((e) => (
                        <Row
                            onClick={() => {
                                setMedicineSelected(e)
                            }}
                            style={{
                                height: 30,
                                alignItems: 'center'
                            }}
                        >
                            <Col
                                style={{
                                    width: 200
                                }}
                            >
                                {e?.tenThuoc}
                            </Col>
                            <Col style={{}}>{getPrice(e)}</Col>
                        </Row>
                    ))}
                </Col>
                <Col style={{ width: 300, marginLeft: 20 }}>
                    <AddMedicineView />
                    {medicineSelected && <UpdateMedicineView info={medicineSelected} />}
                </Col>
                <Col style={{ flex: 1 }} />
            </Row>
        </div>
    )
}

export default App
