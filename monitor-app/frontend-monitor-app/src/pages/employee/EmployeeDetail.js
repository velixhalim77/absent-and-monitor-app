import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import axios from "axios";
import {endpointEmployeeService} from "../../commons/Endpoint";
import {useNavigate, useParams} from "react-router-dom";
import cookies from "js-cookie";
import {toast} from "react-toastify";
import moment from "moment";
import verifyToken from "../../commons/VerifyToken";
import verifyUser from "../../commons/VerifyUser";
import AbsentComponent from "./AbsentComponent";
import HeaderComponent from "../../components/commons/HeaderComponent";


const EmployeeDetail = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [joinDate, setJoinDate] = useState(new Date());
    const [absentData, setAbsentData] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const headerTemplate = {
        goBackString: "home",
        titleTemplate: "Monitoring App"
    };
    const goBack = () => {
        navigate("/home");
    };

    const getEmployeeDetail = () => {
        axios.get(endpointEmployeeService + `employee/${id}`, {
            headers: {
                'Authorization': cookies.get("accessToken"),
            }
        }).then((response) => {
            const employeeData = response.data;
            setFullname(employeeData.fullname);
            setEmail(employeeData.email);
            setDepartment(employeeData.department);
            setPosition(employeeData.position);
            setJoinDate(moment(employeeData.joinDate).format("yyyy-MM-DD"));
        }).catch(err => {
            console.error(err);
            toast.error(err.message);
        });
    };

    const getAbsentData = () => {
        axios.get(endpointEmployeeService + `absent/${id}`, {
            headers: {
                'Authorization': cookies.get("accessToken"),
            }
        }).then((response) => {
            setAbsentData(response.data);
        }).catch(err => {
            console.error(err);
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
        getEmployeeDetail();
        getAbsentData();
    }, []);

    return (
        <div>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h1>Create New Employee</h1>
                <Form>
                    <FormGroup controlId="fullname">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter full name"
                            value={fullname}
                            readOnly
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            readOnly
                        />
                    </FormGroup>

                    <FormGroup controlId="department">
                        <FormLabel>Department</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter department"
                            value={department}
                            readOnly
                        />
                    </FormGroup>

                    <FormGroup controlId="position">
                        <FormLabel>Position</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter position"
                            value={position}
                            readOnly
                        />
                    </FormGroup>

                    <FormGroup controlId="joinDate">
                        <FormLabel>Join Date</FormLabel>
                        <br/>
                        <DatePicker selected={joinDate} dateFormat="yyyy-MM-dd" readOnly/>
                    </FormGroup>

                    <Button variant="danger" onClick={goBack} className="mt-2">
                        Back
                    </Button>
                </Form>
                {absentData && absentData.length > 0 && (<AbsentComponent data={absentData}/>)}
            </div>
        </div>
    );
};

export default EmployeeDetail;