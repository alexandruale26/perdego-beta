import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import EditPostForm from "./pages/EditPostForm";
import Post from "./pages/Post";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import PostsDashboard from "./pages/PostsDashboard";
import UserDashboard from "./pages/UserDashboard";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
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
            <EditPostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage",
        element: (
          <ProtectedRoute>
            <PostsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <UserDashboard />
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
        path: "termeni-si-conditii",
        element: <TermsAndConditions />,
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
