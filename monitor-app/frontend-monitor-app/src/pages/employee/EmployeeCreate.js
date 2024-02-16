import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import react, {useEffect, useState} from "react";
import axios from "axios";
import {endpointEmployeeService} from "../../commons/Endpoint";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cookies from "js-cookie";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import verifyToken from "../../commons/VerifyToken";
import verifyUser from "../../commons/VerifyUser";
import HeaderComponent from "../../components/commons/HeaderComponent";

const EmployeeCreate = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [joinDate, setJoinDate] = useState(new Date());
    const navigate = useNavigate();
    const headerTemplate = {
        goBackString: "home",
        titleTemplate: "Monitoring App"
    };

    const goBack = () => {
        navigate("/home");
    };

    const createEmployee = (e) => {
        e.preventDefault();
        const employeeData = {
            fullname,
            email,
            department,
            position,
            joinDate: moment(joinDate).format("yyyy-MM-DD")
        };

        axios.post(endpointEmployeeService + "employee",
            employeeData, {
                headers: {
                    'Authorization': cookies.get("accessToken"),
                }
            }).then((response) => {
            toast.success(response.data.message);
            navigate("/home");
        }).catch(err => {
            toast.error(err.message);
        });
    };
    useEffect(() => {
        const isTokenValid = verifyToken();
        const isUserValid = verifyUser();
        if (!isUserValid) {
            toast.warn("you don't have permision to access");
            navigate("/");
        }
        if (!isTokenValid) {
            toast.warn("expire time login! please login again");
            navigate("/");
        }
    }, []);

    return (
        <div>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h1>Create New Employee</h1>
                <Form onSubmit={createEmployee}>
                    <FormGroup controlId="fullname">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter full name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId="department">
                        <FormLabel>Department</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId="position">
                        <FormLabel>Position</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId="joinDate">
                        <FormLabel>Join Date</FormLabel>
                        <br/>
                        <DatePicker selected={joinDate} onChange={(date) => setJoinDate(date)} dateFormat="yyyy-MM-dd"/>
                    </FormGroup>

                    <Button variant="primary" type="submit" className="mt-2" style={{marginRight: '10px'}}>
                        Submit
                    </Button>
                    <Button variant="danger" onClick={goBack} className="mt-2">
                        Back
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EmployeeCreate;