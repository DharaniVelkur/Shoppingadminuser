import {jwtDecode} from 'jwt-decode';
import AdminHome from './AdminHome';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({component}) =>{
    let token = localStorage.getItem('shoppingtoken');

    if(token) {
        try {
            let decodedToken = jwtDecode(token);
            if(decodedToken.email !=='admin@gmail.com') {
                localStorage.removeItem('shoppingtoken');
                localStorage.removeItem('shoppinguser');
                return <Navigate to={'/'} replace></Navigate>
            }
            return component?component:<AdminHome/>;
        } catch (error) {
            localStorage.removeItem('shoppingtoken');
            localStorage.removeItem('shoppinguser');
            return <Navigate to={'/'} replace></Navigate>
        }
    }  else {
        // Redirect to the home page if no token is found
        return <Navigate to="/" replace />;
      }
}

export default AdminRoute;