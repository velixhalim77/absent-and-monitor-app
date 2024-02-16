import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import {endpointEmployeeService, endpointUserService} from "../commons/Endpoint";
import React, {useEffect, useState} from "react";
import cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from "../components/commons/HeaderComponent";
const Home = () => {
    const [photo, setPhoto] = useState('');
    const [decodeToken, setDecodeToken] = useState({})
    const navigate = useNavigate();
    const headerTemplate = {
        goBackString:"/",
        titleTemplate:"Absent App"
    }
    const absentClick = () => {
        const formData = new FormData();
        formData.append('photo', photo);
        axios.post(endpointEmployeeService + `absent/${decodeToken.id}`, formData, {
            headers: {
                'Authorization': cookies.get("accessToken"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            toast.success(response.data.message);
        }).catch(err => {
            toast.error(err.message);
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const checkTokenValidity = () => {
        let decodeToken = jwtDecode(cookies.get("accessToken"));
        setDecodeToken(decodeToken);
        const currentTime = Date.now() / 1000;
        return decodeToken.exp >= currentTime;
    };

    useEffect(() => {
        const isTokenValid = checkTokenValidity();
        if (!isTokenValid) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h1>
                    Welcome, Work remote absent here!
                </h1>
                <Form>
                    <FormGroup controlId="photo">
                        <FormLabel>Upload Photo</FormLabel>
                        <FormControl
                            type="file"
                            accept="image/*"
                            capture="camera"
                            onChange={handlePhotoChange}
                        />
                    </FormGroup>
                    <br/>
                    <Button variant="primary" type="button" onClick={absentClick}>
                        Absent Here
                    </Button>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Home;