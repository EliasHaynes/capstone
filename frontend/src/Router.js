// Routing Tools
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import cookie from 'cookie'

// Imported Components
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import RegisterCar from "./components/RegisterCar";
import RepairLog from "./components/RepairLog";
import AddRepair from "./components/AddRepair";
import UpdateRepair from "./components/UpdateRepair";
import VinDecode from "./components/VinDecode";
import ScheduledMaintenance from "./components/ScheduledMaintenance";




//Frontend Login Auth





function Router() {

        return (
            <Routes>
            {/* Home */}
            <Route path="/" element={<Home/>} />
    
            {/* API Components */}
            <Route path="/vindecode" element={VinDecode} />
            <Route path="/userMaintenace" element={ScheduledMaintenance} />
    
            {/* Repair Components */}
            <Route path="/repair" element={<RepairLog/>} />
            <Route path='/create' element={<AddRepair />} />
            <Route path="/update/:id" element={<UpdateRepair/>} />
    
            {/* Auth Components */}
            <Route path="/login" element={<Login/>} />
            <Route path="/registerCar" element={RegisterCar} />
            <Route path="/registerUser" element={<RegisterUser/>} />
            
        </Routes>
        )
}

export default Router;


