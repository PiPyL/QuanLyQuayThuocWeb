import { Button, Col, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set, update } from 'firebase/database'
import moment from 'moment'
import Utils from '../controler/Utils'

const UpdateMedicineView = ({ info }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [cost, setCost] = useState('')

    useEffect(() => {
        setName(info?.name)
        setPrice(info?.price)
        setCost(info?.cost)
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
                console.log('nameeeee')
                if (name !== info?.name) {
                    const nameRef = ref(db, `/danhSachThuoc/${info?.id}`)
                    update(nameRef, { tenThuoc: name })
                }
                console.log('costttttt')
                if (cost !== info?.cost) {
                    const nameRef = ref(db, `/danhSachThuoc/${info?.id}`)
                    update(nameRef, { giaBan: cost })
                }
            })
            return
        }

        const nameRef = ref(db, `/danhSachThuoc/${info?.id}`)
        let data = {}
        if (name != info?.name) {
            data = {
                tenThuoc: name
            }
        }
        if (cost != info?.cost) {
            data = {
                ...data,
                giaBan: cost
            }
        }
        update(nameRef, data)
    }

    return (
        <Col align='middle' style={{ marginTop: 20 }}>
            <p>CẬP NHẬT THUỐC</p>
            <Input value={name} placeholder='Tên thuốc' onChange={(e) => setName(e.target.value)} />
            <Input
                value={price}
                placeholder='Giá thuốc'
                onChange={(e) => setPrice(e.target.value)}
                style={{ marginTop: 8 }}
            />
            <Input
                value={cost}
                placeholder='Giá bán'
                onChange={(e) => setCost(e.target.value)}
                style={{ marginTop: 8 }}
            />
            <Button onClick={handleEditMedication} style={{ color: 'red', marginTop: 8 }}>
                Cập nhật
            </Button>
            <p>Lịch sử giá</p>
            {info?.prices.length > 0 &&
                info?.prices.map((e, index) => {
                    return (
                        <Row>
                            {moment(new Date(Number(e?.createdAt))).format('DD/MM/yyyy')}
                            {' - '}
                            {Utils.formatVND(e?.price)}
                        </Row>
                    )
                })}
            {/* {Object.values(info?.price) > 0 &&
                Object.values(info?.gia).map((e, index) => {
                    return (
                        <Row>
                            {moment(new Date(Number(Object.keys(info?.gia)[index]))).format(
                                'DD/MM/yyyy'
                            )}
                            {' - '}
                            {Utils.formatVND(e)}
                        </Row>
                    )
                })} */}
        </Col>
    )
}

export default UpdateMedicineView
