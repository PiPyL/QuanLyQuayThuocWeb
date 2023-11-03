import React, { useEffect, useState } from 'react'
import MediacationItem from './MediacationItem'
import { Button, Col, List, Modal, Row, Typography } from 'antd'
import MedicationInfoModel from '../models/MedicationInfoModel'
import SearchMedicineView from './SearchMedicineView'
import { getDatabase, set, ref, push, get, update } from 'firebase/database'
import Utils from '../controler/Utils'
import AppManager from '../controler/AppManager'
import MedicationModel from '../models/MedicationModel'
import moment from 'moment'

const EditPrescriptionScreen = ({ item }) => {
    const [medicationsInfo, setMedicationsInfo] = useState([])
    const [indexSelected, setIndexSelected] = useState(null)
    const [visible, setVisible] = useState(false)

    const getTotalProfit = () => {
        let total = 0

        medicationsInfo.forEach((item) => {
            const a = item?.price * item?.quantity - item?.medication?.price * item?.quantity
            total += isNaN(Number(a)) ? 0 : Number(a)
        })

        return `${Utils.formatVND(total)}`
    }

    const updatePrescription = () => {
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

        const databaseRef = ref(db, 'donThuoc/' + item?.id)

        let data = {
            danhSachThuoc: medications
        }

        update(databaseRef, data)
            .then(setDefaultData)
            .catch((err) => console.log(err))
    }

    const getMedication = (id) => {
        const arr = AppManager.shared.medications.filter((e) => e?.id == id)
        if (arr.length > 0) {
            return arr[0]
        }
        return null
    }

    const setDefaultData = async () => {
        console.log('reset data')
        console.log(item)
        // setMedicationsInfo([])
        let arr = []

        const list = Object.values(item?.danhSachThuoc ?? [])

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

        list.forEach((e) => {
            const model = new MedicationInfoModel({
                price: Number(e?.giaBan),
                id: e?.id,
                quantity: e?.soLuong
            })
            const medication = getMedication(e?.id)
            model.setMedication(medication)
            arr.push(model)
        })

        for (let i = 1; i <= 100 - list.length; i++) {
            arr.push(new MedicationInfoModel({}))
        }

        setMedicationsInfo(arr)
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
    }, [item])

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>ĐƠN THUỐC</h1>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Col style={{ marginRight: 16 }}>
                    <Typography style={{}}>
                        Ngày tạo: {moment(new Date(item?.thoiGianTao)).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                    <Row style={{ alignItems: 'center' }}>
                        Tổng tiền lời:{' '}
                        <Typography
                            style={{
                                marginLeft: 8,
                                color: 'green',
                                fontWeight: 'bold',
                                marginRight: 12
                            }}
                        >
                            {getTotalProfit()}
                        </Typography>
                    </Row>
                </Col>
                <Button type='primary' onClick={updatePrescription}>
                    Cập nhật đơn
                </Button>
            </Row>
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
                grid={{ column: 3 }}
                style={{ width: 216 * 3 }}
            />
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

export default EditPrescriptionScreen
