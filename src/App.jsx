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
import CookiesPolicy from "./pages/legal/CookiesPolicy";
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
        path: "anunt-nou",
        element: (
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "modifica-anuntul",
        element: (
          <ProtectedRoute>
            <EditPostForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "administreaza-anunturile",
        element: (
          <ProtectedRoute>
            <PostsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "contul-tau",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "autentificare",
        element: <LoginForm />,
      },
      {
        path: "creeaza-cont",
        element: <SignupForm />,
      },
      {
        path: "termeni-si-conditii",
        element: <TermsAndConditions />,
      },
      {
        path: "politica-cookies",
        element: <CookiesPolicy />,
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
