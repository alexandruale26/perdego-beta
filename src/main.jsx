import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// TODO: Important Step for NetlifyIf you are using React Router Dom with a project you’re hosting on Netlify, there’s an extra step that need to be taking to ensure that direct linking works. In your /public folder, create a new file named _redirects and add the following. Otherwise direct linking to a sub-route will 404:
