import { Button, Col, Input } from 'antd'
import React, { useState } from 'react'
import { getDatabase, push, ref, set } from 'firebase/database'

const AddMedicineView = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [cost, setCost] = useState('')

    const handleAddMedicine = () => {
        if (name === '') {
            alert('Vui lòng nhập tên thuốc!')
            return
        }

        if (price === '') {
            alert('Vui lòng nhập giá thuốc!')
            return
        }

        const db = getDatabase()

        const databaseRef = ref(db, 'danhSachThuoc')
        const newRef = push(databaseRef)

        const timestamp = new Date().getTime()

        const data = {
            id: newRef.key,
            tenThuoc: name,
            gia: {
                [timestamp]: Number(price)
            },
            giaBan: cost,
            thoiGianTao: timestamp
        }

        set(newRef, data)
            // .then(() => alert('Thêm thuốc mới thành công!'))
            .catch((e) => console.log(e))

        setName('')
        setPrice('')
    }

    return (
        <Col align='middle'>
            <p>THÊM THUỐC</p>
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
            <Button onClick={handleAddMedicine} style={{ color: 'red ', marginTop: 8 }}>
                Thêm
            </Button>
        </Col>
    )
}

export default AddMedicineView
