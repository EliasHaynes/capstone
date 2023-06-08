import RegisterCar from '../components/RegisterCar'
import {connect} from "react-redux"
import { saveMileage, saveVin } from '../redux/actions'


const mapStateToProps = (state) => {
    return {
        vin: state.vin,
        mileage: state.mileage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveVin: (vin) => dispatch(saveVin(vin)),
        saveMileage: (mileage) => dispatch(saveMileage(mileage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCar)
