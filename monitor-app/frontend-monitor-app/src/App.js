import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EmployeeDetail from "./pages/employee/EmployeeDetail";
import EmployeeCreate from "./pages/employee/EmployeeCreate";
import EmployeeEdit from "./pages/employee/EmployeeEdit";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/detail/:id" element={<EmployeeDetail/>}/>
                <Route path="/create" element={<EmployeeCreate/>}/>
                <Route path="/edit/:id" element={<EmployeeEdit/>}/>
            </Routes>
            <ToastContainer/>
        </div>
    );
}

export default App;
