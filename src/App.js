import React, { useEffect, useState } from 'react'
import { database } from './firebase.js'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Col, Input, Row } from 'antd'
import AddMedicineView from './component/AddMedicineView.js'

const App = () => {
    const [data, setData] = useState([])
    const [dataShow, setDataShow] = useState([])
    const db = getDatabase()

    useEffect(() => {
        const starCountRef = ref(db, 'danhSachThuoc')
        onValue(starCountRef, (snapshot) => {
            let data = Object.values(snapshot.val() ?? [])
            data = data.sort((a, b) => (a?.tenThuoc > b?.tenThuoc ? 1 : -1))
            setData(data)
            setDataShow(data)
        })
    }, [])

    const getPrice = (info) => {
        const prices = Object.values(info?.gia ?? [])
        return prices[prices.length - 1]
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
            <Row>
                <Col>
                    <Row>
                        <Input placeholder='Nhập để tìm kiếm...' onChange={handleInputSearch} />
                    </Row>
                    {dataShow.map((e) => (
                        <Row>
                            <Col
                                style={{
                                    width: 200
                                }}
                            >
                                {e?.tenThuoc}
                            </Col>
                            <Col>{getPrice(e)}</Col>
                        </Row>
                    ))}
                </Col>
                <AddMedicineView />
            </Row>
        </div>
    )
}

export default App
