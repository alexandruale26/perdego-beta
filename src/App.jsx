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
        path: "postnew",
        element: <PostForm />,
      },
      {
        path: "postedit",
        element: <div>Edit Post</div>,
      },
      //TODO: Add element on not existing path *
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
