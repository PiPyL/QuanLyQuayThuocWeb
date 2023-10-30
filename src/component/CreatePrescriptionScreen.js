import React, { useEffect, useState } from 'react'
import MediacationItem from './MediacationItem'
import { List, Modal } from 'antd'
import MedicationInfoModel from '../models/MedicationInfoModel'
import SearchMedicineView from './SearchMedicineView'

const CreatePrescriptionScreen = () => {
    const [medicationsInfo, setMedicationsInfo] = useState([])
    const [indexSelected, setIndexSelected] = useState(null)
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const setDefaultData = () => {
        setMedicationsInfo([])
        let arr = []
        for (let i = 1; i <= 50; i++) {
            const model = new MedicationInfoModel({})
            arr.push(model)
        }
        setMedicationsInfo([...arr])
    }

    const onSelectMedication = (index) => {
        setIndexSelected(index)
        showModal()
    }

    const onInputedQuanity = (quantity, index) => {
        let medication = medicationsInfo[index]
        medication?.setQuantity(quantity)

        let arr = [...medicationsInfo]
        arr[index] = medication

        setMedicationsInfo(arr)
    }

    const onInputedPrice = (price, index) => {
        let medication = medicationsInfo[index]
        medication?.setPrice(price)

        console.log(medication)

        let arr = [...medicationsInfo]
        arr[index] = medication

        setMedicationsInfo(arr)
    }

    useEffect(() => {
        setDefaultData()
    }, [])

    return (
        <div>
            <List
                dataSource={medicationsInfo}
                renderItem={(item, index) => (
                    <MediacationItem
                        item={item}
                        index={index}
                        onSelectMedication={() => onSelectMedication(index)}
                        onInputedQuanity={(quantity) => onInputedQuanity(quantity, index)}
                        onInputedPrice={(price) => onInputedPrice(price, index)}
                    />
                )}
                grid={{ column: 4 }}
                style={{ width: 216 * 4 }}
            />
            <Modal
                title='Chọn thuốc'
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Xong'
                cancelText='Hủy'
            >
                <SearchMedicineView />
            </Modal>
        </div>
    )
}

export default CreatePrescriptionScreen
