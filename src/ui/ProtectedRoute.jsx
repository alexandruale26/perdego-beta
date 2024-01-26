import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userApi";
import Spinner from "../shared/Spinner";

// routeToHome if user is logged in and wants to access account/(create-login) using url path or refreshes the form
const ProtectedRoute = ({ children, routeToHome = false, allowCreatePath = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // get currentUser() is better for this element than getting the user from useAppContext()
  // use <Spinner> while waiting to fetch logged user
  useEffect(() => {
    const process = async () => {
      const authResponse = await getCurrentUser();

      if (authResponse.status !== "ok") {
        if (allowCreatePath) {
          navigate("/account/create");
        } else {
          navigate("/account/login");
        }
      } else {
        if (routeToHome) navigate("/");
      }

      setIsLoading(false);
    };

    process();
  }, [navigate, routeToHome, allowCreatePath, pathname]);

  return isLoading ? <Spinner /> : children;
};

export default ProtectedRoute;
