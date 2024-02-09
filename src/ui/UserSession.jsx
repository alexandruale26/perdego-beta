import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import { getCurrentUser } from "../services/userApi";
import { getProfile } from "../services/profileApi";
import { GENERIC_ERROR_MESSAGE } from "../services/apiHelpers/apiErrorMessages";

const UserSessionContext = createContext({});

function UserSession({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const process = async () => {
    const authResponse = await getCurrentUser();
    if (authResponse.status !== "ok") {
      setIsLoading(false);
      return setUser(null);
    }

    const profileResponse = await getProfile(authResponse.data.id);
    if (profileResponse.status !== "ok") {
      setIsLoading(false);
      return setUser(null);
    }

    setUser({ ...authResponse.data, ...profileResponse.data });
    setIsLoading(false);
  };

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        process();
      } else if (event === "SIGNED_IN") {
        process();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        navigate("/", { replace: true });
      }
    });

    return () => subscription.data.subscription.unsubscribe();
  }, [navigate]);

  // changing profile data in context because there is no need to reload
  // the entire app just to get a few values that can easily be saved here
  const changeUserProfile = (newProfile, clearUser = false) => {
    clearUser ? setUser(null) : setUser({ ...user, ...newProfile });
  };

  if (isLoading) return <Spinner />;
  if (isLoading && user === null) return <Error errorMessage={GENERIC_ERROR_MESSAGE} />;

  return <UserSessionContext.Provider value={{ user, changeUserProfile }}>{children}</UserSessionContext.Provider>;
}

const useUserSessionContext = () => {
  const context = useContext(UserSessionContext);

  if (!context) throw new Error("Context should be used inside <UserSession>");
  return context;
};

export { UserSession, useUserSessionContext };
