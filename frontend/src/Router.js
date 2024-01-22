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
import VinDecode from "./components/VinDecode";
import ScheduledMaintenance from "./components/ScheduledMaintenance";




//Protecting Routes w/ Auth0
  const ProtectedRoute =(props) => {
    const {
        isAuthenticated,
        user
    } = useAuth0();
    const {component: Component, ...rest} =props;

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
            <Route path="/vindecode" element={<ProtectedRoute component={VinDecode} />} />
            <Route path="/userMaintenace" element={<ProtectedRoute component={ScheduledMaintenance} />} />
    
            {/* Repair Components */}
            <Route path="/repair" element={<ProtectedRoute component={RepairLog} />} />
            <Route path='/create' element={<ProtectedRoute component={AddRepair} />} />
            <Route path="/update/:auth0_id/:id" element={<ProtectedRoute component={UpdateRepair} />} />
            
            {/* Auth Components */}
            <Route path="/registerCar" element={<ProtectedRoute component={RegisterCar} />} />
            
        </Routes>
        )
}

export default Router;


