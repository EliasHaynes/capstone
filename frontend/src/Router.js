// Routing Tools
import { BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import cookie from 'cookie'
import { useAuth0 } from "@auth0/auth0-react";

// Imported Components
import Home from "./components/Home";
import RegisterCar from "./components/RegisterCar";
import RepairLog from "./components/RepairLog";
import AddRepair from "./components/AddRepair";
import UpdateRepair from "./components/UpdateRepair";
import ScheduledMaintenance from "./components/ScheduledMaintenance";
import VehicleProfiles from "./components/VehicleProfiles";
import UpdateMileage from "./components/UpdateMileage";
import AIModal from "./components/AIModal";




//Protecting Routes w/ Auth0
  const ProtectedRoute =(props) => {
    const {
        isAuthenticated,
        user
    } = useAuth0();
    const {component: Component, ...rest} = props;

    return(
        isAuthenticated === true ? (<Component {...rest} />): (<Navigate to='/' />)
    )
}

function Router() {

        return (
            <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
    
            {/* API Components */}
            <Route path="/userMaintenace" element={<ProtectedRoute component={ScheduledMaintenance} />} />
            <Route path="/vehicleprofiles" element={<ProtectedRoute component={VehicleProfiles}/>} />
            <Route path="/updateMileage/:user_id/:v_id" element={<ProtectedRoute component={UpdateMileage} /> } />
    
            {/* Repair Components */}
            <Route path="/repair" element={<ProtectedRoute component={RepairLog} />} />
            <Route path='/create/:user_id/:v_id' element={<ProtectedRoute component={AddRepair} />} />
            <Route path="/update/:user_id/:v_id/:repair_id" element={<ProtectedRoute component={UpdateRepair} />} />
            <Route path="/aiModal" element={<ProtectedRoute component={AIModal} />} />
            
            {/* Auth Components */}
            <Route path="/registerCar" element={<ProtectedRoute component={RegisterCar} />} />
            
        </Routes>
        )
}

export default Router;


