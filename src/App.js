import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import AdminHome from "./components/AdminHome";
import Error from "./components/Error";
import Cart from "./components/Cart";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/user/home" element={<UserRoute> <Home/></UserRoute>}/>
      <Route exact path="/resetpassword" element={<PasswordReset/>}/>
      <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}/>
      <Route exact path="/admin/home" element={<AdminRoute><AdminHome/></AdminRoute>}/>
      <Route exact path="/user/cart" element={<Cart/>}/>
      <Route exact path="/*" element={<Error/>}/>
    </Routes>
    </>
  );
}

export default App;
