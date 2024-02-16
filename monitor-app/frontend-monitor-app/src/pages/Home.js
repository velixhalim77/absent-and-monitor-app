import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {endpointEmployeeService} from "../commons/Endpoint";
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import verifyToken from "../commons/VerifyToken";
import verifyUser from "../commons/VerifyUser";
import HeaderComponent from "../components/commons/HeaderComponent";

const Home = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [employeeWantToDelete, setEmployeeWantToDelete] = useState({});
    const navigate = useNavigate();
    const headerTemplate = {
        goBackString: "/",
        titleTemplate: "Monitoring App"
    };

    const handleCreate = () => {
        navigate("/create");
    };
    const handleDetail = (employeeId) => {
        navigate(`/detail/${employeeId}`);
    };
    const handleEdit = (employeeId) => {
        navigate(`/edit/${employeeId}`);
    };

    const handleDelete = (employeeId) => {
        setShowDeleteModal(true);
        let findEmployee = employeeData.find(employee => employee.id == employeeId);
        setEmployeeWantToDelete(findEmployee);
    };

    const getEmployeeData = () => {
        axios.get(endpointEmployeeService + "employee", {
            headers: {
                'Authorization': cookies.get("accessToken"),
            }
        }).then((response) => {
            setEmployeeData(response.data);
        }).catch(err => {
            console.error(err);
        });
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setEmployeeWantToDelete({});
    };

    const handleConfirmDelete = () => {
        axios.delete(endpointEmployeeService + `employee/${employeeWantToDelete.id}`, {
            headers: {
                'Authorization': cookies.get("accessToken"),
            }
        }).then((response) => {
            getEmployeeData();
            setShowDeleteModal(false);
            setEmployeeWantToDelete({});
            toast.success("Success Delete Employee Data");
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
        getEmployeeData();
    }, []);

    return (
        <div>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h1>Employee List</h1>
                <Button variant="primary" onClick={handleCreate} className="mb-2">Create Employee</Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeData.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.fullname}</td>
                            <td>
                                <Button variant="info" size="sm"
                                        onClick={() => handleDetail(employee.id)}>Detail</Button>{' '}
                                <Button variant="warning" size="sm"
                                        onClick={() => handleEdit(employee.id)}>Edit</Button>{' '}
                                <Button variant="danger" size="sm"
                                        onClick={() => handleDelete(employee.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal show={showDeleteModal} onHide={handleCloseModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Delete Employee</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this employee?</p>
                        <p>Full Name : {employeeWantToDelete.fullname}</p>
                        <p>Department : {employeeWantToDelete.department}</p>
                        <p>Position : {employeeWantToDelete.position}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCloseModal}>Back</Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>Confirm</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
};

export default Home;