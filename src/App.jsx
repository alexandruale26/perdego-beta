import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getCurrentUser } from "./services/userApi";
import { getProfile } from "./services/profileApi";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post from "./pages/Post";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import PostsDashboard from "./pages/PostsDashboard";
import Error from "./shared/Error";
import ProtectedRoute from "./ui/ProtectedRoute";
import supabase from "./services/supabase";
import Spinner from "./shared/Spinner";

const AppContext = createContext({});

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":pid",
        element: <Post />,
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit",
        element: (
          <ProtectedRoute>
            <PostsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      // console.log(event, session);

      if (event === "INITIAL_SESSION") {
        process();
      } else if (event === "SIGNED_IN") {
        process();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.data.subscription.unsubscribe();
  }, []);

  if (isLoading) return <Spinner />;
  if (isLoading && user === null) return <Error errorMessage="A aparut o problema !!!!!!!!!!" />;

  return (
    <AppContext.Provider value={{ user }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("Context should be used inside <App>");
  return context;
};

export { App, useAppContext };
