import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post, { loader as postLoader } from "./pages/Post";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "post/:uid",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "post-new",
        element: <PostForm />,
      },
      {
        path: "post-edit",
        element: <div>Edit Post</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
