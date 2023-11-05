import { Button, Col, Dropdown, List, Row, Typography } from 'antd'
import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useRef, useState } from 'react'
import PrescriptionItem from './PrescriptionItem'
import Utils from '../controler/Utils'
import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import CreatePrescriptionScreen from './CreatePrescriptionScreen'
import EditPrescriptionScreen from './EditPrescriptionScreen'

const PrescriptionsListScreen = () => {
    const [allPrescriptions, setAllPrescriptions] = useState([])
    const [totalProfit, setTotalProfit] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [prescriptions, setPrescriptions] = useState([])
    const [prescriptionSelected, setPrescriptionSelected] = useState(null)
    const [timeSelected, setTimeSelected] = useState(1)
    const isFirstOpen = useRef(true)
    const db = getDatabase()
    const items = [
        {
            label: <p onClick={() => handleData(0)}>Hôm nay</p>,
            key: '0'
        },
        {
            label: <p onClick={() => handleData(1)}>Tháng này</p>,
            key: '1'
        },
        {
            label: <p onClick={() => handleData(2)}>Tất cả</p>,
            key: '0'
        }
    ]

    const getTimeSelected = () => {
        switch (timeSelected) {
            case 0:
                return 'Hôm nay'
            case 1:
                return 'Tháng này'
            default:
                return 'Tất cả'
        }
    }

    const handleData = (timeSelected) => {
        setTimeSelected(timeSelected)
        const currentDate = new Date()
        let arr = []
        switch (timeSelected) {
            case 0:
                arr = allPrescriptions.filter((e) => {
                    return (
                        moment(new Date(e?.thoiGianTao)).format('DD/MM/yyyy') ==
                        moment(currentDate).format('DD/MM/yyyy')
                    )
                })
                break
            case 1:
                arr = allPrescriptions.filter((e) => {
                    return (
                        moment(new Date(e?.thoiGianTao)).format('MM/yyyy') ==
                        moment(currentDate).format('MM/yyyy')
                    )
                })
                break
            case 2:
                arr = allPrescriptions
                break
            case 3:
                break
            default:
                return
        }

        setPrescriptions(arr)
    }

    const getPrecriptionList = () => {
        const starCountRef = ref(db, 'donThuoc')
        onValue(starCountRef, (snapshot) => {
            let arr = Object.values(snapshot.val() ?? [])
            arr = arr.sort((a, b) => (a?.thoiGianTao < b?.thoiGianTao ? 1 : -1))
            setAllPrescriptions(arr)
            setPrescriptions(arr)
        })
    }

    useEffect(() => {
        getPrecriptionList()
    }, [])

    useEffect(() => {
        if (prescriptionSelected != null) {
            const a = allPrescriptions.find((e) => e?.id == prescriptionSelected?.id)
            if (a) {
                setPrescriptionSelected(a)
            }
        }
    }, [allPrescriptions, prescriptionSelected])

    useEffect(() => {
        let profit = 0
        let revenue = 0

        const prescriptionsList = prescriptions.map((e) => e?.danhSachThuoc)

        let arr = []

        prescriptionsList.forEach((e) => {
            arr = arr.concat(e)
        })

        arr.forEach((e) => {
            profit += e?.giaBan * e?.soLuong - e?.gia * e?.soLuong
            revenue += e?.giaBan * e?.soLuong
        })

        setTotalProfit(profit)
        setRevenue(revenue)

        if (isFirstOpen.current && prescriptions.length > 0) {
            handleData(1)
            isFirstOpen.current = false
        }

        if (prescriptions == null && prescriptions.length > 0) {
            setPrescriptionSelected(prescriptions[0])
        }
    }, [prescriptions])

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>DANH SÁCH ĐƠN THUỐC</h1>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col>
                    <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                        <Dropdown menu={{ items }}>
                            <Button>
                                {getTimeSelected()} <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Col style={{ marginLeft: 12 }}>
                            <Row style={{ alignItems: 'center' }}>
                                Tổng tiền đã bán:
                                <Typography
                                    style={{ marginLeft: 8, color: 'blue', fontWeight: 'bold' }}
                                >
                                    {Utils.formatVND(revenue)}
                                </Typography>
                            </Row>
                            <Row style={{ alignItems: 'center' }}>
                                Tổng tiền lời:
                                <Typography
                                    style={{ marginLeft: 8, color: 'green', fontWeight: 'bold' }}
                                >
                                    {Utils.formatVND(totalProfit)}
                                </Typography>
                            </Row>
                        </Col>
                    </Row>
                    <List
                        dataSource={prescriptions}
                        renderItem={(item) => (
                            <PrescriptionItem
                                item={item}
                                didSelectPrescription={() => setPrescriptionSelected(item)}
                            />
                        )}
                        style={{
                            width: 330
                            // background: 'green'
                        }}
                    />
                </Col>
                <Col>
                    {prescriptionSelected && <EditPrescriptionScreen item={prescriptionSelected} />}
                </Col>
            </Row>
        </div>
    )
}

export default PrescriptionsListScreen
