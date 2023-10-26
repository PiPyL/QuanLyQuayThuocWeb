import { Button, Col, Input } from 'antd'
import React, { useState } from 'react'
import { getDatabase, ref, ref, set } from 'firebase/database'

const AddMedicineView = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleAddMedicine = () => {
        console.log(name)
        console.log(price)
        const db = getDatabase()
        const ref = ref(db, 'danhSachThuoc/')
        set(ref(db, 'danhSachThuoc/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        })
    }

    return (
        <Col>
            <Input value={name} placeholder='Tên thuốc' onChange={(e) => setName(e.target.value)} />
            <Input
                value={price}
                placeholder='Giá thuốc'
                onChange={(e) => setPrice(e.target.value)}
            />
            <Button title='Thêm' onClick={handleAddMedicine} />
        </Col>
    )
}

export default AddMedicineView
