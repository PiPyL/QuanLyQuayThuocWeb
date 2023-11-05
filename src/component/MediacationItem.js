import { Col, Input, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Utils from '../controler/Utils'

const MediacationItem = ({ item, index, onSelectMedication, onInputedQuanity, onInputedPrice }) => {
    const [quantity, setQuantity] = useState(item?.quantity ?? '')
    const [price, setPrice] = useState(item?.price ?? '')

    const getProfit = () => {
        let profit = 0
        // if (item?.price && item?.medication?.price && Number(item?.quantity)) {
        profit = item?.price * item?.quantity - item?.medication?.price * item?.quantity
        // }

        return isNaN(profit) ? 0 : profit
    }

    useEffect(() => {
        setQuantity(Number(item?.quantity))
        setPrice(item?.price)
    }, [item])

    return (
        <Col style={{ width: 200, marginLeft: 16 }}>
            <Row onClick={onSelectMedication} style={{ alignItems: 'center' }}>
                <Typography style={{ marginLeft: 8 }}>{index + 1}</Typography>
                <Input
                    style={{
                        height: 30,
                        flex: 1,
                        marginLeft: 8
                    }}
                    placeholder='Nhập tên thuốc'
                    value={item?.name ?? ''}
                    readOnly={true}
                />
            </Row>
            <Row style={{ marginTop: 8 }}>
                <Input
                    style={{
                        ...styles.input,
                        width: 50,
                        marginRight: 8,
                        padding: 0,
                        paddingLeft: 8
                    }}
                    placeholder='SL'
                    value={quantity}
                    onChange={(e) => {
                        console.log(e.target.value)
                        onInputedQuanity(e.target.value)
                        setQuantity(e.target.value)
                    }}
                    type='number'
                />
                <Input
                    style={{ ...styles.input, flex: 1 }}
                    placeholder='Nhập số tiền'
                    type='number'
                    value={String(price ?? '')}
                    onChange={(e) => {
                        console.log(e.target.value)
                        onInputedPrice(e.target.value)
                        setPrice(e.target.value)
                    }}
                />
            </Row>
            <Typography style={{ marginTop: 6 }}>
                Tổng tiền: {Utils.formatVND(quantity * price)}
            </Typography>
            <div style={{ color: getProfit() >= 0 ? 'green' : 'red' }}>
                Tiền lời: {Utils.formatVND(getProfit())}
            </div>
            <Row style={{ height: 1, background: '#c5c6c7', marginBottom: 10, marginTop: 4 }} />
        </Col>
    )
}

export default MediacationItem

const styles = {
    input: {
        borderColor: '#c5c6c7', //'#9c9c9c',
        borderWidth: '1px',
        borderRadius: 8,
        color: 'black',
        height: 30
    }
}
