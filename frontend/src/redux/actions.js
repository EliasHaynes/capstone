import axios from 'axios'
import { useParams } from 'react-router-dom'


export const saveVin = (vin) => {
    return {
        type: "SAVE_VIN",
        payload: vin
    }
}

export const saveMileage = (mileage) => {
    return {
        type: "SAVE_MILEAGE",
        payload: mileage
    }
}

