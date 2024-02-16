import {Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";
import {ArrowLeft} from "react-bootstrap-icons";

const HeaderComponent = ({data}) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        cookies.remove("accessToken");
        navigate("/");
    };
    const goBack = () => {
        if (data.goBackString == "/") {
            handleLogOut();
        } else {
            navigate(`/${data.goBackString}`);
        }
    };
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                {data.goBackString && (
                    <Navbar.Brand onClick={goBack}>
                        <ArrowLeft/>
                    </Navbar.Brand>
                )}
                <NavbarBrand>{data.titleTemplate}</NavbarBrand>
                <NavbarToggle aria-controls="responsive-navbar-nav"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink onClick={handleLogOut}>Log Out</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
};
export default HeaderComponent;