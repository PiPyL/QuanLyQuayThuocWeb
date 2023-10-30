import { Col, Row, Typography } from 'antd'
import moment from 'moment'
import React from 'react'
import Utils from '../controler/Utils'

const PrescriptionItem = ({ item, didSelectPrescription }) => {
    const getTotalProfit = () => {
        let profit = 0

        Object.values(item?.danhSachThuoc ?? []).forEach((e) => {
            profit += e?.giaBan * e?.soLuong - e?.gia * e?.soLuong
        })

        return Utils.formatVND(profit)
    }

    const getRevenue = () => {
        let revenue = 0

        Object.values(item?.danhSachThuoc ?? []).forEach((e) => {
            revenue += e?.giaBan * e?.soLuong
        })

        return Utils.formatVND(revenue)
    }

    return (
        <Col
            onClick={didSelectPrescription}
            style={{
                padding: 8,
                borderRadius: 8,
                border: '1px solid #c5c6c7',
                marginBottom: 12
            }}
        >
            <Typography style={{ height: 20 }}>
                Ngày tạo: {moment(new Date(item?.thoiGianTao)).format('HH:mm DD/MM/YYYY')}
            </Typography>
            <Row style={{ alignItems: 'center', height: '30px' }}>
                <Row style={{ alignItems: 'center', height: '30px' }}>
                    Tiền lời:
                    <Typography
                        style={{
                            marginLeft: 8,
                            color: 'green',
                            fontWeight: 'bold'
                        }}
                    >
                        {getTotalProfit()}
                    </Typography>
                </Row>
                <Row style={{ alignItems: 'center', marginLeft: 16, height: '30px' }}>
                    Tiền bán:
                    <Typography style={{ marginLeft: 8, color: 'blue', fontWeight: 'bold' }}>
                        {getRevenue()}
                    </Typography>
                </Row>
            </Row>
        </Col>
    )
}

export default PrescriptionItem
