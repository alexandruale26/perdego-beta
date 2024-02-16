import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Error from "./shared/Error";
import Spinner from "./shared/Spinner";
import ProtectedRoute from "./ui/ProtectedRoute";
import { UserSession } from "./ui/UserSession";

const Post = lazy(() => import("./pages/Post"));
const PostForm = lazy(() => import("./pages/PostForm"));
const EditPostForm = lazy(() => import("./pages/EditPostForm"));

const LoginForm = lazy(() => import("./pages/LoginForm"));
const SignupForm = lazy(() => import("./pages/SignupForm"));

const PostsDashboard = lazy(() => import("./pages/PostsDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions"));
const CookiesPolicy = lazy(() => import("./pages/legal/CookiesPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));

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
        element: (
          <Suspense fallback={<Spinner />}>
            <Post />
          </Suspense>
        ),
      },
      {
        path: "anunt-nou",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <PostForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "modifica-anuntul",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <EditPostForm />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "administreaza-anunturile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <PostsDashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "contul-tau",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <UserDashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "autentificare",
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: "creeaza-cont",
        element: (
          <Suspense fallback={<Spinner />}>
            <SignupForm />,
          </Suspense>
        ),
      },
      {
        path: "termeni-si-conditii",
        element: (
          <Suspense fallback={<Spinner />}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: "politica-de-confidentialitate",
        element: (
          <Suspense fallback={<Spinner />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "politica-cookies",
        element: (
          <Suspense fallback={<Spinner />}>
            <CookiesPolicy />
          </Suspense>
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
  return <RouterProvider router={router} />;
}

export default App;
