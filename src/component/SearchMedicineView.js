import { Input, List } from 'antd'
import React, { useEffect, useState } from 'react'
import AppManager from '../controler/AppManager'

const SearchMedicineView = ({ didSelectMedicine }) => {
    const [medications, setMedications] = useState([])

    const handleSearchMedicines = (e) => {
        const text = e.target.value
        const arr = AppManager.shared.medications.filter((e) => {
            return e?.name?.toLowerCase().includes(text.toLowerCase())
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
                renderItem={(item, index) => (
                    <div onClick={() => didSelectMedicine(item)}>{item?.name}</div>
                )}
                style={{ height: '400px', overflowY: 'auto', marginTop: 12 }}
                rowKey={(item) => item?.id}
            />
        </div>
    )
}

export default SearchMedicineView
