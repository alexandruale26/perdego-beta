import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post from "./pages/Post";
import LoginForm from "./pages/LoginForm";
import AccountForm from "./pages/AccountForm";
import Error from "./shared/Error";

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
        element: <PostForm />,
      },
      {
        path: "edit",
        element: <div>Edit Post</div>,
      },
      {
        path: "account/login",
        element: <LoginForm />,
      },
      {
        path: "account/create",
        element: <AccountForm />,
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
