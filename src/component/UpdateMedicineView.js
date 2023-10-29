import { Button, Col, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set, update } from 'firebase/database'
import moment from 'moment'

const UpdateMedicineView = ({ info }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const getPrice = () => {
        const prices = Object.values(info?.gia ?? [])
        setPrice(prices[prices.length - 1])
    }

    useEffect(() => {
        setName(info?.tenThuoc)
        getPrice()
    }, [info])

    const handleEditMedication = () => {
        if (name === '') {
            window.alert('Thông báo', 'Vui lòng nhập tên thuốc!')
            return
        }

        if (price === '') {
            window.alert('Thông báo', 'Vui lòng nhập giá thuốc!')
            return
        }

        const db = getDatabase()

        if (price !== info?.price) {
            const newRef = ref(db, `/danhSachThuoc/${info?.id}/gia/`)

            update(newRef, {
                [new Date().getTime()]: Number(price)
            }).then(() => {
                if (name !== info?.name) {
                    const nameRef = ref(db, `/danhSachThuoc/${info?.id}`)
                    update(nameRef, { tenThuoc: name })
                }
            })
        }

        if (name !== info?.name) {
            const nameRef = ref(db, `/danhSachThuoc/${info?.id}`)
            update(nameRef, { tenThuoc: name })
        }
    }

    return (
        <Col>
            <p>Cập nhật</p>
            <Input value={name} placeholder='Tên thuốc' onChange={(e) => setName(e.target.value)} />
            <Input
                value={price}
                placeholder='Giá thuốc'
                onChange={(e) => setPrice(e.target.value)}
            />
            <p>Lịch sử giá</p>
            {Object.values(info?.gia) > 0 &&
                Object.values(info?.gia).map((e, index) => {
                    return (
                        <Row>
                            {moment(new Date(Number(Object.keys(info?.gia)[index]))).format(
                                'DD/MM/yyyy'
                            )}
                            {' - '}
                            {e}
                        </Row>
                    )
                })}
            <Button onClick={handleEditMedication} style={{ color: 'red' }}>
                Cập nhật
            </Button>
        </Col>
    )
}

export default UpdateMedicineView
