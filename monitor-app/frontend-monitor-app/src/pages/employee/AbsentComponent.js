import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table} from "react-bootstrap";
import moment from "moment";
import {endpointEmployeeService} from "../../commons/Endpoint";
import cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";

const AbsentComponent = ({data}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const handleViewPhoto = (id) => {
        axios.get(endpointEmployeeService + `absent/photo/${id}`, {
            headers: {
                'Authorization': cookies.get("accessToken"),
            },
        }).then((response) => {
            setSelectedPhoto(`data:image/jpeg;base64,${response.data.photo}`);
        }).catch(err => {
            toast.error(err.message);
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        setShowModal(false);
    };
    return (
        <div>
            <h1>Absent List</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Check-in Time</th>
                    <th>Photo</th>
                </tr>
                </thead>
                <tbody>
                {data.map((absent, index) => (
                    <tr key={index}>
                        <td>{moment(absent.check_in).format("yyyy-MM-DD HH:mm:ss")}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleViewPhoto(absent.id)}>View Photo</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <ModalHeader closeButton>
                    <ModalTitle>View Photo</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {selectedPhoto &&
                        <img src={selectedPhoto} alt="Absent Photo" style={{maxWidth: "100%", maxHeight: "100%"}}/>}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AbsentComponent;