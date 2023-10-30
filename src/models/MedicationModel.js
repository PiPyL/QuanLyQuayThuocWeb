export default class MedicationModel {
    prices: Array = []
    price: number
    name: string

    constructor(dict: any, key: string) {
        this.id = dict?.id
        this.name = dict?.tenThuoc

        const time = Object.keys(dict?.gia ?? [])
            .sort()
            .reverse()

        this.prices = time.map((e, index) => {
            return {
                price: dict?.gia[e],
                createdAt: e
            }
        })

        if (this.prices.length > 0) {
            this.price = this.prices[0]?.price ?? 0
        }
    }
}
