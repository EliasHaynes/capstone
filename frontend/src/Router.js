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
const checkAuth =() => {
    const cookies = cookie.parse(document.cookie);
    console.log(cookies)
    return cookies["loggedIn"] ? true : false;
}

const ProtectedRoute =(props) => {

    const {component: Component, ...rest} =props;

    return(
        checkAuth() === true ? (<Component {...rest} />): (<Navigate to='/login' />)
    )
}


function Router() {
    return (
        <Routes>
        {/* Home */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />

        {/* API Components */}
        <Route path="/vindecode" element={<ProtectedRoute component={VinDecode} />} />
        <Route path="/userMaintenace" element={<ProtectedRoute component={ScheduledMaintenance} />} />

        {/* Repair Components */}
        <Route path="/repair" element={<ProtectedRoute component={RepairLog} />} />
        <Route path='/create' element={<AddRepair />} />
        <Route path="/update/:id" element={<UpdateRepair/>} />

        {/* Auth Components */}
        <Route path="/login" element={<Login/>} />
        <Route path="/registerCar" element={<ProtectedRoute component={RegisterCar} />} />
        <Route path="/registerUser" element={<RegisterUser/>} />
        
    </Routes>
    )
}

export default Router;


