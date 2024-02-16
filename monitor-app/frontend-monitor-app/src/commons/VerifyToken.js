import {jwtDecode} from "jwt-decode";
import cookies from "js-cookie";

const verifyToken = () => {
    let decodeToken = jwtDecode(cookies.get("accessToken"));
    const currentTime = Date.now() / 1000;
    return decodeToken.exp >= currentTime;
};

export default verifyToken;