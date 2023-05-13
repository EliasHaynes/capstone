import { BrowserRouter,Routes, Route } from "react-router-dom";
import Student from "./components/Student";




function Router() {
    return (
        <Routes>
            <Route path="/" element={<Student />} />
        </Routes>
    )
}

export default Router;