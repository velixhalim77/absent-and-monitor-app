import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {endpointEmployeeService} from "../../commons/Endpoint";
import cookies from "js-cookie";
import moment from "moment/moment";
import {toast} from "react-toastify";
import verifyToken from "../../commons/VerifyToken";
import verifyUser from "../../commons/VerifyUser";
import HeaderComponent from "../../components/commons/HeaderComponent";


const EmployeeEdit = () => {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [joinDate, setJoinDate] = useState(new Date());
    const {id} = useParams();
    const navigate = useNavigate();
    const headerTemplate = {
        goBackString:"home",
        titleTemplate:"Monitoring App"
    }
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

    const editEmployee = (e) => {
        e.preventDefault();
        const employeeData = {
            fullname,
            email,
            department,
            position,
            joinDate: moment(joinDate).format("yyyy-MM-DD")
        };

        axios.put(endpointEmployeeService + `employee/${id}`,
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
        if(!isUserValid){
            toast.warn("you don't have permision to access")
            navigate("/");
        }
        if (!isTokenValid) {
            toast.warn("expire time login! please login again")
            navigate("/");
        }
        getEmployeeDetail();
    }, []);
    return (
        <div>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h1>Edit Employee</h1>
                <Form onSubmit={editEmployee}>
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
                        Edit
                    </Button>

                    <Button variant="danger" onClick={goBack} className="mt-2">
                        Back
                    </Button>
                </Form>
            </div>
        </div>

    );
};

export default EmployeeEdit;