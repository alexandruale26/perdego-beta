import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/userApi";
import Spinner from "../shared/Spinner";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // get currentUser() is better for this element than getting the user from useUserSessionContext()
  // used <Spinner> while waiting to fetch logged user
  useEffect(() => {
    const process = async () => {
      const authResponse = await getCurrentUser();

      if (authResponse.status !== "ok") {
        navigate("/autentificare", { replace: true });
      }

      setIsLoading(false);
    };

    process();
  }, [navigate]);

  return isLoading ? <Spinner /> : children;
};

export default ProtectedRoute;
