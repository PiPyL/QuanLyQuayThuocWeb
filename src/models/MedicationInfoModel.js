import MedicationModel from './MedicationModel'

export default class MedicationInfoModel {
    price: number
    name: string
    quantity: number
    medication = new MedicationModel()

    constructor(dict: any) {
        this.id = dict?.id ?? ''
        this.name = dict?.name
        this.price = dict?.price
        this.quantity = dict?.quantity
        this.medication = dict?.medication
    }

    setDefault() {
        this.id = ''
        this.name = ''
        this.price = null
        this.quantity = null
        this.medication = {}
    }

    setQuantity(quantity) {
        this.quantity = quantity
    }

    setMedication(medication) {
        this.name = medication?.name ?? ''
        this.medication = medication
    }

    setPrice(price) {
        this.price = price
    }
}
