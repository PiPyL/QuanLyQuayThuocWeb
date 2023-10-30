export default class Utils {
    static formatVND = (price) => {
        try {
            const num = new Number(price)
            return num.toLocaleString('vi-VN') + 'đ'
        } catch (error) {
            return ''
        }
    }
}
