import { combineReducers } from "redux";

const vin = (state = [], action) => {
    switch(action.type) {
        case "SAVE_VIN" :
            console.log("Im here:", action.payload)
            return [action.payload]
        default : 
            return state
    }
}

const mileage = (state = [], action) => {
    switch(action.type) {
        case "SAVE_MILEAGE" :
            console.log("Im here:",action.payload)
            return [action.payload]
        default : 
            return state
    }
}

export default combineReducers( {vin, mileage})
