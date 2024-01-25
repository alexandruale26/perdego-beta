import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/userApi";
import Spinner from "../shared/Spinner";
import { useAppContext } from "../App";

// routeToHome if user is logged in and wants to access account/(create-login) using url path
const ProtectedRoute = ({ children, routeToHome = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const process = async () => {
      const authResponse = await getCurrentUser();

      if (authResponse.status !== "ok") {
        navigate("/account/login");
      } else {
        if (routeToHome) navigate("/");
      }

      setIsLoading(false);
    };

    process();
  }, [navigate, routeToHome]);

  console.log(useAppContext());

  return isLoading ? <Spinner /> : children;
};

export default ProtectedRoute;
