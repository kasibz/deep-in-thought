// outlet lets you nest the route to make it private
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// rest takes all of the parameters from a route, you then replace a route with it
const PrivateRoutesUser = () => {
  let { user } = UserContext();
  return user[0] ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesUser;
