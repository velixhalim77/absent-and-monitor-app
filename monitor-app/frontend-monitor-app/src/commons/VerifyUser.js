import {jwtDecode} from "jwt-decode";
import cookies from "js-cookie";

const VerifyUser = () => {
    const decodedToken = jwtDecode(cookies.get("accessToken"));
    if (decodedToken?.role) {
        return decodedToken.role === "admin";
    } else {
        return false;
    }
};

export default VerifyUser;