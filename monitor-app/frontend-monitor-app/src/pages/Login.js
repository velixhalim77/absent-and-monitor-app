import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Form, FormControl, FormGroup, FormLabel, Button} from "react-bootstrap";
import axios from "axios";
import {endpointUserService} from "../commons/Endpoint";
import cookies from "js-cookie"
import HeaderComponent from "../components/commons/HeaderComponent";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const headerTemplate = {
        goBackString:null,
        titleTemplate:"Login"
    }

    const navigate = useNavigate();

    const clickLogin = (e) =>{
        e.preventDefault();
        axios.post(endpointUserService+"auth/login", {username, password}).then((response) => {
            cookies.set('accessToken', response.data.token);
            navigate("/home")
        }).catch(err=>{
            console.error(err)
        })
    }

    return (
        <section>
            <HeaderComponent data={headerTemplate}/>
            <div className="container mt-5">
                <h2 className="mb-4">Login</h2>
                <Form onSubmit={clickLogin}>
                    <FormGroup controlId="formBasicUsername">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup controlId="formBasicPassword">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <br/>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </section>
    )
}

export default Login;