import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post from "./pages/Post";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import PostsDashboard from "./pages/PostsDashboard";
import Error from "./shared/Error";
import ProtectedRoute from "./ui/ProtectedRoute";
import { UserSession } from "./ui/UserSession";

const router = createBrowserRouter([
  {
    element: (
      <UserSession>
        <AppLayout />
      </UserSession>
    ),

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
  return <RouterProvider router={router} />;
}

export default App;
