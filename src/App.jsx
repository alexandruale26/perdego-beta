import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getCurrentUser } from "./services/userApi";
import { getProfile } from "./services/profileApi";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post from "./pages/Post";
import LoginForm from "./pages/LoginForm";
import AccountForm from "./pages/AccountForm";
import Error from "./shared/Error";
import ProtectedRoute from "./ui/ProtectedRoute";
import supabase from "./services/supabase";

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
            <div>Edit Post</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "account/login",
        element: (
          <ProtectedRoute routeToHome={true}>
            <LoginForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "account/create",
        element: (
          <ProtectedRoute routeToHome={true} allowCreatePath={true}>
            <AccountForm />
          </ProtectedRoute>
        ),
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

  const process = async () => {
    const authResponse = await getCurrentUser();
    if (authResponse.status !== "ok") return setUser(null);

    const profileResponse = await getProfile(authResponse.data.id);
    if (profileResponse.status !== "ok") return setUser(null);

    setUser({ ...authResponse.data, ...profileResponse.data });
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
