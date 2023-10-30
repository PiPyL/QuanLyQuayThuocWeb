import { Input, List } from 'antd'
import React, { useEffect, useState } from 'react'
import AppManager from '../controler/AppManager'

const SearchMedicineView = () => {
    const [medications, setMedications] = useState([])

    const handleSearchMedicines = (e) => {
        const text = e.target.value
        console.log(text)
        const arr = AppManager.shared.medications.filter((e) => {
            console.log(e?.name?.toLowerCase().includes(text.toLowerCase()) ? 1 : -1)
            return e?.name?.toLowerCase().includes(text.toLowerCase()) ? 1 : -1
        })
        setMedications([...arr])
    }

    useEffect(() => {
        setMedications(AppManager.shared.medications)
    }, [])

    return (
        <div>
            <Input placeholder='Nhập tên thuốc...' onChange={handleSearchMedicines} />
            <List
                dataSource={medications}
                renderItem={(item, index) => <div>{item?.name}</div>}
                style={{ height: '400px', overflowY: 'auto', marginTop: 12 }}
                rowKey={(item) => item?.id}
            />
        </div>
    )
}

export default SearchMedicineView
