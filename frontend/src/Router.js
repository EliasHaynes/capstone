import { BrowserRouter,Routes, Route } from "react-router-dom";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";




function Router() {
    return (
        <Routes>
            <Route path="/" element={<Student />} />
            <Route path='/create' element={<AddStudent />} />
        </Routes>
    )
}

export default Router;