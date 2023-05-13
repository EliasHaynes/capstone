import { BrowserRouter,Routes, Route } from "react-router-dom";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";




function Router() {
    return (
        <Routes>
            <Route path="/" element={<Student />} />
            <Route path='/create' element={<AddStudent />} />
            <Route path="/update/:id" element={<UpdateStudent/>} />
        </Routes>
    )
}

export default Router;