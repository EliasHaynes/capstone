// Routing Tools
import { BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import cookie from 'cookie'
import { useAuth0 } from "@auth0/auth0-react";

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




//Protecting Routes w/ Auth0
  const ProtectedRoute =(props) => {
    const {isAuthenticated} = useAuth0();
    const {component: Component, ...rest} =props;

    return(
        isAuthenticated === true ? (<Component {...rest} />): (<Navigate to='/' />)
    )
}

// const checkCarRegistered = () => {
//     const cookies = cookie.parse(document.cookie);
//     console.log(cookies)
//     return cookies["loggedIn"] ? true : false;
// }

// const carInfoSubmitted= (props) => {
    
//     const {component: Component, ...rest} =props;

//     return(
//         checkCarRegistered() === true ? (<Component {...rest} />): (<Navigate to='/' />)
//     )
// }




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
            <Route path="/update/:id" element={<ProtectedRoute component={UpdateRepair} />} />
    
            {/* Auth Components */}
            <Route path="/login" element={<ProtectedRoute component={Login}/>} />
            <Route path="/registerCar" element={<ProtectedRoute component={RegisterCar} />} />
            
        </Routes>
        )
}

export default Router;


