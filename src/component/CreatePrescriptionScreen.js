import React, { useEffect, useState } from 'react'
import MediacationItem from './MediacationItem'
import { Button, Col, DatePicker, List, Modal, Row, Typography } from 'antd'
import MedicationInfoModel from '../models/MedicationInfoModel'
import SearchMedicineView from './SearchMedicineView'
import { getDatabase, set, ref, push, get } from 'firebase/database'
import Utils from '../controler/Utils'
import locale from 'antd/es/date-picker/locale/vi_VN'
import moment from 'moment'
import dayjs from 'dayjs'
import SideBar from './SideBar'
import AppManager from '../controler/AppManager'
import MedicationModel from '../models/MedicationModel'

const CreatePrescriptionScreen = () => {
    const [medicationsInfo, setMedicationsInfo] = useState([])
    const [indexSelected, setIndexSelected] = useState(null)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(null)

    const getTotalProfit = () => {
        let total = 0

        medicationsInfo.forEach((item) => {
            const a = item?.price * item?.quantity - item?.medication?.price * item?.quantity
            total += isNaN(Number(a)) ? 0 : Number(a)
        })

        return `${Utils.formatVND(total)}`
    }

    const createPrescription = () => {
        let arr = medicationsInfo.filter((e) => {
            return (
                e?.name != null &&
                e?.name != '' &&
                e?.quantity != null &&
                e?.quantity != '' &&
                e?.price != null &&
                e?.price != ''
            )
        })

        let medications = arr.map((e) => {
            return {
                id: e?.medication?.id,
                giaBan: e?.price,
                soLuong: e?.quantity,
                gia: e?.medication?.price
            }
        })

        if (medications.length == 0) {
            alert('Thông báo', 'Vui lòng nhập thuốc để tạo đơn')
            return
        }

        const db = getDatabase()

        const databaseRef = ref(db, 'donThuoc')
        const newRef = push(databaseRef)

        const selectedDate = new Date(date.toISOString()).getTime()
        let data = {
            thoiGianTao: selectedDate,
            danhSachThuoc: medications,
            id: newRef.key
        }

        set(newRef, data)
            .then(setDefaultData)
            .catch((err) => console.log(err))
    }

    const setDefaultData = async () => {
        console.log('reset data')
        setMedicationsInfo([])
        let arr = []
        for (let i = 1; i <= 50; i++) {
            const model = new MedicationInfoModel({})
            arr.push(model)
        }
        setMedicationsInfo([...arr])

        const db = getDatabase()
        const newRef = ref(db, '/danhSachThuoc')
        if (AppManager.shared.medications.length == 0) {
            const snapshot = await get(newRef)
            let data = Object.values(snapshot.val() ?? [])
            data = data.sort((a, b) =>
                a?.tenThuoc.toLowerCase() > b?.tenThuoc.toLowerCase() ? 1 : -1
            )
            const models = Object.values(data).map((e) => new MedicationModel(e))
            AppManager.shared.medications = models
        }
    }

    const onSelectMedication = (index) => {
        setIndexSelected(index)
        setVisible(true)
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

        let arr = [...medicationsInfo]
        arr[index] = medication

        setMedicationsInfo(arr)
    }

    const didSelectMedicine = (item) => {
        let medication = medicationsInfo[indexSelected]
        medication?.setMedication(item)

        let arr = [...medicationsInfo]
        arr[indexSelected] = medication
        setMedicationsInfo(arr)

        setIndexSelected(null)
        setVisible(false)
    }

    useEffect(() => {
        setDefaultData()
    }, [])

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>TẠO ĐƠN</h1>
            <Row style={{ justifyContent: 'center', marginBottom: 16 }}>
                <DatePicker
                    placeholder='Chọn ngày'
                    defaultValue={dayjs(new Date())}
                    onChange={(date, dateString) => {
                        if (date) {
                            setDate(date)
                        }
                    }}
                />
            </Row>
            <Row
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16
                }}
            >
                <Row
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16
                    }}
                >
                    Tổng tiền lời:{' '}
                    <Typography style={{ marginLeft: 8 }}>{getTotalProfit()}</Typography>
                </Row>
                <Button type='primary' onClick={createPrescription} style={{ width: 100 }}>
                    Tạo đơn
                </Button>
            </Row>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            </Col>
            <Modal
                title='Chọn thuốc'
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                okText='Xong'
                cancelText='Hủy'
                footer={null}
            >
                <SearchMedicineView didSelectMedicine={didSelectMedicine} />
            </Modal>
        </div>
    )
}

export default CreatePrescriptionScreen
