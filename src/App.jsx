import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Post, { loader as postLoader } from "./pages/Post";

import ColorSelect from "./formComponents/ColorSelect";

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
        loader: postLoader,
        errorElement: <div>Not found</div>,
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
        path: "col",
        element: (
          <div className="w-full max-w-[450px] mx-auto my-10">
            <ColorSelect />
          </div>
        ),
      },
      //TODO: Add element on not existing path * and error
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
