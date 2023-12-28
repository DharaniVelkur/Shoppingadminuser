import { Navigate } from "react-router-dom";
import Home from "./Home";

const UserRoute =({component})=> {
    let token =localStorage.getItem('shoppingtoken');
    if(token) {
        return component?component:<Home/>
    } else {
        return <Navigate to={'/'} replace></Navigate>
    }
}
export default UserRoute;